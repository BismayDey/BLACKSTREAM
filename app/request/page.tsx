"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Film, Tv, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export default function RequestPage() {
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [contentType, setContentType] = useState("movie")
  
  const auth = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  if (auth && !auth.loading && !auth.user) {
    router.push("/login")
    return null
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setResult("Sending your request...")

    const formData = new FormData(event.target as HTMLFormElement)
    formData.append("access_key", "385c478c-1c1d-4c8b-95de-0ac54ea72bc3")
    
    // Add user email if available
    if (auth?.user?.email) {
      formData.append("User Email", auth.user.email)
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setResult("success")
        ;(event.target as HTMLFormElement).reset()
        setContentType("movie")
        
        // Reset after 5 seconds
        setTimeout(() => {
          setResult("")
        }, 5000)
      } else {
        setResult("error")
        console.error("Form submission error:", data)
      }
    } catch (error) {
      console.error("Network error:", error)
      setResult("error")
    } finally {
      setIsLoading(false)
    }
  }

  if (auth?.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Request Content</h1>
            <p className="text-muted-foreground text-lg">
              Can't find what you're looking for? Let us know and we'll try to add it!
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-lg p-6 sm:p-8">
            {result === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3"
              >
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Request Submitted!</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Thank you for your request. We'll review it and try to add the content soon.
                  </p>
                </div>
              </motion.div>
            )}

            {result === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 dark:text-red-300">Submission Failed</h3>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                    There was an error submitting your request. Please try again.
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="contentType">Content Type</Label>
                <RadioGroup
                  value={contentType}
                  onValueChange={setContentType}
                  className="flex gap-4"
                  name="Content Type"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="movie" id="movie" />
                    <Label htmlFor="movie" className="flex items-center gap-2 cursor-pointer font-normal">
                      <Film className="h-4 w-4" />
                      Movie
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="series" id="series" />
                    <Label htmlFor="series" className="flex items-center gap-2 cursor-pointer font-normal">
                      <Tv className="h-4 w-4" />
                      TV Series
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">
                  {contentType === "movie" ? "Movie" : "Series"} Title *
                </Label>
                <Input
                  id="title"
                  name="Title"
                  type="text"
                  placeholder={`e.g., ${contentType === "movie" ? "Inception" : "Breaking Bad"}`}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Release Year (Optional)</Label>
                <Input
                  id="year"
                  name="Release Year"
                  type="text"
                  placeholder="e.g., 2010"
                  disabled={isLoading}
                />
              </div>

              {contentType === "series" && (
                <div className="space-y-2">
                  <Label htmlFor="season">Specific Season/Episode (Optional)</Label>
                  <Input
                    id="season"
                    name="Season/Episode"
                    type="text"
                    placeholder="e.g., Season 2, Episode 5"
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="details">Additional Details (Optional)</Label>
                <Textarea
                  id="details"
                  name="Additional Details"
                  placeholder="Any additional information that might help us find the right content..."
                  rows={4}
                  disabled={isLoading}
                  className="resize-none"
                />
              </div>

              <input type="hidden" name="from_name" value="BLACKSTREAM Request Form" />
              <input type="hidden" name="subject" value={`New Content Request: ${contentType === "movie" ? "Movie" : "TV Series"}`} />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Request
                  </>
                )}
              </Button>

              {result && result !== "success" && result !== "error" && (
                <p className="text-center text-sm text-muted-foreground">{result}</p>
              )}
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Please note: We can't guarantee all requests will be fulfilled, but we'll do our best to add
              popular and available content.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
