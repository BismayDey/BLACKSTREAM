"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signOut as firebaseSignOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  sendSignInLink: (email: string) => Promise<void>
  completeSignInWithEmailLink: (email: string, emailLink: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>
  updateUserData: (data: any) => Promise<void>
  getUserData: () => Promise<any>
  isSignInLink: (url: string) => boolean
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

  const sendSignInLink = async (email: string) => {
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      }
      
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      
      // Save the email to localStorage so we can use it later
      window.localStorage.setItem('emailForSignIn', email)
    } catch (error) {
      console.error("Error sending sign in link:", error)
      throw error
    }
  }

  const completeSignInWithEmailLink = async (email: string, emailLink: string) => {
    try {
      // Check if user is already signed in
      if (auth.currentUser) {
        // Already signed in, just clean up
        window.localStorage.removeItem('emailForSignIn')
        return
      }

      const result = await signInWithEmailLink(auth, email, emailLink)
      
      // Clear the email from localStorage
      window.localStorage.removeItem('emailForSignIn')
      
      // Check if user document exists, if not create it
      const userDoc = doc(db, "users", result.user.uid)
      const docSnap = await getDoc(userDoc)

      if (!docSnap.exists()) {
        await setDoc(userDoc, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName || result.user.email?.split('@')[0],
          photoURL: result.user.photoURL,
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
    } catch (error) {
      console.error("Error completing sign in with email link:", error)
      throw error
    }
  }

  const isSignInLink = (url: string) => {
    return isSignInWithEmailLink(auth, url)
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
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
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
    } catch (error) {
      console.error("Error signing in with Google:", error)
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
    sendSignInLink,
    completeSignInWithEmailLink,
    signInWithGoogle,
    signOut,
    updateUserProfile,
    updateUserData,
    getUserData,
    isSignInLink,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
