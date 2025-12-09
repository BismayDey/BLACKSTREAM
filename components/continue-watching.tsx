"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@/context/user-context"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { X, Play, Clock } from "lucide-react"

export default function ContinueWatching() {
  const { profile, removeContinueWatching } = useUser?.() || { profile: null, removeContinueWatching: () => {} }
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!profile || !profile.continueWatching || profile.continueWatching.length === 0) {
    return null
  }

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Continue Watching</h2>
        <span className="text-sm text-zinc-400">{profile.continueWatching.length} {profile.continueWatching.length === 1 ? 'show' : 'shows'}</span>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 p-1">
          {profile.continueWatching.map((item) => (
            <div key={item.id} className="relative group w-[280px]">
              <Link href={`/shows/${item.id}`} className="block relative">
                <div className="overflow-hidden rounded-lg border border-zinc-800 group-hover:border-red-500/50 transition-all">
                  <div className="relative aspect-video">
                    <Image
                      src={item.poster || "/placeholder.svg?height=200&width=350"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {/* Play overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3">
                        <Play className="h-6 w-6 text-black fill-black" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-900/90 backdrop-blur">
                    <h3 className="text-sm font-semibold text-white truncate mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration || 'N/A'}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(item.lastWatched || item.timestamp)}</span>
                    </div>
                    <Progress value={item.progress * 100} className="h-1.5" />
                    <p className="text-xs text-zinc-500 mt-2">{Math.round(item.progress * 100)}% watched</p>
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 hover:bg-black/90 text-white rounded-full h-8 w-8 z-10"
                onClick={(e) => {
                  e.preventDefault();
                  removeContinueWatching(item.id);
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
