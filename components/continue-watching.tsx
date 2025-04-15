"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@/context/user-context"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

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

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Continue Watching</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 p-1">
          {profile.continueWatching.map((item) => (
            <div key={item.id} className="relative group">
              <Link href={`/shows/${item.id}`} className="block w-[200px] relative">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={item.poster || "/placeholder.svg?height=300&width=200"}
                    alt={item.title}
                    width={200}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="text-sm font-medium text-white truncate">{item.title}</h3>
                  <Progress value={item.progress * 100} className="h-1 mt-2" />
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white rounded-full h-7 w-7"
                onClick={() => removeContinueWatching(item.id)}
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
