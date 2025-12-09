"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { TrendingUp, Play, Star, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Show {
  id: string
  title: string
  genre: string
  thumbnail: string
  rating: string
}

interface TrendingSectionProps {
  shows: Show[]
}

export default function TrendingSection({ shows }: TrendingSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <section ref={ref} className="py-16 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold gradient-text">Trending Now</h2>
          </div>
          <Link href="/shows" className="flex items-center text-primary hover:text-primary/80 transition-colors">
            <span className="mr-1">View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <ScrollArea className="w-full">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="flex space-x-6 pb-4"
          >
            {shows.map((show, index) => (
              <motion.div
                key={show.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                    },
                  },
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="w-[280px] shrink-0 card-hover"
              >
                <Link href={`/shows/${show.id}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 shine">
                    <Image
                      src={show.thumbnail || "/placeholder.svg"}
                      alt={show.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/20 hover:bg-primary/40 text-white rounded-full"
                      >
                        <Play className="w-8 h-8 text-white fill-white" />
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                      {show.rating}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg truncate">{show.title}</h3>
                  <p className="text-muted-foreground text-sm">{show.genre}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  )
}
