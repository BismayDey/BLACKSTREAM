"use server"

import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"

export async function getUserData(userId: string) {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data()
    } else {
      // Create user document if it doesn't exist
      const newUser = {
        id: userId,
        watchlist: [],
        continueWatching: [],
        preferences: {
          theme: "dark",
          subtitles: "en",
          quality: "auto",
        },
        createdAt: new Date().toISOString(),
      }
      await setDoc(userRef, newUser)
      return newUser
    }
  } catch (error) {
    console.error("Error getting user data:", error)
    throw new Error("Failed to get user data")
  }
}

export async function updateUserWatchlist(userId: string, showId: string, add = true) {
  try {
    const userRef = doc(db, "users", userId)

    if (add) {
      await updateDoc(userRef, {
        watchlist: arrayUnion(showId),
      })
    } else {
      await updateDoc(userRef, {
        watchlist: arrayRemove(showId),
      })
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating watchlist:", error)
    throw new Error("Failed to update watchlist")
  }
}

export async function updateContinueWatching(userId: string, showData: any) {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const userData = userSnap.data()
      const continueWatching = userData.continueWatching || []

      // Remove the show if it already exists in the array
      const filteredList = continueWatching.filter((item: any) => item.id !== showData.id)

      // Add the updated show data to the beginning of the array
      const updatedList = [showData, ...filteredList].slice(0, 10) // Keep only the 10 most recent

      await updateDoc(userRef, {
        continueWatching: updatedList,
      })

      return { success: true }
    } else {
      // Create user document if it doesn't exist
      await setDoc(userRef, {
        id: userId,
        watchlist: [],
        continueWatching: [showData],
        preferences: {
          theme: "dark",
          subtitles: "en",
          quality: "auto",
        },
        createdAt: new Date().toISOString(),
      })

      return { success: true }
    }
  } catch (error) {
    console.error("Error updating continue watching:", error)
    throw new Error("Failed to update continue watching")
  }
}

export async function getUserWatchlist(userId: string) {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const userData = userSnap.data()
      return userData.watchlist || []
    }

    return []
  } catch (error) {
    console.error("Error getting watchlist:", error)
    throw new Error("Failed to get watchlist")
  }
}

export async function getUserContinueWatching(userId: string) {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const userData = userSnap.data()
      return userData.continueWatching || []
    }

    return []
  } catch (error) {
    console.error("Error getting continue watching:", error)
    throw new Error("Failed to get continue watching")
  }
}

export async function updateUserPreferences(userId: string, preferences: any) {
  try {
    const userRef = doc(db, "users", userId)

    await updateDoc(userRef, {
      preferences,
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating preferences:", error)
    throw new Error("Failed to update preferences")
  }
}

export async function getUserPreferences(userId: string) {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const userData = userSnap.data()
      return (
        userData.preferences || {
          theme: "dark",
          subtitles: "en",
          quality: "auto",
        }
      )
    }

    return {
      theme: "dark",
      subtitles: "en",
      quality: "auto",
    }
  } catch (error) {
    console.error("Error getting preferences:", error)
    throw new Error("Failed to get preferences")
  }
}
