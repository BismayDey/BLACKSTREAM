"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Heart,
  Share2,
  ThumbsUp,
  Star,
  Clock,
  Play,
  Calendar,
  Award,
  MessageSquare,
  Bookmark,
  Download,
  Info,
  TrendingUp,
  Users,
  Eye,
} from "lucide-react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { db } from "@/lib/firebase";
import ContinueWatching from "@/components/continue-watching";
import ShareDialog from "@/components/share-dialog";
import { useUser } from "@/context/user-context";
import { VideoPlayerSafe } from "@/components/video-player-safe";
import { VidkingPlayer } from "@/components/vidking-player";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import netflixShows, { type NetflixContent } from "@/lib/netflix-content";

interface Show {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  genre: string[];
  rating: number;
  duration: string;
  poster: string;
  backdrop: string;
  videoUrl: string;
  trailerUrl: string;
  cast: string[];
  director: string;
  episodes?: {
    title: string;
    duration: string;
    thumbnail: string;
    description?: string;
  }[];
  seasons?: number;
  type: "movie" | "series" | string;
  tmdbId: string;
  currentSeason?: number;
  currentEpisode?: number;
  thumbnail?: string;
  userRating?: number;
  awards?: string;
  studio?: string;
  releaseDate?: string;
  trailerDate?: string;
  videoSrc?: string;
  chapters?: { title: string; startTime: number }[];
}

// Use real Netflix content from imported data
const shows: any[] = netflixShows || [
  {
    id: "1",
    title: "Squid Game",
    tmdbId: "93405",
    genre: ["Sci-Fi", "Adventure"],
    duration: "45 min",
    releaseYear: 2021,
    releaseDate: "September 17, 2021",
    rating: 8.7,
    userRating: 8.0,
    thumbnail: "/placeholder.svg?height=720&width=1280",
    poster: "/placeholder.svg?height=900&width=600",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes. A survival game that has a whopping 45.6 billion-won prize at stake.",
    cast: [
      "Lee Jung-jae",
      "Park Hae-soo",
      "Wi Ha-joon",
      "Jung Ho-yeon",
      "O Yeong-su",
      "Heo Sung-tae",
    ],
    director: "Hwang Dong-hyuk",
    studio: "Siren Pictures",
    awards: "Best Visual Effects",
    trailerDate: "January 15, 2023",
    currentSeason: 1,
    currentEpisode: 1,
    chapters: [
      { title: "Introduction", startTime: 0 },
      { title: "Launch Sequence", startTime: 30 },
      { title: "First Contact", startTime: 60 },
      { title: "The Discovery", startTime: 120 },
      { title: "Return Journey", startTime: 180 },
    ],
    episodes: [
      {
        title: "New Horizons",
        duration: "45 min",
        description:
          "The crew of the Starship Explorer sets off on their maiden voyage to the outer reaches of our solar system.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "First Contact",
        duration: "48 min",
        description:
          "The crew encounters an alien civilization and must navigate the complexities of first contact protocols.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "The Anomaly",
        duration: "52 min",
        description:
          "A strange spatial anomaly threatens the ship and the crew must find a way to escape its gravitational pull.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
    backdrop: "/placeholder.svg?height=720&width=1280",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: "series",
  },
  {
    id: "2",
    title: "Breaking Bad",
    tmdbId: "1396",
    genre: ["Historical Drama", "Action"],
    duration: "50 min",
    releaseYear: 2008,
    releaseDate: "January 20, 2008",
    rating: 9.2,
    userRating: 9.5,
    thumbnail: "/placeholder.svg?height=720&width=1280",
    poster: "/placeholder.svg?height=900&width=600",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris"],
    director: "Vince Gilligan",
    studio: "Sony Pictures Television",
    currentSeason: 1,
    currentEpisode: 1,
    chapters: [
      { title: "Prologue", startTime: 0 },
      { title: "The Invasion", startTime: 25 },
      { title: "Viking Training", startTime: 50 },
      { title: "The Battle", startTime: 100 },
      { title: "Aftermath", startTime: 150 },
    ],
    episodes: [
      {
        title: "The Saxon Boy",
        duration: "50 min",
        description:
          "Young Uhtred witnesses the Danish invasion and the fall of his father's kingdom.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "The Pale Horseman",
        duration: "52 min",
        description:
          "Uhtred begins his training as a Viking warrior under the guidance of Earl Ragnar.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Divided Loyalties",
        duration: "49 min",
        description:
          "Uhtred must choose between his Saxon birth and his Viking upbringing as tensions rise.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
    backdrop: "/placeholder.svg?height=720&width=1280",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    type: "series",
  },
  {
    id: "3",
    title: "Inception",
    tmdbId: "27205",
    genre: ["Mystery", "Thriller", "Sci-Fi"],
    duration: "148 min",
    releaseYear: 2010,
    releaseDate: "July 16, 2010",
    rating: 8.5,
    userRating: 8.8,
    thumbnail: "/placeholder.svg?height=720&width=1280",
    poster: "/placeholder.svg?height=900&width=600",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    cast: ["Leonardo DiCaprio", "Tom Hardy", "Ellen Page", "Marion Cotillard"],
    director: "Christopher Nolan",
    studio: "Warner Bros.",
    chapters: [
      { title: "The Hook", startTime: 0 },
      { title: "Investigation Begins", startTime: 20 },
      { title: "Uncovering Clues", startTime: 40 },
      { title: "The Revelation", startTime: 60 },
    ],
    episodes: [
      {
        title: "The Hookman",
        duration: "42 min",
        description:
          "The team investigates the legend of a killer with a hook for a hand who preys on couples in parked cars.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Bloody Mary",
        duration: "45 min",
        description:
          "The origins of the mirror-summoned spirit are traced to a series of unexplained deaths in a small town during the 1800s.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "The Babysitter",
        duration: "43 min",
        description:
          "A classic tale of a babysitter receiving threatening calls is investigated, revealing a disturbing truth.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
    backdrop: "/placeholder.svg?height=720&width=1280",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: "movie",
  },
];

// Sample related shows
const relatedShows = [
  {
    id: "4",
    title: "Wilderness",
    genre: "Adventure",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    poster: "/placeholder.svg?height=900&width=600",
    userRating: 7.9,
  },
  {
    id: "5",
    title: "Tech Titans",
    genre: "Documentary",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    poster: "/placeholder.svg?height=900&width=600",
    userRating: 9.0,
  },
  {
    id: "6",
    title: "Laugh Factory",
    genre: "Comedy",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    poster: "/placeholder.svg?height=900&width=600",
    userRating: 8.5,
  },
  {
    id: "7",
    title: "The Silent Echo",
    genre: "Thriller",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    poster: "/placeholder.svg?height=900&width=600",
    userRating: 9.5,
  },
  {
    id: "8",
    title: "Eternal Horizons",
    genre: "Sci-Fi",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    poster: "/placeholder.svg?height=900&width=600",
    userRating: 9.3,
  },
];

// Sample reviews
const reviews = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
    },
    rating: 4.5,
    date: "2023-12-15",
    content:
      "This show blew me away with its stunning visuals and compelling storyline. The character development is exceptional, and the plot twists kept me on the edge of my seat.",
    likes: 24,
  },
  {
    id: 2,
    user: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg",
    },
    rating: 5,
    date: "2023-12-10",
    content:
      "Absolutely phenomenal! The acting is superb, and the cinematography is breathtaking. I couldn't stop watching and finished the entire season in one weekend.",
    likes: 18,
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg",
    },
    rating: 4,
    date: "2023-12-05",
    content:
      "A solid show with great performances. The pacing is a bit slow at times, but the payoff is worth it. Looking forward to the next season!",
    likes: 12,
  },
];

export default function ShowPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();
  const authContext = useAuth();
  const user = authContext?.user || null;
  const { profile, addToWatchlist, removeFromWatchlist } = useUser() || {
    profile: null,
    addToWatchlist: null,
    removeFromWatchlist: null,
  };

  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInWatchlistState, setIsInWatchlistState] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isWatchingTrailer, setIsWatchingTrailer] = useState(false);
  const [isWatchingFullVideo, setIsWatchingFullVideo] = useState(false);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [relatedContent, setRelatedContent] = useState<any[]>([]);

  const isInWatchlist = profile?.watchlist?.includes(id as string) || false;

  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        const foundShow = shows.find((s) => s.id === params.id);

        if (!foundShow) {
          setError("Show not found");
          return;
        }

        setShow(foundShow);

        // Find related content based on genre and type
        const related = shows
          .filter((s) => {
            // Exclude current show
            if (s.id === foundShow.id) return false;

            // Match by type (movie/series)
            const sameType = s.type === foundShow.type;

            // Match by genre (at least one common genre)
            const hasCommonGenre = s.genre?.some((g: string) =>
              foundShow.genre?.includes(g)
            );

            return sameType && hasCommonGenre;
          })
          .slice(0, 10); // Limit to 10 related items

        // If we don't have enough related items, fill with same type
        if (related.length < 10) {
          const additional = shows
            .filter(
              (s) =>
                s.id !== foundShow.id &&
                s.type === foundShow.type &&
                !related.find((r) => r.id === s.id)
            )
            .slice(0, 10 - related.length);

          setRelatedContent([...related, ...additional]);
        } else {
          setRelatedContent(related);
        }

        // Check if show is in user's watchlist/favorites
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsInWatchlistState(
              userData.watchlist?.includes(params.id) || false
            );
            setIsFavorite(userData.favorites?.includes(params.id) || false);
          }
        }
      } catch (err) {
        console.error("Error fetching show:", err);
        setError("Failed to load show details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchShow();
    }
  }, [params.id, user]);

  const handleWatchlistToggle = async () => {
    if (!user || !addToWatchlist || !removeFromWatchlist) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add shows to your watchlist",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    try {
      if (isInWatchlist) {
        await removeFromWatchlist(id as string);
        toast({
          title: "Removed from watchlist",
          description: `${show?.title} removed from watchlist`,
        });
      } else {
        await addToWatchlist(id as string);
        toast({
          title: "Added to watchlist",
          description: `${show?.title} added to watchlist`,
        });
      }
    } catch (error: any) {
      console.error("Error toggling watchlist:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update watchlist",
        variant: "destructive",
      });
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add shows to your favorites",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);

      // Optimistic UI update
      setIsFavorite(!isFavorite);

      if (isFavorite) {
        // Remove from favorites
        await updateDoc(userRef, {
          favorites: arrayRemove(id),
        });

        toast({
          title: "Removed from favorites",
          description: `${show?.title} has been removed from your favorites`,
        });
      } else {
        // Add to favorites
        await updateDoc(userRef, {
          favorites: arrayUnion(id),
        });

        toast({
          title: "Added to favorites",
          description: `${show?.title} has been added to your favorites`,
        });
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsFavorite(!isFavorite);
      console.error("Error updating favorites:", error);
      toast({
        title: "Error",
        description: "Failed to update your favorites",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  const saveToWatchHistory = async () => {
    if (!user || !show) return;

    try {
      const historyItem = {
        id: show.id,
        title: show.title,
        thumbnail: show.thumbnail,
        progress: 10, // Starting progress
        timestamp: "00:00",
        duration: show.duration,
        lastWatched: new Date().toISOString(),
      };

      // Save to Firestore
      const historyRef = doc(db, "users", user.uid, "watchHistory", show.id);
      await setDoc(historyRef, historyItem);

      // Also save to localStorage for redundancy
      const savedHistory = localStorage.getItem("watchHistory");
      let history = savedHistory ? JSON.parse(savedHistory) : [];

      // Update or add item
      const existingIndex = history.findIndex(
        (item: any) => item.id === show.id
      );
      if (existingIndex >= 0) {
        history[existingIndex] = historyItem;
      } else {
        history.unshift(historyItem);
      }

      // Limit history to 20 items
      history = history.slice(0, 20);

      // Save back to localStorage
      localStorage.setItem("watchHistory", JSON.stringify(history));
    } catch (err) {
      console.error("Error saving to watch history:", err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="animate-pulse space-y-8">
          <Skeleton className="h-[60vh] w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-muted-foreground mb-6">
          {error || "Show not found"}
        </p>
        <Button asChild>
          <Link href="/shows">Browse Shows</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      {/* Hero Section with Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden"
      >
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <Image
            src={show.backdrop || show.thumbnail || "/placeholder.svg"}
            alt={show.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                href="/shows"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Shows</span>
              </Link>

              {/* Genre Badges */}
              <div className="flex items-center gap-2 mb-4">
                {show.genre?.slice(0, 3).map((genre, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Badge className="bg-primary/90 hover:bg-primary text-white border-0 px-4 py-1.5 text-sm backdrop-blur-sm">
                      {genre}
                    </Badge>
                  </motion.div>
                ))}
                <Badge
                  variant="outline"
                  className="border-white/30 text-white backdrop-blur-sm px-3 py-1.5"
                >
                  {show.rating} ⭐
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white drop-shadow-2xl leading-tight">
                {show.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-lg">
                    {show.userRating}/10
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{show.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{show.releaseYear}</span>
                </div>
                {show.type === "series" && (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>
                      {show.seasons || 1} Season
                      {(show.seasons || 1) > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl line-clamp-3">
                {show.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg gap-3 shadow-2xl hover:shadow-primary/50 transition-all"
                  onClick={() => {
                    const playerElement =
                      document.getElementById("video-player");
                    playerElement?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Play className="w-6 h-6 fill-white" />
                  Play Now
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-6 py-6 gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
                    >
                      <Info className="w-5 h-5" />
                      More Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-xl border-white/10">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">{show.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {show.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Director
                          </p>
                          <p className="font-semibold">{show.director}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Studio
                          </p>
                          <p className="font-semibold">{show.studio}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {/* Right side - Action Buttons Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex justify-end"
            >
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 max-w-sm w-full">
                <h3 className="text-white font-semibold text-lg mb-4">
                  Quick Actions
                </h3>

                <Button
                  variant={isInWatchlist ? "default" : "outline"}
                  size="lg"
                  className={`w-full gap-3 justify-start ${
                    isInWatchlist
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-white/5 hover:bg-white/10 text-white border-white/20"
                  }`}
                  onClick={handleWatchlistToggle}
                >
                  <Bookmark
                    className={`w-5 h-5 ${isInWatchlist ? "fill-white" : ""}`}
                  />
                  <span>
                    {isInWatchlist
                      ? "Remove from Watchlist"
                      : "Add to Watchlist"}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className={`w-full gap-3 justify-start ${
                    isFavorite
                      ? "bg-red-500/90 hover:bg-red-600 text-white border-red-500"
                      : "bg-white/5 hover:bg-white/10 text-white border-white/20"
                  }`}
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`}
                  />
                  <span>
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-3 justify-start bg-white/5 hover:bg-white/10 text-white border-white/20"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-3 justify-start bg-white/5 hover:bg-white/10 text-white border-white/20"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: show.title,
                        text: show.description,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </Button>

                {/* Quick Stats */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-semibold">
                        {show.userRating}/10
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Views</span>
                    <span className="text-white font-semibold">
                      {Math.floor(Math.random() * 50 + 10)}M+
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Release</span>
                    <span className="text-white font-semibold">
                      {show.releaseYear}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Quick Actions - Bottom of Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:hidden absolute bottom-6 left-4 right-4"
          >
            <div className="flex gap-2 justify-center">
              <Button
                variant={isInWatchlist ? "default" : "outline"}
                size="sm"
                className={`gap-2 ${
                  isInWatchlist
                    ? "bg-white/20 hover:bg-white/30 text-white border-white/30"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/30"
                } backdrop-blur-sm`}
                onClick={handleWatchlistToggle}
              >
                <Bookmark
                  className={`w-4 h-4 ${isInWatchlist ? "fill-white" : ""}`}
                />
                <span className="hidden sm:inline">Watchlist</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 backdrop-blur-sm ${
                  isFavorite
                    ? "bg-red-500/90 hover:bg-red-600 text-white border-red-500"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/30"
                }`}
                onClick={toggleFavorite}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`}
                />
                <span className="hidden sm:inline">Favorite</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Player Section */}
      <div
        id="video-player"
        className="container mx-auto px-4 -mt-16 relative z-10 mb-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          {show.tmdbId ? (
            <VidkingPlayer
              tmdbId={show.tmdbId}
              type={show.type === "series" ? "tv" : "movie"}
              season={currentSeason}
              episode={currentEpisode}
              title={show.title}
              color="e50914"
              autoPlay={false}
              nextEpisode={show.type === "series"}
              episodeSelector={show.type === "series"}
              onProgressUpdate={(progress, timestamp) => {
                console.log(`Progress: ${progress}%, Timestamp: ${timestamp}s`);
              }}
            />
          ) : (
            <VideoPlayerSafe
              videoUrl={show.videoUrl}
              poster={show.poster}
              title={show.title}
              showId={show.id}
            />
          )}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{show.userRating}</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Eye className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.floor(Math.random() * 50 + 10)}M
                </p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reviews.length}K</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Award className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{show.awards ? "5+" : "2"}</p>
                <p className="text-xs text-muted-foreground">Awards</p>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Show Info */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 bg-muted/50 backdrop-blur-sm p-1.5 rounded-xl border border-white/10">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-6 py-2.5 transition-all"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="episodes"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-6 py-2.5 transition-all"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Episodes
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-6 py-2.5 transition-all"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="related"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-6 py-2.5 transition-all"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Related
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-muted/30 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                    >
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-primary" />
                        Synopsis
                      </h3>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {show.description}
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Cast */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-muted/30 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                      >
                        <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          Cast
                        </h3>
                        <div className="space-y-3">
                          {show.cast?.map((actor: string, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                                  {actor.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{actor}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Details */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="bg-muted/30 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                      >
                        <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          Details
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-muted-foreground font-medium">
                              Director
                            </span>
                            <span className="font-semibold">
                              {show.director}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-muted-foreground font-medium">
                              Studio
                            </span>
                            <span className="font-semibold">
                              {show.studio || "Unknown"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-muted-foreground font-medium">
                              Release
                            </span>
                            <span className="font-semibold">
                              {show.releaseDate || show.releaseYear}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-muted-foreground font-medium">
                              Audio
                            </span>
                            <span className="font-semibold">5.1 Surround</span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-muted-foreground font-medium">
                              Subtitles
                            </span>
                            <span className="font-semibold">
                              Multi-language
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Trailer Card */}
                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="sticky top-24"
                    >
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-muted/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
                        <div className="relative aspect-video">
                          <Image
                            src={show.thumbnail || "/placeholder.svg"}
                            alt={show.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute inset-0 w-full h-full rounded-none bg-black/20 hover:bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all"
                              >
                                <div className="relative">
                                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                                  <Play className="w-20 h-20 text-white relative group-hover:scale-110 transition-transform fill-white" />
                                </div>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl p-0 bg-black border-none">
                              <VideoPlayerSafe
                                videoUrl={show.trailerUrl}
                                title={`${show.title} - Trailer`}
                              />
                            </DialogContent>
                          </Dialog>
                          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white">
                            HD
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Play className="w-5 h-5 text-primary" />
                            Official Trailer
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Watch the official trailer for {show.title}.
                            Released on {show.trailerDate || "2023-01-15"}.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Download Trailer
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="episodes" className="mt-0">
                {show.episodes ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">
                        Season {currentSeason}
                      </h2>
                      <Badge variant="outline" className="px-4 py-1.5">
                        {show.episodes.length} Episodes
                      </Badge>
                    </div>
                    {show.episodes.map((episode: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-white/10 bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                      >
                        <div className="relative w-full sm:w-64 aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={
                              episode.thumbnail ||
                              "/placeholder.svg?height=720&width=1280"
                            }
                            alt={episode.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="bg-primary/90 hover:bg-primary rounded-full w-14 h-14"
                              onClick={() => setCurrentEpisode(index + 1)}
                            >
                              <Play className="w-6 h-6 text-white fill-white" />
                            </Button>
                          </div>
                          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold">
                            EP {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                  {episode.title}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {episode.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3.5 h-3.5" />
                                    {Math.floor(Math.random() * 5 + 1)}M views
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-primary/20"
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {episode.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                      <Play className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      No Episodes Available
                    </h3>
                    <p className="text-muted-foreground">
                      Episodes for this content will be added soon.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      {reviews.map((review, index) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 rounded-lg border border-white/10 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={review.user.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                  {review.user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {review.user.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center bg-muted px-2 py-1 rounded-md">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span className="text-sm font-medium">
                                {review.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm mb-3">{review.content}</p>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2 text-xs"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              Helpful ({review.likes})
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2 text-xs"
                            >
                              <MessageSquare className="w-3 h-3" />
                              Reply
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="rounded-lg border border-white/10 p-4 sticky top-20 bg-muted/30">
                      <h3 className="font-semibold mb-4">Audience Score</h3>
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e2e8f0"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#ff0080"
                              strokeWidth="3"
                              strokeDasharray={`${
                                (show.userRating || 0) * 10
                              }, 100`}
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold">
                              {show.userRating || 0}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              out of 10
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="text-sm w-16 text-right">5 stars</div>
                          <div className="h-2 bg-muted rounded-full flex-1">
                            <div
                              className="h-2 bg-primary rounded-full"
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                          <div className="text-sm w-8">70%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm w-16 text-right">4 stars</div>
                          <div className="h-2 bg-muted rounded-full flex-1">
                            <div
                              className="h-2 bg-primary rounded-full"
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <div className="text-sm w-8">20%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm w-16 text-right">3 stars</div>
                          <div className="h-2 bg-muted rounded-full flex-1">
                            <div
                              className="h-2 bg-primary rounded-full"
                              style={{ width: "5%" }}
                            ></div>
                          </div>
                          <div className="text-sm w-8">5%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm w-16 text-right">2 stars</div>
                          <div className="h-2 bg-muted rounded-full flex-1">
                            <div
                              className="h-2 bg-primary rounded-full"
                              style={{ width: "3%" }}
                            ></div>
                          </div>
                          <div className="text-sm w-8">3%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm w-16 text-right">1 star</div>
                          <div className="h-2 bg-muted rounded-full flex-1">
                            <div
                              className="h-2 bg-primary rounded-full"
                              style={{ width: "2%" }}
                            ></div>
                          </div>
                          <div className="text-sm w-8">2%</div>
                        </div>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Write a Review
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="related" className="mt-0">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">
                        More Like This
                      </h2>
                      <p className="text-muted-foreground">
                        {show.type === "series" ? "Series" : "Movies"} similar
                        to {show.title}
                      </p>
                    </div>
                    <Badge variant="outline" className="px-4 py-2">
                      {relatedContent.length}{" "}
                      {show.type === "series" ? "Series" : "Movies"}
                    </Badge>
                  </div>

                  {/* Genre Filter Info */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-muted-foreground">
                      Based on:
                    </span>
                    {show.genre?.slice(0, 3).map((genre, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                {relatedContent.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {relatedContent.map((relatedShow, index) => (
                      <motion.div
                        key={relatedShow.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ y: -8 }}
                        className="group"
                      >
                        <Link
                          href={`/shows/${relatedShow.id}`}
                          className="block"
                        >
                          <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-white/10 group-hover:border-primary/50 transition-all duration-300">
                            <Image
                              src={
                                relatedShow.poster ||
                                relatedShow.thumbnail ||
                                "/placeholder.svg"
                              }
                              alt={relatedShow.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="rounded-full bg-primary hover:bg-primary/90 w-14 h-14 relative"
                                >
                                  <Play className="w-6 h-6 text-white fill-white" />
                                </Button>
                              </div>
                            </div>
                            {relatedShow.userRating && (
                              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                {relatedShow.userRating}
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Badge className="bg-primary/90 backdrop-blur-sm text-xs">
                                {relatedShow.genre}
                              </Badge>
                            </div>
                          </div>
                          <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                            {relatedShow.title}
                          </h3>
                          <p className="text-muted-foreground text-xs mt-1">
                            {relatedShow.genre}
                          </p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      No Related Content
                    </h3>
                    <p className="text-muted-foreground">
                      We couldn't find similar content at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>{" "}
        {/* Continue Watching Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h2 className="text-3xl font-bold">Continue Watching</h2>
          </div>
          <ContinueWatching />
        </motion.div>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md border-white/10 bg-background/95 backdrop-blur-xl">
          <ShareDialog
            title={show.title}
            id={show.id}
            onClose={() => setShowShareDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 p-4 bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 rotate-90 group-hover:-translate-y-1 transition-transform" />
      </motion.button>
    </div>
  );
}
