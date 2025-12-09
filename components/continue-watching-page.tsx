"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/context/user-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, X, Play, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ContinueWatchingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { profile, removeContinueWatching } = useUser()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return "Just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const handleRemove = async (showId: string) => {
    try {
      await removeContinueWatching(showId)
      toast({
        title: "Removed",
        description: "Item removed from continue watching",
      })
    } catch (error) {
      console.error("Error removing:", error)
      toast({
        title: "Error",
        description: "Failed to remove item",
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
        <h1 className="text-4xl font-bold mb-8 text-white">Continue Watching</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden bg-zinc-900/50 border-zinc-800">
              <div className="aspect-video bg-zinc-800 animate-pulse"></div>
              <CardContent className="p-4">
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
        <h1 className="text-4xl font-bold mb-8 text-white">Continue Watching</h1>
        <div className="p-12 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <Play className="mx-auto h-16 w-16 text-zinc-500 mb-4" />
          <p className="text-xl text-zinc-300 mb-2">Sign in to see your watch history</p>
          <p className="text-sm text-zinc-500 mb-6">
            Pick up right where you left off
          </p>
          <Button onClick={() => router.push("/login")} size="lg">
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  const continueWatching = profile?.continueWatching || []

  if (continueWatching.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Continue Watching</h1>
        <div className="p-12 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <Play className="mx-auto h-16 w-16 text-zinc-500 mb-4" />
          <p className="text-xl text-zinc-300 mb-2">Nothing to continue yet</p>
          <p className="text-sm text-zinc-500 mb-6">
            Start watching something and it will appear here
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
      <h1 className="text-4xl font-bold mb-4 text-white">Continue Watching</h1>
      <p className="text-zinc-400 mb-8">
        {continueWatching.length} {continueWatching.length === 1 ? "item" : "items"} in progress
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {continueWatching.map((item) => (
          <Card
            key={item.id}
            className="group relative overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-red-500/50 transition-all duration-300"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={item.poster || "/placeholder.svg?height=200&width=350"}
                alt={item.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Play overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  onClick={() => handlePlay(item.id)}
                  size="icon"
                  className="bg-white/90 hover:bg-white text-black rounded-full w-16 h-16"
                >
                  <Play className="h-8 w-8 fill-black" />
                </Button>
              </div>

              {/* Remove button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 hover:bg-black/90 text-white rounded-full h-8 w-8 z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove(item.id)
                }}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Progress bar overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-zinc-800">
                <div 
                  className="h-full bg-red-600 transition-all"
                  style={{ width: `${item.progress * 100}%` }}
                />
              </div>
            </div>

            <CardContent className="p-4 bg-zinc-900/90 backdrop-blur">
              <h3 className="font-semibold text-white text-base mb-2 truncate">
                {item.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{item.duration || "N/A"}</span>
                </div>
                <span>{formatTimeAgo(item.lastWatched || item.timestamp)}</span>
              </div>

              <div className="space-y-2">
                <Progress value={item.progress * 100} className="h-2" />
                <p className="text-xs text-zinc-500">
                  {Math.round(item.progress * 100)}% completed
                </p>
              </div>

              <Button
                onClick={() => handlePlay(item.id)}
                className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                <Play className="h-4 w-4 mr-2 fill-white" />
                Resume
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
