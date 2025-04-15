export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  watchlist: string[]
  continueWatching: ContinueWatchingItem[]
  preferences: UserPreferences
  createdAt: string
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  subtitles: string
  quality: "auto" | "1080p" | "720p" | "480p"
}

export interface ContinueWatchingItem {
  id: string
  title: string
  thumbnail: string
  progress: number
  duration: number
  timestamp: string
}

export interface Show {
  id: string
  title: string
  description: string
  thumbnail: string
  banner: string
  videoUrl: string
  trailerUrl?: string
  duration: number
  releaseYear: number
  categories: string[]
  cast: string[]
  director: string
  rating: number
  views: number
  isFeatured?: boolean
  isTrending?: boolean
  chapters?: Chapter[]
}

export interface Chapter {
  title: string
  startTime: number
}

export interface Category {
  id: string
  name: string
  description?: string
  thumbnail?: string
}
