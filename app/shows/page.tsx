"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Filter, SearchIcon, X } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import netflixShows from "@/lib/netflix-content";

// Use real Netflix content
const shows = netflixShows.map((show) => ({
  ...show,
  genre: show.genre[0], // Use first genre for compatibility
  rating: `${show.rating}/10`,
  releaseYear: show.releaseYear.toString(),
}));

export default function ShowsPage() {
  const [filteredShows, setFilteredShows] = useState(shows);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showsPerPage] = useState(8);
  const [yearFilter, setYearFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort shows
  useEffect(() => {
    let result = [...shows];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (show) =>
          show.title.toLowerCase().includes(query) ||
          show.genre.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (category !== "all") {
      result = result.filter(
        (show) => show.genre.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply year filter
    if (yearFilter !== "all") {
      result = result.filter((show) => show.releaseYear === yearFilter);
    }

    // Apply rating filter
    if (ratingFilter !== "all") {
      result = result.filter((show) => show.rating === ratingFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        result.sort(
          (a, b) =>
            Number.parseInt(a.releaseYear) - Number.parseInt(b.releaseYear)
        );
        break;
      case "a-z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            Number.parseInt(b.releaseYear) - Number.parseInt(a.releaseYear)
        );
    }

    setFilteredShows(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, category, sortBy, yearFilter, ratingFilter]);

  // Get current shows for pagination
  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = filteredShows.slice(indexOfFirstShow, indexOfLastShow);
  const totalPages = Math.ceil(filteredShows.length / showsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setSortBy("newest");
    setYearFilter("all");
    setRatingFilter("all");
  };

  // Get unique years and ratings for filters
  const years = [...new Set(shows.map((show) => show.releaseYear))].sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a)
  );
  const ratings = [...new Set(shows.map((show) => show.rating))];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0 gradient-text">
          Explore Shows
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search input */}
          <div className="relative flex-1 sm:max-w-xs">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search shows..."
              className="pl-9 bg-muted/30 border-white/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Mobile filter button */}
          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your show results</SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="comedy">Comedy</SelectItem>
                        <SelectItem value="drama">Drama</SelectItem>
                        <SelectItem value="documentary">Documentary</SelectItem>
                        <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                        <SelectItem value="mystery">Mystery</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="crime">Crime</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <Select
                      value={ratingFilter}
                      onValueChange={setRatingFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        {ratings.map((rating) => (
                          <SelectItem key={rating} value={rating}>
                            {rating}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort by</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="a-z">A-Z</SelectItem>
                        <SelectItem value="z-a">Z-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full mt-4" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Category select (desktop) */}
          <div className="hidden sm:block space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="documentary">Documentary</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                <SelectItem value="mystery">Mystery</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="crime">Crime</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Year select (desktop) */}
          <div className="hidden sm:block space-y-2">
            <label className="text-sm font-medium">Year</label>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating select (desktop) */}
          <div className="hidden sm:block space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating}>
                    {rating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort by select (desktop) */}
          <div className="hidden sm:block space-y-2">
            <label className="text-sm font-medium">Sort by</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear filters button (desktop) */}
          <div className="hidden sm:block">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-[200px] w-full rounded-md" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {currentShows.map((show) => (
                <motion.div
                  key={show.id}
                  className="relative group overflow-hidden rounded-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/shows/${show.id}`}>
                    <Image
                      src={show.thumbnail || "/placeholder.svg"}
                      alt={show.title}
                      width={1280}
                      height={720}
                      className="aspect-video w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-semibold text-white">
                        {show.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">{show.genre}</Badge>
                        <Badge variant="secondary">{show.rating}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="link"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white hover:text-primary"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={
                        currentPage === pageNumber ? "default" : "outline"
                      }
                      onClick={() => paginate(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  )
                )}
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
