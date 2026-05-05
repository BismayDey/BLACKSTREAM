"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  updateProfile,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, displayName?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>
  updateUserData: (data: any) => Promise<void>
  getUserData: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => useContext(AuthContext)

const createUserDocument = async (user: User) => {
  try {
    const userDoc = doc(db, "users", user.uid)
    const docSnap = await getDoc(userDoc)
    if (!docSnap.exists()) {
      await setDoc(userDoc, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split("@")[0],
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        watchHistory: [],
        watchlist: [],
        watchLater: [],
        favorites: [],
        continueWatching: [],
        settings: {
          notifications: true,
          autoplay: true,
          subtitlesLanguage: "en",
          quality: "auto",
        },
      })
    }
  } catch (err) {
    console.warn("Could not create user document (possibly offline):", err)
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Handle redirect result (for popup-blocked fallback)
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          await createUserDocument(result.user)
        }
      })
      .catch((err) => {
        // Ignore errors from no pending redirect
        if (err.code !== 'auth/no-auth-event') {
          console.error("Error handling redirect result:", err)
        }
      })
  }, [])

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(result.user, { displayName })
      }
      await createUserDocument(result.user)
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('email')
    provider.addScope('profile')
    try {
      // Try popup first (better UX)
      const result = await signInWithPopup(auth, provider)
      await createUserDocument(result.user)
    } catch (error: any) {
      if (
        error.code === 'auth/popup-blocked' ||
        error.code === 'auth/popup-closed-by-user' ||
        error.code === 'auth/cancelled-popup-request'
      ) {
        // Fallback to redirect when popup is blocked
        await signInWithRedirect(auth, provider)
        // Page will redirect — no return value needed
      } else {
        console.error("Error signing in with Google:", error)
        throw error
      }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error("Error sending password reset:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!auth.currentUser) throw new Error("No user logged in")
    try {
      await updateProfile(auth.currentUser, data)
      const userDoc = doc(db, "users", auth.currentUser.uid)
      await setDoc(userDoc, data, { merge: true })
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    }
  }

  const updateUserData = async (data: any) => {
    if (!auth.currentUser) throw new Error("No user logged in")
    try {
      const userDoc = doc(db, "users", auth.currentUser.uid)
      await setDoc(userDoc, data, { merge: true })
    } catch (error) {
      console.error("Error updating user data:", error)
      throw error
    }
  }

  const getUserData = async () => {
    if (!auth.currentUser) throw new Error("No user logged in")
    try {
      const userDoc = doc(db, "users", auth.currentUser.uid)
      const docSnap = await getDoc(userDoc)
      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        const defaultData = {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: auth.currentUser.displayName || auth.currentUser.email?.split("@")[0],
          photoURL: auth.currentUser.photoURL,
          createdAt: new Date().toISOString(),
          watchHistory: [],
          watchlist: [],
          watchLater: [],
          favorites: [],
          continueWatching: [],
          settings: {
            notifications: true,
            autoplay: true,
            subtitlesLanguage: "en",
            quality: "auto",
          },
        }
        await setDoc(userDoc, defaultData)
        return defaultData
      }
    } catch (error) {
      console.error("Error getting user data:", error)
      throw error
    }
  }

  const value = {
    user,
    loading: loading || !mounted,
    signUp,
    signIn,
    signInWithGoogle,
    resetPassword,
    signOut,
    updateUserProfile,
    updateUserData,
    getUserData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
