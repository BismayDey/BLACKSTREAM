"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VideoPlayerProps {
  videoUrl: string
  poster?: string
  title?: string
  showId?: string
}

export function VideoPlayerSafe({ videoUrl, poster, title = "Video", showId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

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
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setError("Failed to load video. Please try again later.")
      setIsLoading(false)
    }

    const handleLoadedData = () => {
      setIsLoading(false)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("error", handleError)
    }
  }, [])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle controls visibility
  useEffect(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying, showControls])

  // Safe play function with error handling
  const safePlay = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      await video.play()
      setIsPlaying(true)
    } catch (err) {
      console.error("Error playing video:", err)
      // Only show toast for errors other than AbortError
      if (err instanceof Error && err.name !== "AbortError") {
        toast({
          title: "Playback error",
          description: "There was an error playing this video. Please try again.",
          variant: "destructive",
        })
      }
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      safePlay()
    }
    setShowControls(true)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return

    video.volume = value
    setVolume(value)
    setIsMuted(value === 0)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return

    video.currentTime = value
    setCurrentTime(value)
  }

  const toggleFullscreen = () => {
    const player = playerRef.current
    if (!player) return

    if (!isFullscreen) {
      if (player.requestFullscreen) {
        player.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen:", err)
        })
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error("Error attempting to exit fullscreen:", err)
        })
      }
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div
      ref={playerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
          <div className="bg-card p-4 rounded-lg max-w-md text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              className="px-4 py-2 bg-primary text-white rounded-md"
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
            </button>
          </div>
        </div>
      )}

      <video ref={videoRef} className="w-full h-full" poster={poster} preload="metadata" playsInline>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Controls */}
      <div
        className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/70 via-transparent to-black/30 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          // Prevent clicks on controls from triggering play/pause
          e.stopPropagation()
        }}
      >
        {/* Top controls */}
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium truncate">{title}</h3>
        </div>

        {/* Center play button */}
        <div className="absolute inset-0 flex items-center justify-center" onClick={togglePlay}>
          {!isPlaying && !isLoading && !error && (
            <button className="bg-white/20 backdrop-blur-sm text-white p-6 rounded-full hover:bg-white/30 transition-all transform hover:scale-110">
              <Play size={32} fill="white" />
            </button>
          )}
        </div>

        {/* Bottom controls */}
        <div className="space-y-2">
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-grow h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>

          {/* Control buttons */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="text-white p-1 rounded hover:bg-white/20">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button onClick={toggleMute} className="text-white">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>

            <button onClick={toggleFullscreen} className="text-white p-1 rounded hover:bg-white/20">
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
