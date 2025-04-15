"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Award, Star, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FeaturedShow {
  id: string
  title: string
  description: string
  thumbnail: string
  rating: string
  year: string
  genre: string
  award: string
}

interface FeaturedSectionProps {
  shows: FeaturedShow[]
}

export default function FeaturedSection({ shows }: FeaturedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-10"
        >
          <Award className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold gradient-text">Award Winners</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden rounded-xl group card-hover"
            >
              <Link href={`/shows/${show.id}`} className="block">
                <div className="relative aspect-[16/9] md:aspect-[21/9]">
                  <Image
                    src={show.thumbnail || "/placeholder.svg"}
                    alt={show.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6">
                    <Badge className="mb-2 self-start bg-primary/80 hover:bg-primary text-white">{show.award}</Badge>
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {show.title}
                    </h3>
                    <p className="text-white/80 line-clamp-2 md:w-3/4 mb-2 text-sm md:text-base">{show.description}</p>
                    <div className="flex items-center gap-4 text-white/70 text-sm mt-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{show.rating}</span>
                      </div>
                      <span>{show.year}</span>
                      <span>{show.genre}</span>
                    </div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="icon"
                        className="w-16 h-16 rounded-full bg-primary/80 hover:bg-primary text-white shadow-lg"
                      >
                        <Play className="w-8 h-8 fill-current" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
