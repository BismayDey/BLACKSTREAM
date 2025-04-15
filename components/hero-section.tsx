"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Info, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ParticleBackground from "./particle-background"

interface HeroSectionProps {
  title: string
  description: string
  imageSrc: string
  rating?: string
  year?: string
  category?: string
  duration?: string
}

export default function HeroSection({
  title,
  description,
  imageSrc,
  rating = "9.2",
  year = "2023",
  category = "Sci-Fi",
  duration = "45 min",
}: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] } },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient and particle effect */}
      <div className="absolute inset-0 hero-gradient z-0"></div>
      <ParticleBackground />

      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          priority
          className="object-cover opacity-40"
          onLoadingComplete={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50 z-10"></div>
      </div>

      <div className="container mx-auto px-4 z-20 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isLoaded ? "show" : "hidden"}
            className="text-left stagger-animation"
          >
            <motion.div variants={item}>
              <Badge className="mb-4 bg-primary/80 hover:bg-primary text-white">Featured</Badge>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text">
              {title}
            </motion.h1>

            <motion.div variants={item} className="flex items-center gap-4 text-white/90 mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span>{rating}</span>
              </div>
              <span>{year}</span>
              <span>{category}</span>
              <span>{duration}</span>
            </motion.div>

            <motion.p variants={item} className="text-xl text-white/80 max-w-xl mb-8">
              {description}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white animate-pulse-glow">
                <Play className="w-5 h-5" />
                Watch Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 gap-2"
              >
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </motion.div>
          </motion.div>

          {/* Featured image/poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-[2/3] w-full max-w-md mx-auto card-3d">
              <Image
                src={
                  imageSrc.replace("width=1280", "width=600").replace("height=720", "height=900") || "/placeholder.svg"
                }
                alt={title}
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 rounded-lg shadow-[0_0_30px_rgba(244,114,182,0.3)] pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  )
}
