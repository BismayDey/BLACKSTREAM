"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { collection, query, where, getDocs, updateDoc, arrayRemove } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from "@/lib/firebase" // Import db and auth directly instead of app
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, X, Play } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)
  const router = useRouter()
  const { toast } = useToast()
  // No need to initialize auth and db from app, use the imported ones directly

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
        fetchWatchlist(user.uid)
      } else {
        setWatchlist([])
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const fetchWatchlist = async (uid) => {
    try {
      setLoading(true)
      const userRef = collection(db, "users")
      const q = query(userRef, where("uid", "==", uid))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data()
        const watchlistIds = userData.watchlist || []

        // Fetch show details for each ID in the watchlist
        const showsData = []
        for (const id of watchlistIds) {
          try {
            const response = await fetch(`/api/shows/${id}`)
            if (response.ok) {
              const show = await response.json()
              showsData.push(show)
            }
          } catch (error) {
            console.error(`Error fetching show ${id}:`, error)
          }
        }

        setWatchlist(showsData)
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error)
      toast({
        title: "Error",
        description: "Failed to load your watchlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removeFromWatchlist = async (showId) => {
    try {
      if (!userId) return

      const userRef = collection(db, "users")
      const q = query(userRef, where("uid", "==", userId))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref
        await updateDoc(userDoc, {
          watchlist: arrayRemove(showId),
        })

        // Update local state
        setWatchlist((prev) => prev.filter((show) => show.id !== showId))

        toast({
          title: "Removed from watchlist",
          description: "The show has been removed from your watchlist.",
        })
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error)
      toast({
        title: "Error",
        description: "Failed to remove from watchlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePlay = (showId) => {
    router.push(`/shows/${showId}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-primary">Your Watchlist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-video bg-muted animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-6 text-primary">Your Watchlist</h2>
        <div className="p-8 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">Your watchlist is empty</p>
          <p className="text-sm text-muted-foreground mb-4">
            Add shows to your watchlist to keep track of what you want to watch
          </p>
          <Button onClick={() => router.push("/shows")} variant="default">
            Browse Shows
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">Your Watchlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {watchlist.map((show) => (
          <Card
            key={show.id}
            className="overflow-hidden group bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300"
          >
            <div className="relative aspect-video">
              <Image
                src={show.thumbnail || "/placeholder.svg?height=200&width=350"}
                alt={show.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="rounded-full" onClick={() => handlePlay(show.id)}>
                  <Play className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="rounded-full"
                  onClick={() => removeFromWatchlist(show.id)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold truncate">{show.title}</h3>
              <p className="text-sm text-muted-foreground">{show.genre}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
