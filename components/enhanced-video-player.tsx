"use client"

import { Input } from "@/components/ui/input"

import { Separator } from "@/components/ui/separator"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { updateContinueWatching } from "@/services/user-service"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipForward,
  SkipBack,
  Settings,
  Share2,
  Download,
  BookmarkPlus,
  Bookmark,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/context/user-context"

interface EnhancedVideoPlayerProps {
  videoUrl: string
  poster?: string
  title: string
  showId?: string
}

export function EnhancedVideoPlayer({
  videoUrl,
  poster = "/placeholder.svg?height=720&width=1280",
  title,
  showId,
}: EnhancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isChaptersOpen, setIsChaptersOpen] = useState(false)
  const [selectedSubtitle, setSelectedSubtitle] = useState("off")
  const [playbackRate, setPlaybackRate] = useState(1)
  const [quality, setQuality] = useState("auto")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [hideControlsTimeout, setHideControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const playRequestRef = useRef<AbortController | null>(null)
  
  const authContext = useAuth()
  const user = authContext?.user || null
  const { profile, addToWatchlist, removeFromWatchlist } = useUser() || {
    profile: null,
    addToWatchlist: async () => {},
    removeFromWatchlist: async () => {},
  }
  const { toast } = useToast()

  const subtitles = [
    { label: "Off", value: "off" },
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
  ]

  const playbackRates = [
    { label: "0.5x", value: 0.5 },
    { label: "0.75x", value: 0.75 },
    { label: "Normal", value: 1 },
    { label: "1.25x", value: 1.25 },
    { label: "1.5x", value: 1.5 },
    { label: "2x", value: 2 },
  ]

  const qualities = [
    { label: "Auto", value: "auto" },
    { label: "1080p", value: "1080p" },
    { label: "720p", value: "720p" },
    { label: "480p", value: "480p" },
  ]

  // Check if the show is in the user's watchlist
  useEffect(() => {
    if (profile && showId) {
      setIsBookmarked(profile.watchlist?.includes(showId) || false)
    }
  }, [profile, showId])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)

      // Update continue watching in Firebase every 10 seconds
      if (user && video.currentTime % 10 < 0.5 && showId) {
        try {
          updateContinueWatching(user.uid, {
            id: showId,
            title: title,
            thumbnail: poster,
            progress: video.currentTime,
            duration: video.duration,
            timestamp: new Date().toISOString(),
          }).catch(console.error)
        } catch (error) {
          console.error("Error updating continue watching:", error)
        }
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsVideoReady(true)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      setIsVideoReady(true)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("canplay", handleCanPlay)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("canplay", handleCanPlay)
      
      // Cancel any pending play requests
      if (playRequestRef.current) {
        playRequestRef.current.abort()
        playRequestRef.current = null
      }
    }
  }, [showId, title, poster, user])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVideoReady) return

    if (isPlaying) {
      // Create a new AbortController for this play request
      playRequestRef.current = new AbortController();
      
      // Use the signal from the AbortController
      const signal = playRequestRef.current.signal;
      
      // Play the video with error handling
      video.play().catch((error) => {
        // Only log errors if they're not from an aborted request
        if (error.name !== 'AbortError') {
          console.error("Error playing video:", error)
          setIsPlaying(false)
        }
      });
      
      // Clean up function to abort the play request if component unmounts or isPlaying changes
      return () => {
        if (playRequestRef.current) {
          playRequestRef.current.abort();
          playRequestRef.current = null;
        }
      };
    } else {
      video.pause()
    }
  }, [isPlaying, isVideoReady])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = () => {
      setShowControls(true)

      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout)
      }

      const timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)

      setHideControlsTimeout(timeout)
    }

    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout)
      }
    }
  }, [isPlaying, hideControlsTimeout])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const skipForward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.min(video.currentTime + 10, video.duration)
  }

  const skipBackward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(video.currentTime - 10, 0)
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const toggleBookmark = async () => {
    if (!user || !showId || !addToWatchlist || !removeFromWatchlist) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add shows to your watchlist",
        variant: "destructive",
      })
      return
    }

    try {
      if (isBookmarked) {
        await removeFromWatchlist(showId)
        toast({
          title: "Removed from watchlist",
          description: `${title} has been removed from your watchlist`,
        })
      } else {
        await addToWatchlist(showId)
        toast({
          title: "Added to watchlist",
          description: `${title} has been added to your watchlist`,
        })
      }
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error("Error toggling watchlist:", error)
      toast({
        title: "Error",
        description: "Failed to update watchlist",
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `${title} is being prepared for download`,
    })
  }

  const handleShare = () => {
    setShowShareDialog(true)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
      onDoubleClick={toggleFullscreen}
      onClick={() => (isPlaying ? togglePlay() : null)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        poster={poster}
        onClick={(e) => {
          e.stopPropagation()
          togglePlay()
        }}
        preload="metadata"
      >
        {selectedSubtitle !== "off" && (
          <track
            kind="subtitles"
            src={`/subtitles/${selectedSubtitle}.vtt`}
            srcLang={selectedSubtitle}
            label={subtitles.find((s) => s.value === selectedSubtitle)?.label}
            default
          />
        )}
      </video>

      {/* Video Controls */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBookmark()
                    }}
                  >
                    {isBookmarked ? <Bookmark className="h-5 w-5" /> : <BookmarkPlus className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isBookmarked ? "Remove from Watchlist" : "Add to Watchlist"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                handleShare()
              }}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Center Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-opacity duration-300 ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
          >
            <Play className="h-8 w-8" />
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <div className="flex-1">
              <Slider
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer"
              />
            </div>
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlay()
                }}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  skipBackward()
                }}
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  skipForward()
                }}
              >
                <SkipForward className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMute()
                  }}
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <div className="w-24 hidden sm:block">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload()
                }}
              >
                <Download className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSettingsOpen(!isSettingsOpen)
                  setIsChaptersOpen(false)
                }}
              >
                <Settings className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFullscreen()
                }}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {isSettingsOpen && (
          <div
            className="absolute bottom-16 right-4 w-64 bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2">
              <div className="p-2">
                <h3 className="text-white font-medium mb-2">Playback Speed</h3>
                <div className="grid grid-cols-3 gap-1">
                  {playbackRates.map((rate) => (
                    <Button
                      key={rate.value}
                      variant={playbackRate === rate.value ? "default" : "outline"}
                      size="sm"
                      className={playbackRate === rate.value ? "bg-primary" : "bg-transparent"}
                      onClick={() => setPlaybackRate(rate.value)}
                    >
                      {rate.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-2" />

              <div className="p-2">
                <h3 className="text-white font-medium mb-2">Quality</h3>
                <div className="space-y-1">
                  {qualities.map((q) => (
                    <Button
                      key={q.value}
                      variant={quality === q.value ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-start ${quality === q.value ? "bg-primary" : "bg-transparent"}`}
                      onClick={() => setQuality(q.value)}
                    >
                      {q.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-2" />

              <div className="p-2">
                <h3 className="text-white font-medium mb-2">Subtitles</h3>
                <div className="space-y-1">
                  {subtitles.map((sub) => (
                    <Button
                      key={sub.value}
                      variant={selectedSubtitle === sub.value ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-start ${selectedSubtitle === sub.value ? "bg-primary" : "bg-transparent"}`}
                      onClick={() => setSelectedSubtitle(sub.value)}
                    >
                      {sub.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Dialog */}
      {showShareDialog && (
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Share "{title}"</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    value={typeof window !== "undefined" ? window.location.href : ""}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast({
                        title: "Link copied",
                        description: "Link has been copied to clipboard",
                      })
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="rounded-full p-2">
                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="rounded-full p-2">
                    <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="rounded-full p-2">
                    <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="rounded-full p-2">
                    <svg className="w-5 h-5 text-[#FF4500]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913


Now let's create a more robust version of the video player that handles the play() request errors properly:

\
