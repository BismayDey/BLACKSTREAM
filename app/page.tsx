"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"
import Image from "next/image"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import CategoriesSection from "@/components/categories-section"
import FeaturedSection from "@/components/featured-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import ContinueWatching from "@/components/continue-watching"
import { useAuth } from "@/context/auth-context"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Bookmark, BookmarkPlus } from "lucide-react"

// Sample data
const trendingShows = [
  {
    id: "1",
    title: "Cosmic Odyssey",
    genre: "Sci-Fi",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    rating: "9.2",
  },
  {
    id: "2",
    title: "The Last Kingdom",
    genre: "Historical Drama",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    rating: "8.8",
  },
  {
    id: "3",
    title: "Urban Legends",
    genre: "Mystery",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    rating: "8.5",
  },
  {
    id: "4",
    title: "Wilderness",
    genre: "Adventure",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    rating: "7.9",
  },
  {
    id: "5",
    title: "Tech Titans",
    genre: "Documentary",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    rating: "9.0",
  },
  {
    id: "6",
    title: "Laugh Factory",
    genre: "Comedy",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    rating: "8.3",
  },
]

const categories = [
  {
    id: "action",
    name: "Action",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "comedy",
    name: "Comedy",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "drama",
    name: "Drama",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "documentary",
    name: "Documentary",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "scifi",
    name: "Sci-Fi",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "horror",
    name: "Horror",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "romance",
    name: "Romance",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "thriller",
    name: "Thriller",
    image: "/placeholder.svg?height=400&width=600",
  },
]

const awardWinners = [
  {
    id: "7",
    title: "The Silent Echo",
    description:
      "A groundbreaking psychological thriller that explores the depths of human consciousness through the story of a woman who discovers she can hear other people's thoughts.",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    rating: "9.5",
    year: "2023",
    genre: "Psychological Thriller",
    award: "Best Drama Series",
  },
  {
    id: "8",
    title: "Eternal Horizons",
    description:
      "Set in a dystopian future where humanity has colonized distant planets, this epic sci-fi drama follows the journey of a family torn apart by interstellar war.",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    rating: "9.3",
    year: "2022",
    genre: "Sci-Fi Drama",
    award: "Best Visual Effects",
  },
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [watchHistory, setWatchHistory] = useState([])
  const authContext = useAuth()
  const user = authContext?.user || null
  const { profile, addToWatchlist, removeFromWatchlist } = useUser() || {
    profile: null,
    addToWatchlist: null,
    removeFromWatchlist: null,
  }
  const { toast } = useToast()
  const particlesRef = useRef<HTMLCanvasElement>(null)
  const [showSubscriptionBanner, setShowSubscriptionBanner] = useState(true)
  const [watchlistItems, setWatchlistItems] = useState<string[]>([])

  // Get watchlist items
  useEffect(() => {
    if (profile && profile.watchlist) {
      setWatchlistItems(profile.watchlist)
    }
  }, [profile])

  // Particle animation
  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(255, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 150)}, ${Math.random() * 0.5 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  // Fetch watch history
  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        if (user) {
          const historyRef = collection(db, "users", user.uid, "watchHistory")
          const historyQuery = query(historyRef, orderBy("lastWatched", "desc"), limit(5))
          const snapshot = await getDocs(historyQuery)

          const historyData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          setWatchHistory(historyData)
        } else {
          // Get from localStorage for non-logged in users
          const savedHistory = localStorage.getItem("watchHistory")
          if (savedHistory) {
            setWatchHistory(JSON.parse(savedHistory))
          }
        }
      } catch (error) {
        console.error("Error fetching watch history:", error)
      }
    }

    fetchWatchHistory()
  }, [user])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleToggleWatchlist = async (showId: string) => {
    if (!user || !addToWatchlist || !removeFromWatchlist) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add shows to your watchlist",
        variant: "destructive",
      })
      return
    }

    try {
      if (watchlistItems.includes(showId)) {
        await removeFromWatchlist(showId)
        setWatchlistItems(watchlistItems.filter((id) => id !== showId))
        toast({
          title: "Removed from watchlist",
          description: "The show has been removed from your watchlist",
        })
      } else {
        await addToWatchlist(showId)
        setWatchlistItems([...watchlistItems, showId])
        toast({
          title: "Added to watchlist",
          description: "The show has been added to your watchlist",
        })
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error)
      toast({
        title: "Error",
        description: "Failed to update watchlist",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <canvas ref={particlesRef} className="absolute inset-0" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-700"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="absolute text-xl font-bold gradient-text neon-text"
            >
              BLACKSTREAM
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Navbar />

      <main className="min-h-screen">
        {showSubscriptionBanner && !user && (
          <div className="bg-gradient-to-r from-red-900 to-red-700 text-white p-4 relative">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg">Upgrade to BLACKSTREAM Premium</h3>
                <p className="text-sm opacity-90">
                  Enjoy ad-free streaming, exclusive content, and downloads for offline viewing.
                </p>
              </div>
              <div className="mt-3 md:mt-0 flex gap-3">
                <Button variant="secondary" className="bg-white text-red-900 hover:bg-gray-100">
                  Learn More
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">Subscribe Now</Button>
              </div>
              <button
                className="absolute top-2 right-2 text-white/80 hover:text-white"
                onClick={() => setShowSubscriptionBanner(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        )}

        <HeroSection
          title="Immerse Yourself in Captivating Worlds"
          description="Discover a world of entertainment at your fingertips. Our streaming platform offers a diverse selection of movies, TV shows, and original content to satisfy your every viewing desire."
          imageSrc="/placeholder.svg?height=720&width=1280"
        />

        {watchHistory && watchHistory.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <ContinueWatching />
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold gradient-text">Trending Now</h2>
            <Link href="/shows" className="text-primary hover:underline flex items-center gap-1">
              View All <span className="text-lg">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingShows.map((show) => (
              <div key={show.id} className="relative group">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src={show.thumbnail || "/placeholder.svg"}
                    alt={show.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <Link href={`/shows/${show.id}`}>
                      <Button className="w-full mb-2 bg-red-600 hover:bg-red-700">Watch Now</Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 hover:bg-white/10"
                      onClick={() => handleToggleWatchlist(show.id)}
                    >
                      {watchlistItems.includes(show.id) ? (
                        <>
                          <Bookmark className="w-4 h-4 mr-2" /> In My List
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="w-4 h-4 mr-2" /> Add to My List
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <h3 className="mt-2 font-medium truncate">{show.title}</h3>
                <p className="text-sm text-muted-foreground">{show.genre}</p>
              </div>
            ))}
          </div>
        </div>

        <CategoriesSection categories={categories} />

        <FeaturedSection shows={awardWinners} />

        <CTASection />
      </main>

      <Footer />
    </>
  )
}
