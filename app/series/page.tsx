import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db" // Import from mock db for now

export const metadata: Metadata = {
  title: "TV Series | BLACKSTREAM",
  description: "Browse our collection of TV series",
}

export default async function SeriesPage() {
  // Use the mock db for now since we don't have actual Firestore data
  const shows = await db.getAllShows()
  // Filter to only include series (for demo purposes, we'll consider shows with duration >= 60 as series)
  const series = shows.filter((show) => Number.parseInt(show.duration) >= 60)

  const categories = [...new Set(series.map((show) => show.genre))].sort()

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-primary">TV Series</h1>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="rounded-full border-primary/20 hover:border-primary/50 hover:bg-primary/5"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="rounded-full border-primary/20 hover:border-primary/50 hover:bg-primary/5 whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {series.map((show) => (
            <Card
              key={show.id}
              className="overflow-hidden group bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              <Link href={`/shows/${show.id}`} className="block relative aspect-[2/3]">
                <Image
                  src={show.thumbnail || "/placeholder.svg?height=450&width=300"}
                  alt={show.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-semibold text-white truncate mb-1">{show.title}</h3>
                    <p className="text-xs text-gray-300">
                      {show.releaseYear} • {show.duration}
                    </p>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
