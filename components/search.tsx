"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const searchContainerRef = useRef(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim().length >= 2) {
        searchShows()
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query])

  const searchShows = async () => {
    if (query.trim().length < 2) return

    setLoading(true)
    try {
      const response = await fetch(`/api/shows?search=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("Failed to fetch shows")

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: "Search failed",
        description: "Unable to search shows at this time",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleShowClick = (id) => {
    router.push(`/shows/${id}`)
    setIsOpen(false)
    setQuery("")
  }

  const toggleSearch = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setQuery("")
      setResults([])
    }
  }

  return (
    <div ref={searchContainerRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSearch}
        className="text-foreground hover:text-primary transition-colors"
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-screen max-w-md z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          <Card className="border border-primary/20 bg-card/80 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search shows..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 bg-background/50 border-primary/20 focus-visible:ring-primary"
                  />
                  {query && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setQuery("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Button variant="ghost" onClick={toggleSearch}>
                  Cancel
                </Button>
              </div>

              {loading && (
                <div className="py-8 text-center">
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                  {results.map((show) => (
                    <div
                      key={show.id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer transition-colors"
                      onClick={() => handleShowClick(show.id)}
                    >
                      <div className="relative h-16 w-28 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={show.thumbnail || "/placeholder.svg?height=64&width=112"}
                          alt={show.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{show.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">{show.genre}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && query.length >= 2 && results.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  <p>No results found for "{query}"</p>
                </div>
              )}

              {!loading && query.length < 2 && (
                <div className="py-8 text-center text-muted-foreground">
                  <p>Type at least 2 characters to search</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
