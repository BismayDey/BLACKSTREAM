"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, type User as FirebaseUser, signOut as firebaseSignOut } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { app } from "@/lib/firebase"

// Initialize Firebase services
const auth = getAuth(app)
const db = getFirestore(app)

// Define user profile type
export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  watchlist: string[]
  watchLater: string[]
  continueWatching: {
    id: string
    title: string
    poster: string
    progress: number
    timestamp: number
    duration: string
    lastWatched: number
  }[]
}

// Define context type
interface UserContextType {
  user: FirebaseUser | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  addToWatchlist: (showId: string) => Promise<void>
  removeFromWatchlist: (showId: string) => Promise<void>
  addToWatchLater: (showId: string) => Promise<void>
  removeFromWatchLater: (showId: string) => Promise<void>
  updateContinueWatching: (show: {
    id: string
    title: string
    poster: string
    progress: number
    duration: string
  }) => Promise<void>
  removeContinueWatching: (showId: string) => Promise<void>
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Create provider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Get or create user profile
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          setProfile(userSnap.data() as UserProfile)
        } else {
          // Create new profile
          const newProfile: UserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            watchlist: [],
            watchLater: [],
            continueWatching: [],
          }

          await setDoc(userRef, newProfile)
          setProfile(newProfile)
        }
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Sign out function
  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  // Add to watchlist
  const addToWatchlist = async (showId: string) => {
    if (!user) return

    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      watchlist: arrayUnion(showId),
    })

    // Update local state
    setProfile((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        watchlist: [...prev.watchlist, showId],
      }
    })
  }

  // Remove from watchlist
  const removeFromWatchlist = async (showId: string) => {
    if (!user) return

    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      watchlist: arrayRemove(showId),
    })

    // Update local state
    setProfile((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        watchlist: prev.watchlist.filter((id) => id !== showId),
      }
    })
  }

  // Add to watch later
  const addToWatchLater = async (showId: string) => {
    if (!user) return

    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      watchLater: arrayUnion(showId),
    })

    // Update local state
    setProfile((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        watchLater: [...(prev.watchLater || []), showId],
      }
    })
  }

  // Remove from watch later
  const removeFromWatchLater = async (showId: string) => {
    if (!user) return

    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      watchLater: arrayRemove(showId),
    })

    // Update local state
    setProfile((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        watchLater: (prev.watchLater || []).filter((id) => id !== showId),
      }
    })
  }

  // Update continue watching
  const updateContinueWatching = async (show: {
    id: string
    title: string
    poster: string
    progress: number
    duration: string
  }) => {
    if (!user) return

    const userRef = doc(db, "users", user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const userData = userSnap.data() as UserProfile
      const continueWatching = userData.continueWatching || []

      // Remove existing entry if it exists
      const filtered = continueWatching.filter((item) => item.id !== show.id)

      // Add new entry
      const newEntry = {
        ...show,
        timestamp: Date.now(),
        lastWatched: Date.now(),
      }

      // Update Firestore
      await updateDoc(userRef, {
        continueWatching: [newEntry, ...filtered].slice(0, 15), // Keep only 15 most recent
      })

      // Update local state
      setProfile((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          continueWatching: [newEntry, ...filtered].slice(0, 15),
        }
      })
    }
  }

  // Remove from continue watching
  const removeContinueWatching = async (showId: string) => {
    if (!user) return

    const userRef = doc(db, "users", user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const userData = userSnap.data() as UserProfile
      const continueWatching = userData.continueWatching || []

      // Remove the entry
      const filtered = continueWatching.filter((item) => item.id !== showId)

      // Update Firestore
      await updateDoc(userRef, {
        continueWatching: filtered,
      })

      // Update local state
      setProfile((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          continueWatching: filtered,
        }
      })
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loading,
        signOut,
        addToWatchlist,
        removeFromWatchlist,
        addToWatchLater,
        removeFromWatchLater,
        updateContinueWatching,
        removeContinueWatching,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Create hook for using the context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
