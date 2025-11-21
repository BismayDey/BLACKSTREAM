"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Info,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import netflixShows from "@/lib/netflix-content";
import Footer from "@/components/footer";

export default function HomePage() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const authContext = useAuth();
  const user = authContext?.user || null;
  const { profile, addToWatchlist, removeFromWatchlist } = useUser() || {};
  const { toast } = useToast();

  // Get featured content (specific shows for hero rotation)
  const featuredContent = netflixShows.filter(show => 
    ["Wednesday", "Stranger Things", "Breaking Bad", "Squid Game", "The Witcher"].includes(show.title)
  );
  const currentHero = featuredContent[currentHeroIndex];

  // Trending (TV series only) - ensure Stranger Things is first
  const strangerThings = netflixShows.find(show => show.title === "Stranger Things");
  const trendingSeries = strangerThings
    ? [strangerThings, ...netflixShows.filter(show => show.type === "series" && show.id !== strangerThings.id).slice(0, 5)]
    : netflixShows.filter(show => show.type === "series").slice(0, 6);

  // Top Rated Movies
  const topMovies = netflixShows
    .filter((show) => show.type === "movie")
    .sort((a, b) => b.userRating - a.userRating);

  // Recently Added
  const recentlyAdded = netflixShows
    .sort((a, b) => b.releaseYear - a.releaseYear)
    .slice(0, 6);

  // Continue Watching (mock for now)
  const [continueWatching, setContinueWatching] = useState<any[]>([]);

  // Auto-rotate hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % featuredContent.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredContent.length]);

  // Genre images for Browse by Genre section
  const genreImages: Record<string, string> = {
    "Action": "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    "Drama": "https://image.tmdb.org/t/p/w500/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg",
    "Comedy": "https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    "Thriller": "https://image.tmdb.org/t/p/w500/wlfDxbGEsW58vGhFljKkcR5IxDj.jpg",
    "Sci-Fi": "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    "Horror": "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    "Romance": "https://image.tmdb.org/t/p/w500/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg",
    "Mystery": "https://image.tmdb.org/t/p/w500/8jWzCHn4PLpRiwa4O2jpSy2lxHZ.jpg",
  };

  // Check if item is in watchlist
  const isInWatchlist = (id: string) => {
    return profile?.watchlist?.includes(id) || false;
  };

  // Toggle watchlist
  const handleWatchlistToggle = async (id: string, title: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add to your watchlist",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isInWatchlist(id)) {
        await removeFromWatchlist?.(id);
        toast({
          title: "Removed from watchlist",
          description: `${title} removed from your watchlist`,
        });
      } else {
        await addToWatchlist?.(id);
        toast({
          title: "Added to watchlist",
          description: `${title} added to your watchlist`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update watchlist",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Featured Content */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={currentHero.backdrop}
                alt={currentHero.title}
                fill
                className="object-cover"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex h-full items-end pb-32">
              <div className="container mx-auto px-4 md:px-8">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-2xl"
                >
                  {/* Badge */}
                  <div className="mb-4 flex items-center gap-2">
                    <Badge
                      variant="destructive"
                      className="bg-red-600 text-white px-3 py-1 text-xs font-bold"
                    >
                      #{currentHeroIndex + 1} TRENDING TODAY
                    </Badge>
                    {currentHero.type === "series" && (
                      <Badge
                        variant="outline"
                        className="border-white/30 text-white px-3 py-1 text-xs"
                      >
                        SERIES
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                    {currentHero.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-white/90 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {currentHero.userRating}
                      </span>
                    </div>
                    <span>{currentHero.releaseYear}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {currentHero.duration}
                    </span>
                    <div className="flex gap-1">
                      {currentHero.genre.slice(0, 2).map((g) => (
                        <Badge
                          key={g}
                          variant="secondary"
                          className="bg-white/20 text-white text-xs"
                        >
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-white/90 mb-8 line-clamp-3 max-w-xl">
                    {currentHero.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 font-semibold px-8"
                    >
                      <Link href={`/shows/${currentHero.id}`}>
                        <Play className="w-5 h-5 mr-2 fill-current" />
                        Play Now
                      </Link>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm font-semibold px-8"
                      asChild
                    >
                      <Link href={`/shows/${currentHero.id}`}>
                        <Info className="w-5 h-5 mr-2" />
                        More Info
                      </Link>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                      onClick={() =>
                        handleWatchlistToggle(currentHero.id, currentHero.title)
                      }
                    >
                      {isInWatchlist(currentHero.id) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Hero Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {featuredContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroIndex(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === currentHeroIndex
                      ? "w-8 bg-white"
                      : "w-1 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Content Sections */}
      <div className="relative z-20 -mt-24 pb-16 space-y-12">
        {/* Trending Series */}
        <ContentRow
          title="Trending Now"
          icon={<TrendingUp className="w-6 h-6" />}
          items={trendingSeries}
          onWatchlistToggle={handleWatchlistToggle}
          isInWatchlist={isInWatchlist}
        />

        {/* Top Rated Movies */}
        <ContentRow
          title="Top Rated Movies"
          icon={<Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />}
          items={topMovies}
          onWatchlistToggle={handleWatchlistToggle}
          isInWatchlist={isInWatchlist}
        />

        {/* Recently Added */}
        <ContentRow
          title="Recently Added"
          items={recentlyAdded}
          onWatchlistToggle={handleWatchlistToggle}
          isInWatchlist={isInWatchlist}
        />

        {/* Browse by Genre */}
        <section className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Browse by Genre
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Action",
              "Drama",
              "Comedy",
              "Thriller",
              "Sci-Fi",
              "Horror",
              "Romance",
              "Mystery",
            ].map((genre) => (
              <Link
                key={genre}
                href={`/shows?genre=${genre.toLowerCase()}`}
                className="group relative aspect-video overflow-hidden rounded-lg"
              >
                <Image
                  src={genreImages[genre]}
                  alt={genre}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{genre}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

// Content Row Component
interface ContentRowProps {
  title: string;
  icon?: React.ReactNode;
  items: any[];
  onWatchlistToggle: (id: string, title: string) => void;
  isInWatchlist: (id: string) => boolean;
}

function ContentRow({
  title,
  icon,
  items,
  onWatchlistToggle,
  isInWatchlist,
}: ContentRowProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useState<HTMLDivElement | null>(null)[0];

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(
      `scroll-${title.replace(/\s/g, "")}`
    );
    if (container) {
      const scrollAmount = direction === "left" ? -800 : 800;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto px-4 md:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          {icon}
          {title}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-black/50 border-white/20 hover:bg-white/10 text-white"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-black/50 border-white/20 hover:bg-white/10 text-white"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        id={`scroll-${title.replace(/\s/g, "")}`}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <ContentCard
            key={item.id}
            item={item}
            index={index}
            onWatchlistToggle={onWatchlistToggle}
            isInWatchlist={isInWatchlist(item.id)}
          />
        ))}
      </div>
    </section>
  );
}

// Content Card Component
interface ContentCardProps {
  item: any;
  index: number;
  onWatchlistToggle: (id: string, title: string) => void;
  isInWatchlist: boolean;
}

function ContentCard({
  item,
  index,
  onWatchlistToggle,
  isInWatchlist,
}: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex-shrink-0 w-64 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shows/${item.id}`}>
        <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 transform group-hover:scale-105">
          {/* Thumbnail */}
          <div className="relative aspect-video">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Hover Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Play className="w-16 h-16 text-white drop-shadow-2xl fill-white/20" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rating Badge */}
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-xs font-semibold">
                {item.userRating}
              </span>
            </div>

            {/* Type Badge */}
            {item.type === "series" && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-red-600 text-white text-xs">SERIES</Badge>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold mb-2 line-clamp-1">
              {item.title}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
              <span>{item.releaseYear}</span>
              <span>{item.duration}</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {item.genre.slice(0, 2).map((g: string) => (
                <Badge
                  key={g}
                  variant="secondary"
                  className="bg-gray-800 text-gray-300 text-xs"
                >
                  {g}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-white text-black hover:bg-gray-200"
                asChild
              >
                <Link href={`/shows/${item.id}`}>
                  <Play className="w-4 h-4 mr-1 fill-current" />
                  Play
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-700 hover:border-white"
                onClick={(e) => {
                  e.preventDefault();
                  onWatchlistToggle(item.id, item.title);
                }}
              >
                {isInWatchlist ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
