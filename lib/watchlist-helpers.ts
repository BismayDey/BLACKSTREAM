"use client"

import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

export async function addToWatchlist(userId: string, showId: string, showData?: any) {
  try {
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      // Add to existing watchlist
      await updateDoc(userRef, {
        watchlist: arrayUnion(showId),
      })
    } else {
      // Create new user document with watchlist
      await setDoc(userRef, {
        watchlist: [showId],
        createdAt: new Date().toISOString(),
      })
    }

    // If show data is provided, save it to a separate collection for quick access
    if (showData) {
      const watchlistItemRef = doc(db, "users", userId, "watchlistItems", showId)
      await setDoc(watchlistItemRef, {
        ...showData,
        addedAt: new Date().toISOString(),
      })
    }

    return true
  } catch (error) {
    console.error("Error adding to watchlist:", error)
    throw error
  }
}

export async function removeFromWatchlist(userId: string, showId: string) {
  try {
    const userRef = doc(db, "users", userId)

    // Remove from watchlist array
    await updateDoc(userRef, {
      watchlist: arrayRemove(showId),
    })

    // Also remove from watchlistItems collection if it exists
    try {
      const watchlistItemRef = doc(db, "users", userId, "watchlistItems", showId)
      await updateDoc(watchlistItemRef, {
        removed: true,
        removedAt: new Date().toISOString(),
      })
    } catch (error) {
      // Ignore errors if the document doesn't exist
      console.log("Watchlist item document may not exist:", error)
    }

    return true
  } catch (error) {
    console.error("Error removing from watchlist:", error)
    throw error
  }
}

export async function isInWatchlist(userId: string, showId: string) {
  try {
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      return userData.watchlist && userData.watchlist.includes(showId)
    }

    return false
  } catch (error) {
    console.error("Error checking watchlist:", error)
    return false
  }
}

export function useWatchlistActions() {
  const { toast } = useToast()

  const handleAddToWatchlist = async (userId: string, showId: string, title: string, showData?: any) => {
    try {
      await addToWatchlist(userId, showId, showData)
      toast({
        title: "Added to watchlist",
        description: `${title} has been added to your watchlist`,
      })
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add to watchlist. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const handleRemoveFromWatchlist = async (userId: string, showId: string, title: string) => {
    try {
      await removeFromWatchlist(userId, showId)
      toast({
        title: "Removed from watchlist",
        description: `${title} has been removed from your watchlist`,
      })
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove from watchlist. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  return { handleAddToWatchlist, handleRemoveFromWatchlist }
}
