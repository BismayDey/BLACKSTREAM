"use client"

import { useState } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Grid3x3, Grid2x2, LayoutGrid } from "lucide-react"
import netflixShows from "@/lib/netflix-content"

// Language mapping for movies (inferred from content)
const movieLanguages: Record<string, string> = {
  "12th Fail": "Hindi",
  "Rocky Aur Rani": "Hindi",
  "Jawan": "Hindi",
  "Pathaan": "Hindi",
  "Animal": "Hindi",
  "Tiger 3": "Hindi",
  "Dunki": "Hindi",
  "Squid Game: The Challenge": "Korean",
  "Money Heist: Korea": "Korean",
  "All of Us Are Dead": "Korean",
  "Physical: 100": "Korean",
  "Extraordinary Attorney Woo": "Korean",
  "Narcos: Mexico": "Spanish",
  "Elite": "Spanish",
  "Money Heist": "Spanish",
  "Sky Rojo": "Spanish",
  "Lupin": "French",
  "Emily in Paris": "French",
  "Dark": "German",
  "Barbarians": "German",
  "Sacred Games": "Hindi",
  "Delhi Crime": "Hindi",
  "Jamtara": "Hindi",
}

export default function MoviesPage() {
  // Filter to only include movies
  const allMovies = netflixShows.filter((show) => show.type === "movie")
  
  // Extract unique genres from movies
  const allGenres = Array.from(
    new Set(allMovies.flatMap((movie) => movie.genre))
  ).sort()

  // Extract unique languages from movies
  const allLanguages = Array.from(
    new Set(
      allMovies.map((movie) => movieLanguages[movie.title] || "English")
    )
  ).sort()

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [showBrowseByGenre, setShowBrowseByGenre] = useState<boolean>(false)
  const [showBrowseByLanguage, setShowBrowseByLanguage] = useState<boolean>(false)
  const [gridSize, setGridSize] = useState<"small" | "medium" | "large">("medium")

  // Filter movies by selected genre and language - show all if nothing selected
  const filteredMovies = allMovies.filter((movie) => {
    const matchesGenre = selectedGenre ? movie.genre.includes(selectedGenre) : true
    const movieLanguage = movieLanguages[movie.title] || "English"
    const matchesLanguage = selectedLanguage ? movieLanguage === selectedLanguage : true
    return matchesGenre && matchesLanguage
  })

  // Genre images for Browse by Genre section - using popular shows
  const genreImages: Record<string, string> = {
    "Action": "https://image.tmdb.org/t/p/w500/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg", // The Adam Project
    "Drama": "https://image.tmdb.org/t/p/w500/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg", // Breaking Bad
    "Comedy": "https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg", // Glass Onion
    "Thriller": "https://image.tmdb.org/t/p/w500/e7Jvsry47JJQruuezjU2X1Z6J77.jpg", // The Killer
    "Sci-Fi": "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg", // Stranger Things
    "Horror": "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", // Stranger Things
    "Romance": "https://image.tmdb.org/t/p/w500/ubFfkW2UECsVYuqEqhpF7rxaHm2.jpg", // Rocky Aur Rani
    "Mystery": "https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg", // Glass Onion
    "Adventure": "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg", // The Witcher
    "Crime": "https://image.tmdb.org/t/p/w500/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg", // The Irishman
    "Fantasy": "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg", // The Witcher
    "Biography": "https://image.tmdb.org/t/p/w500/fYaYwY7xMDx0G3JppAc8abMPZCp.jpg", // 12th Fail
    "Animation": "https://image.tmdb.org/t/p/w500/8wmaN5NKXMEzL86NJbmPFqzJm0Z.jpg", // Nimona
    "History": "https://image.tmdb.org/t/p/w500/k7rEpZfNMB35WWLJHVsziPEsP4x.jpg", // Society of the Snow
    "Science Fiction": "https://image.tmdb.org/t/p/w500/4E3vRfpXk6vBdEKNagPvnHWPWc7.jpg", // Spiderhead
    "Family": "https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg", // Enola Holmes
  }

  // Language images for Browse by Language section
  const languageImages: Record<string, string> = {
    "English": "https://image.tmdb.org/t/p/w500/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg", // The Adam Project
    "Hindi": "https://image.tmdb.org/t/p/w500/fYaYwY7xMDx0G3JppAc8abMPZCp.jpg", // 12th Fail
    "Korean": "https://image.tmdb.org/t/p/w500/lbg7ku1wvjyD1d6cD9MZbdjwVfL.jpg", // Squid Game
    "Spanish": "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg", // Money Heist
    "French": "https://image.tmdb.org/t/p/w500/ga4OLltZf0Z8IxJYzS5PhhCMZKP.jpg", // Lupin
    "German": "https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg", // Dark
    "Japanese": "https://image.tmdb.org/t/p/w500/qbJkpKW3iRuNpbBvzXcQYf7U9Tk.jpg", // Anime
    "Portuguese": "https://image.tmdb.org/t/p/w500/mXuqn7L8prDqjxT8keil2bwdSg5.jpg", // 3%
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Movies
            </h1>
            <div className="flex gap-2 flex-wrap">
              {/* Grid View Toggle */}
              <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={gridSize === "large" ? "default" : "ghost"}
                  onClick={() => setGridSize("large")}
                  className={gridSize === "large" ? "bg-red-600 hover:bg-red-700" : "hover:bg-white/10"}
                  title="Large Grid"
                >
                  <Grid2x2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={gridSize === "medium" ? "default" : "ghost"}
                  onClick={() => setGridSize("medium")}
                  className={gridSize === "medium" ? "bg-red-600 hover:bg-red-700" : "hover:bg-white/10"}
                  title="Medium Grid"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={gridSize === "small" ? "default" : "ghost"}
                  onClick={() => setGridSize("small")}
                  className={gridSize === "small" ? "bg-red-600 hover:bg-red-700" : "hover:bg-white/10"}
                  title="Small Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="border-red-500 text-red-500 hover:bg-red-500/10"
                onClick={() => setShowBrowseByGenre(!showBrowseByGenre)}
              >
                {showBrowseByGenre ? "Hide Genre" : "Show Genre"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
                onClick={() => setShowBrowseByLanguage(!showBrowseByLanguage)}
              >
                {showBrowseByLanguage ? "Hide Language" : "Show Language"}
              </Button>
            </div>
          </div>
          <p className="text-gray-400">
            Explore our collection of {allMovies.length} amazing movies
            {selectedGenre && ` in ${selectedGenre}`}
            {selectedLanguage && ` in ${selectedLanguage}`}
          </p>
          {(selectedGenre || selectedLanguage) && (
            <div className="mt-4">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                onClick={() => {
                  setSelectedGenre(null)
                  setSelectedLanguage(null)
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Browse by Genre Section */}
        {showBrowseByGenre && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Browse by Genre
              </h2>
              {selectedGenre && (
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                  onClick={() => setSelectedGenre(null)}
                >
                  Clear Filter
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {allGenres.map((genre) => {
                const count = allMovies.filter((m) => m.genre.includes(genre)).length
                return (
                  <motion.div
                    key={genre}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGenre(genre)}
                    className={`group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer ${
                      selectedGenre === genre ? "ring-4 ring-red-500" : ""
                    }`}
                  >
                    <Image
                      src={genreImages[genre] || genreImages["Action"]}
                      alt={genre}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      selectedGenre === genre 
                        ? "bg-red-600/60" 
                        : "bg-black/40 group-hover:bg-black/20"
                    }`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl md:text-2xl font-bold text-white mb-1">{genre}</span>
                      <Badge className="bg-white/20 text-white text-xs backdrop-blur-sm">
                        {count} {count === 1 ? "movie" : "movies"}
                      </Badge>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}

        {/* Browse by Language Section */}
        {showBrowseByLanguage && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Browse by Language
              </h2>
              {selectedLanguage && (
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
                  onClick={() => setSelectedLanguage(null)}
                >
                  Clear Filter
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {allLanguages.map((language) => {
                const count = allMovies.filter((m) => 
                  (movieLanguages[m.title] || "English") === language
                ).length
                return (
                  <motion.div
                    key={language}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLanguage(language)}
                    className={`group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer ${
                      selectedLanguage === language ? "ring-4 ring-orange-500" : ""
                    }`}
                  >
                    <Image
                      src={languageImages[language] || languageImages["English"]}
                      alt={language}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      selectedLanguage === language 
                        ? "bg-orange-600/60" 
                        : "bg-black/40 group-hover:bg-black/20"
                    }`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl md:text-2xl font-bold text-white mb-1">{language}</span>
                      <Badge className="bg-white/20 text-white text-xs backdrop-blur-sm">
                        {count} {count === 1 ? "movie" : "movies"}
                      </Badge>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}

        {/* Movies Grid */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white">
            {selectedGenre && selectedLanguage 
              ? `${selectedGenre} Movies in ${selectedLanguage}` 
              : selectedGenre 
              ? `${selectedGenre} Movies` 
              : selectedLanguage
              ? `${selectedLanguage} Movies`
              : "All Movies"} ({filteredMovies.length})
          </h3>
        </div>

        <motion.div 
          layout
          className={`grid gap-4 md:gap-6 ${
            gridSize === "large" 
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"
              : gridSize === "medium"
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
              : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
          }`}
        >
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
            >
              <Card className="overflow-hidden group bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-red-600 transition-all duration-300 transform hover:scale-105">
                <Link href={`/shows/${movie.id}`} className="block">
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={movie.poster || movie.thumbnail}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3">
                      <Play className="w-12 h-12 md:w-16 md:h-16 text-white mb-2 drop-shadow-2xl fill-white/20" />
                      <p className="text-white text-xs md:text-sm font-semibold text-center line-clamp-2 mb-1">
                        {movie.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{movie.userRating}</span>
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white text-xs font-semibold">
                        {movie.userRating}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-600 text-white text-xs">
                        {movie.releaseYear}
                      </Badge>
                    </div>
                  </div>

                  {/* Mobile Info (always visible on mobile) */}
                  <div className="p-2 md:hidden">
                    <h3 className="font-semibold text-white text-sm line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {movie.duration}
                    </p>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No movies found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
