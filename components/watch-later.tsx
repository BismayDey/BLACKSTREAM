"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/context/user-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, X, Play, Loader2 } from "lucide-react"
import { netflixShows } from "@/lib/netflix-content"

export default function WatchLater() {
  const [watchLaterShows, setWatchLaterShows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const { profile, removeFromWatchLater } = useUser()

  useEffect(() => {
    if (profile) {
      fetchWatchLater()
    } else {
      setLoading(false)
    }
  }, [profile])

  const fetchWatchLater = async () => {
    try {
      setLoading(true)
      const watchLaterIds = profile?.watchLater || []

      // Get show details from netflix-content
      const showsData = watchLaterIds
        .map((id) => netflixShows.find((show) => show.id === id))
        .filter(Boolean)

      setWatchLaterShows(showsData)
    } catch (error) {
      console.error("Error fetching watch later:", error)
      toast({
        title: "Error",
        description: "Failed to load your watch later list. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (showId: string) => {
    try {
      await removeFromWatchLater(showId)
      setWatchLaterShows((prev) => prev.filter((show) => show.id !== showId))
      toast({
        title: "Removed from watch later",
        description: "The show has been removed from your watch later list.",
      })
    } catch (error) {
      console.error("Error removing from watch later:", error)
      toast({
        title: "Error",
        description: "Failed to remove from watch later. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePlay = (showId: string) => {
    router.push(`/shows/${showId}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-white">Watch Later</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="overflow-hidden bg-zinc-900/50 border-zinc-800">
              <div className="aspect-[2/3] bg-zinc-800 animate-pulse"></div>
              <CardContent className="p-3">
                <div className="h-4 bg-zinc-800 animate-pulse rounded mb-2"></div>
                <div className="h-3 bg-zinc-800 animate-pulse rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Watch Later</h2>
        <div className="p-12 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <Clock className="mx-auto h-16 w-16 text-zinc-500 mb-4" />
          <p className="text-xl text-zinc-300 mb-2">Sign in to access your watch later list</p>
          <p className="text-sm text-zinc-500 mb-6">
            Keep track of shows and movies you want to watch
          </p>
          <Button onClick={() => router.push("/login")} size="lg">
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  if (watchLaterShows.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Watch Later</h2>
        <div className="p-12 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <Clock className="mx-auto h-16 w-16 text-zinc-500 mb-4" />
          <p className="text-xl text-zinc-300 mb-2">Your watch later list is empty</p>
          <p className="text-sm text-zinc-500 mb-6">
            Save shows to watch them later
          </p>
          <Button onClick={() => router.push("/shows")} size="lg">
            Browse Shows
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Watch Later</h2>
      <p className="text-zinc-400 mb-8">{watchLaterShows.length} {watchLaterShows.length === 1 ? 'show' : 'shows'} saved</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {watchLaterShows.map((show) => (
          <Card
            key={show.id}
            className="group relative overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-red-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="aspect-[2/3] relative overflow-hidden">
              <Image
                src={show.poster || "/placeholder.svg?height=450&width=300"}
                alt={show.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover overlay with actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={() => handlePlay(show.id)}
                  size="icon"
                  className="bg-white/90 hover:bg-white text-black rounded-full w-12 h-12"
                >
                  <Play className="h-6 w-6 fill-black" />
                </Button>
              </div>

              {/* Remove button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 hover:bg-black/90 text-white rounded-full h-8 w-8 z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove(show.id)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <CardContent className="p-3">
              <h3 className="font-semibold text-white text-sm truncate mb-1">
                {show.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{show.releaseYear}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {show.duration}
                </span>
              </div>
              {show.rating && (
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(show.rating / 2)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-zinc-600"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400">{show.rating.toFixed(1)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
