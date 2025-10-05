"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Filter,
  SearchIcon,
  X,
  Star,
  Clock,
  TrendingUp,
  Film,
  Tv,
  Grid3x3,
  List,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import netflixShows from "@/lib/netflix-content";

export default function ShowsPage() {
  const [filteredShows, setFilteredShows] = useState(netflixShows);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedType, setSelectedType] = useState("all"); // all, series, movie
  const [sortBy, setSortBy] = useState("rating"); // rating, newest, a-z
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique genres
  const allGenres = Array.from(
    new Set(netflixShows.flatMap((show) => show.genre))
  ).sort();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort shows
  useEffect(() => {
    let result = [...netflixShows];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (show) =>
          show.title.toLowerCase().includes(query) ||
          show.description.toLowerCase().includes(query) ||
          show.cast.some((actor) => actor.toLowerCase().includes(query)) ||
          show.genre.some((g) => g.toLowerCase().includes(query))
      );
    }

    // Apply type filter
    if (selectedType !== "all") {
      result = result.filter((show) => show.type === selectedType);
    }

    // Apply genre filter
    if (selectedGenre !== "all") {
      result = result.filter((show) =>
        show.genre.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.userRating - a.userRating);
        break;
      case "newest":
        result.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case "a-z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredShows(result);
  }, [searchQuery, selectedGenre, selectedType, sortBy]);

  // Stats
  const stats = {
    total: netflixShows.length,
    series: netflixShows.filter((s) => s.type === "series").length,
    movies: netflixShows.filter((s) => s.type === "movie").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Browse Content
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Discover {stats.total} shows and movies
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge className="bg-white/10 text-white border-white/20 px-4 py-2 text-sm backdrop-blur-sm">
                <Tv className="w-4 h-4 mr-2" />
                {stats.series} Series
              </Badge>
              <Badge className="bg-white/10 text-white border-white/20 px-4 py-2 text-sm backdrop-blur-sm">
                <Film className="w-4 h-4 mr-2" />
                {stats.movies} Movies
              </Badge>
              <Badge className="bg-white/10 text-white border-white/20 px-4 py-2 text-sm backdrop-blur-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Top Rated
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by title, actor, or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-red-500 h-12"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              {/* Type Filter */}
              <Tabs
                value={selectedType}
                onValueChange={setSelectedType}
                className="w-auto"
              >
                <TabsList className="bg-white/5 border border-white/10">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-red-600"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="series"
                    className="data-[state=active]:bg-red-600"
                  >
                    <Tv className="w-4 h-4 mr-2" />
                    Series
                  </TabsTrigger>
                  <TabsTrigger
                    value="movie"
                    className="data-[state=active]:bg-red-600"
                  >
                    <Film className="w-4 h-4 mr-2" />
                    Movies
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* View Mode Toggle */}
              <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-red-600" : ""}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "list" ? "default" : "ghost"}
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-red-600" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Filters Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-white/10 text-white hover:bg-white/5"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 ml-2 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 mt-4">
                  {/* Genre Filter */}
                  <Select
                    value={selectedGenre}
                    onValueChange={setSelectedGenre}
                  >
                    <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                      <SelectItem value="all">All Genres</SelectItem>
                      {allGenres.map((genre) => (
                        <SelectItem key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort By */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                      <SelectItem value="rating">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                          Top Rated
                        </div>
                      </SelectItem>
                      <SelectItem value="newest">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Newest First
                        </div>
                      </SelectItem>
                      <SelectItem value="a-z">A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Clear Filters */}
                  {(selectedGenre !== "all" ||
                    selectedType !== "all" ||
                    searchQuery) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedGenre("all");
                        setSelectedType("all");
                        setSearchQuery("");
                      }}
                      className="border-white/10 text-white hover:bg-white/5"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing{" "}
            <span className="text-white font-semibold">
              {filteredShows.length}
            </span>{" "}
            results
            {searchQuery && (
              <span>
                {" "}
                for "<span className="text-red-500">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] bg-white/5" />
            ))}
          </div>
        ) : filteredShows.length === 0 ? (
          // No Results
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("all");
                setSelectedType("all");
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          // Results
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              >
                {filteredShows.map((show, index) => (
                  <ShowCard key={show.id} show={show} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredShows.map((show, index) => (
                  <ShowListItem key={show.id} show={show} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

// Grid Card Component
function ShowCard({ show, index }: { show: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shows/${show.id}`}>
        <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 transform hover:scale-105 group">
          {/* Poster */}
          <div className="relative aspect-[2/3]">
            <Image
              src={show.poster}
              alt={show.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Play Button */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-red-600 rounded-full p-4">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Type Badge */}
            <div className="absolute top-2 left-2">
              <Badge
                className={
                  show.type === "series" ? "bg-red-600" : "bg-blue-600"
                }
              >
                {show.type === "series" ? (
                  <Tv className="w-3 h-3 mr-1" />
                ) : (
                  <Film className="w-3 h-3 mr-1" />
                )}
                {show.type === "series" ? "SERIES" : "MOVIE"}
              </Badge>
            </div>

            {/* Rating */}
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-xs font-semibold">
                {show.userRating}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold mb-2 line-clamp-1">
              {show.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span>{show.releaseYear}</span>
              <span>•</span>
              <span>{show.duration}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {show.genre.slice(0, 2).map((g: string) => (
                <Badge
                  key={g}
                  variant="secondary"
                  className="bg-gray-800 text-gray-300 text-xs"
                >
                  {g}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

// List Item Component
function ShowListItem({ show, index }: { show: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/shows/${show.id}`}>
        <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 group">
          <div className="flex gap-4 p-4">
            {/* Thumbnail */}
            <div className="relative w-32 h-48 flex-shrink-0">
              <Image
                src={show.poster}
                alt={show.title}
                fill
                className="object-cover rounded"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {show.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Badge
                      className={
                        show.type === "series" ? "bg-red-600" : "bg-blue-600"
                      }
                    >
                      {show.type === "series" ? "SERIES" : "MOVIE"}
                    </Badge>
                    <span>{show.releaseYear}</span>
                    <span>•</span>
                    <span>{show.duration}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-semibold">
                        {show.userRating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {show.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {show.genre.map((g: string) => (
                  <Badge
                    key={g}
                    variant="secondary"
                    className="bg-gray-800 text-gray-300 text-xs"
                  >
                    {g}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Cast: {show.cast.slice(0, 3).join(", ")}</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex-shrink-0">
              <Button className="bg-red-600 hover:bg-red-700">
                <Play className="w-4 h-4 mr-2 fill-white" />
                Watch Now
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
