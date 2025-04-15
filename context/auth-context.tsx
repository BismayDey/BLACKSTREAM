"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile with display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
      }

      // Create user document in Firestore
      const userDoc = doc(db, "users", userCredential.user.uid)
      await setDoc(userDoc, {
        email,
        displayName: name,
        createdAt: new Date().toISOString(),
        watchHistory: [],
        watchlist: [],
        favorites: [],
        settings: {
          notifications: true,
          autoplay: true,
          subtitlesLanguage: "en",
          quality: "auto",
        },
      })
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
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      // Check if user document exists, if not create it
      const userDoc = doc(db, "users", result.user.uid)
      const docSnap = await getDoc(userDoc)

      if (!docSnap.exists()) {
        await setDoc(userDoc, {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          createdAt: new Date().toISOString(),
          watchHistory: [],
          watchlist: [],
          favorites: [],
          settings: {
            notifications: true,
            autoplay: true,
            subtitlesLanguage: "en",
            quality: "auto",
          },
        })
      }
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error("Error resetting password:", error)
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

      // Also update the user data in Firestore
      const userDoc = doc(db, "users", auth.currentUser.uid)
      await updateDoc(userDoc, data)
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    }
  }

  const updateUserData = async (data: any) => {
    if (!auth.currentUser) throw new Error("No user logged in")

    try {
      const userDoc = doc(db, "users", auth.currentUser.uid)
      await updateDoc(userDoc, data)
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
        return null
      }
    } catch (error) {
      console.error("Error getting user data:", error)
      throw error
    }
  }

  const value = {
    user,
    loading,
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
