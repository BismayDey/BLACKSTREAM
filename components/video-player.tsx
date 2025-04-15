"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  PictureInPicture,
  Subtitles,
  Share2,
  Bookmark,
  Heart,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface VideoSource {
  src: string
  type: string
  quality?: string
}

interface VideoSubtitle {
  src: string
  label: string
  language: string
}

interface VideoChapter {
  title: string
  startTime: number
}

interface VideoPlayerProps {
  sources: VideoSource[]
  poster?: string
  title?: string
  subtitles?: VideoSubtitle[]
  chapters?: VideoChapter[]
  onPlay?: () => void
}

export default function VideoPlayer({
  sources,
  poster = "/placeholder.svg?height=720&width=1280",
  title = "Video",
  subtitles = [],
  chapters = [],
  onPlay,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [previousVolume, setPreviousVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSubtitles, setShowSubtitles] = useState(false)
  const [currentSubtitle, setCurrentSubtitle] = useState(subtitles[0]?.language || "")
  const [thumbnailPosition, setThumbnailPosition] = useState({ x: 0, time: 0, show: false })
  const [videoQuality, setVideoQuality] = useState("auto")
  const [currentSource, setCurrentSource] = useState(sources[0])
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showChapters, setShowChapters] = useState(false)
  const [currentChapter, setCurrentChapter] = useState<VideoChapter | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Available playback speeds
  const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]

  // Update current chapter based on time
  useEffect(() => {
    if (chapters.length === 0) return

    const currentChap = chapters
      .slice()
      .reverse()
      .find((chapter) => currentTime >= chapter.startTime)

    if (currentChap) {
      setCurrentChapter(currentChap)
    } else {
      setCurrentChapter(chapters[0])
    }
  }, [currentTime, chapters])

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)

      if (isPlaying) {
        timeout = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", () => setShowControls(false))
      container.addEventListener("mouseenter", () => setShowControls(true))
    }

    return () => {
      clearTimeout(timeout)
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", () => setShowControls(false))
        container.removeEventListener("mouseenter", () => setShowControls(true))
      }
    }
  }, [isPlaying])

  // Handle video events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleWaiting = () => {
      setIsBuffering(true)
    }

    const handlePlaying = () => {
      setIsBuffering(false)
    }

    const handleError = () => {
      setError("Failed to load video. Please try again later.")
      setIsLoading(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (video) {
        video.currentTime = 0
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("playing", handlePlaying)
    video.addEventListener("error", handleError)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("playing", handlePlaying)
      video.removeEventListener("error", handleError)
      video.removeEventListener("ended", handleEnded)
    }
  }, [onPlay])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events if the video player is in focus
      if (!containerRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault()
          togglePlay()
          break
        case "arrowleft":
          e.preventDefault()
          skip(-10)
          break
        case "arrowright":
          e.preventDefault()
          skip(10)
          break
        case "m":
          e.preventDefault()
          toggleMute()
          break
        case "f":
          e.preventDefault()
          toggleFullscreen()
          break
        case "arrowup":
          e.preventDefault()
          changeVolume(Math.min(volume + 0.1, 1))
          break
        case "arrowdown":
          e.preventDefault()
          changeVolume(Math.max(volume - 0.1, 0))
          break
        case "c":
          e.preventDefault()
          toggleSubtitles()
          break
        case "p":
          e.preventDefault()
          togglePictureInPicture()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [volume, showSubtitles])

  // Handle progress bar hover for thumbnail preview
  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current
    if (!progressBar || !duration) return

    const rect = progressBar.getBoundingClientRect()
    const position = (e.clientX - rect.left) / rect.width
    const time = position * duration

    setThumbnailPosition({
      x: Math.max(0, Math.min(e.clientX - rect.left, rect.width)),
      time,
      show: true,
    })
  }

  // Play/Pause
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((err) => {
        setError("Failed to play video. Please try again.")
        console.error("Error playing video:", err)
      })
    }
  }

  // Seek
  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  // Volume
  const changeVolume = (newVolume: number) => {
    const video = videoRef.current
    if (!video) return

    setVolume(newVolume)
    video.volume = newVolume
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = previousVolume
      setVolume(previousVolume)
      setIsMuted(false)
    } else {
      setPreviousVolume(volume)
      video.volume = 0
      setVolume(0)
      setIsMuted(true)
    }
  }

  // Fullscreen
  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      } else if ((container as any).webkitRequestFullscreen) {
        ;(container as any).webkitRequestFullscreen()
      } else if ((container as any).msRequestFullscreen) {
        ;(container as any).msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        ;(document as any).webkitExitFullscreen()
      } else if ((document as any).msExitFullscreen) {
        ;(container as any).msExitFullscreen()
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!document.fullscreenElement ||
          !!(document as any).webkitFullscreenElement ||
          !!(document as any).msFullscreenElement,
      )
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Skip forward/backward
  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), duration)
  }

  // Change playback speed
  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = speed
    setPlaybackSpeed(speed)
  }

  // Toggle picture-in-picture
  const togglePictureInPicture = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await video.requestPictureInPicture()
      }
    } catch (error) {
      console.error("Picture-in-Picture failed:", error)
      toast({
        title: "Feature not supported",
        description: "Picture-in-Picture is not supported in your browser.",
        variant: "destructive",
      })
    }
  }

  // Toggle subtitles
  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles)
  }

  // Change subtitle
  const changeSubtitle = (language: string) => {
    setCurrentSubtitle(language)
    setShowSubtitles(true)
  }

  // Change video quality
  const changeQuality = (quality: string) => {
    const video = videoRef.current
    if (!video) return

    // Remember current time and playing state
    const currentTime = video.currentTime
    const wasPlaying = !video.paused

    // Find the source with the selected quality
    let newSource
    if (quality === "auto") {
      newSource = sources[0] // Typically the highest quality
    } else {
      newSource = sources.find((source) => source.quality === quality)
    }

    if (newSource && newSource !== currentSource) {
      setCurrentSource(newSource)
      setVideoQuality(quality)

      // After source change, restore time and play state
      video.addEventListener(
        "loadedmetadata",
        function onceLoaded() {
          video.currentTime = currentTime
          if (wasPlaying) {
            video.play().catch((err) => console.error("Error resuming playback:", err))
          }
          video.removeEventListener("loadedmetadata", onceLoaded)
        },
        { once: true },
      )
    }
  }

  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Removed from watchlist" : "Added to watchlist",
      description: `${title} has been ${isBookmarked ? "removed from" : "added to"} your watchlist`,
    })
  }

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${title} has been ${isFavorite ? "removed from" : "added to"} your favorites`,
    })
  }

  // Format time
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    const formattedHours = hours > 0 ? `${hours}:` : ""
    const formattedMinutes = `${String(minutes).padStart(2, "0")}:`
    const formattedSeconds = String(seconds).padStart(2, "0")

    return `${formattedHours}${formattedMinutes}${formattedSeconds}`
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
      onClick={togglePlay}
      tabIndex={0}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        onClick={(e) => e.stopPropagation()}
        playsInline
        controls={false}
        src={currentSource.src}
      >
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        {subtitles.map((subtitle, index) => (
          <track
            key={index}
            src={subtitle.src}
            label={subtitle.label}
            srcLang={subtitle.language}
            kind="subtitles"
            default={subtitle.language === currentSubtitle && showSubtitles}
          />
        ))}
        Your browser does not support the video tag.
      </video>

      {/* Loading Indicator */}
      <AnimatePresence>
        {isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/70"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
              <p className="text-white">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buffering Indicator */}
      <AnimatePresence>
        {isBuffering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <div className="w-16 h-16 rounded-full border-4 border-primary/50 border-t-primary animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/70"
          >
            <div className="bg-background/90 p-6 rounded-lg max-w-md text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button
                onClick={() => {
                  setError(null)
                  setIsLoading(true)
                  const video = videoRef.current
                  if (video) {
                    video.load()
                  }
                }}
              >
                Try Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big Play Button (when paused) */}
      <AnimatePresence>
        {!isPlaying && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-20 h-20 rounded-full bg-primary/30 hover:bg-primary/50 text-white"
              onClick={togglePlay}
            >
              <Play className="w-12 h-12 fill-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Time Preview */}
      <AnimatePresence>
        {thumbnailPosition.show && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-14 bg-black/80 text-white px-2 py-1 rounded text-xs"
            style={{ left: `${thumbnailPosition.x}px`, transform: "translateX(-50%)" }}
          >
            {formatTime(thumbnailPosition.time)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title and Chapter */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-white font-medium">{title}</h3>
            {currentChapter && <p className="text-white/70 text-sm">Chapter: {currentChapter.title}</p>}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={toggleBookmark}>
              <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={toggleFavorite}>
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => {
                toast({
                  title: "Share",
                  description: "Share functionality would open here",
                })
              }}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="w-full mb-1"
          ref={progressBarRef}
          onMouseMove={handleProgressHover}
          onMouseLeave={() => {
            setThumbnailPosition((prev) => ({ ...prev, show: false }))
          }}
        >
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-primary"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2 text-white">
          <Button variant="ghost" size="icon" onClick={togglePlay} className="hover:bg-white/10">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={() => skip(-10)} className="hover:bg-white/10">
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => skip(10)} className="hover:bg-white/10">
            <SkipForward className="w-5 h-5" />
          </Button>

          <div
            className="relative flex items-center gap-2"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <Button variant="ghost" size="icon" onClick={toggleMute} className="hover:bg-white/10">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <AnimatePresence>
              {showVolumeSlider && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <Slider
                    value={[volume]}
                    onValueChange={(value) => changeVolume(value[0])}
                    min={0}
                    max={1}
                    step={0.01}
                    className="w-24"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={togglePictureInPicture} className="hover:bg-white/10">
              <PictureInPicture className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/10">
                  <Settings className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-black/90 border-white/10">
                <DropdownMenuLabel>Playback speed</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {playbackSpeeds.map((speed) => (
                  <DropdownMenuItem
                    key={speed}
                    onClick={() => changePlaybackSpeed(speed)}
                    className={playbackSpeed === speed ? "bg-primary/20" : ""}
                  >
                    {speed === 1 ? "Normal" : `${speed}x`}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Quality</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => changeQuality("auto")}
                  className={videoQuality === "auto" ? "bg-primary/20" : ""}
                >
                  Auto
                </DropdownMenuItem>
                {sources
                  .filter((source) => source.quality)
                  .map((source) => (
                    <DropdownMenuItem
                      key={source.quality}
                      onClick={() => changeQuality(source.quality || "auto")}
                      className={videoQuality === source.quality ? "bg-primary/20" : ""}
                    >
                      {source.quality}
                    </DropdownMenuItem>
                  ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Subtitles</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleSubtitles}>
                  <Subtitles className="mr-2 h-4 w-4" />
                  <span>{showSubtitles ? "Hide Subtitles" : "Show Subtitles"}</span>
                </DropdownMenuItem>
                {subtitles.map((subtitle) => (
                  <DropdownMenuItem
                    key={subtitle.language}
                    onClick={() => changeSubtitle(subtitle.language)}
                    className={currentSubtitle === subtitle.language && showSubtitles ? "bg-primary/20" : ""}
                  >
                    {subtitle.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="hover:bg-white/10">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
