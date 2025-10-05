"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <div className="pt-16">
      {/* Video Player */}
      <div className="mb-8">
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
      </div>

      <div className="container mx-auto px-4 pb-12">
        <Link
          href="/shows"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 hover-underline"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Shows
        </Link>

        {/* Show Info */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {show.genre?.map((genre, index) => (
                    <Badge
                      key={index}
                      className="bg-primary/80 hover:bg-primary text-white"
                    >
                      {genre}
                    </Badge>
                  ))}
                  <Badge variant="outline">{show.rating}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                  {show.title}
                </h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{show.userRating}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{show.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{show.releaseYear}</span>
                  </div>
                  {show.awards && (
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>{show.awards}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isInWatchlist ? "default" : "outline"}
                  size="sm"
                  className={`gap-2 ${
                    isInWatchlist ? "bg-primary hover:bg-primary/90" : ""
                  }`}
                  onClick={handleWatchlistToggle}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isInWatchlist ? "fill-white" : ""}`}
                  />
                  {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 ${
                    isFavorite
                      ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                      : ""
                  }`}
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`}
                  />
                  {isFavorite ? "Favorited" : "Favorite"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6 bg-muted/30">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="episodes">Episodes</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <p className="text-lg mb-8 leading-relaxed">
                      {show.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Cast</h3>
                        <div className="space-y-3">
                          {show.cast?.map((actor: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-3"
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>
                                  {actor.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{actor}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Director
                            </span>
                            <span>{show.director}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Studio
                            </span>
                            <span>{show.studio || "Unknown"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Release Date
                            </span>
                            <span>{show.releaseDate || show.releaseYear}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Audio</span>
                            <span>5.1 Surround Sound</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Subtitles
                            </span>
                            <span>English, Spanish, French</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="rounded-lg overflow-hidden border border-white/10 bg-muted/30 card-hover">
                      <div className="relative aspect-video">
                        <Image
                          src={show.thumbnail || "/placeholder.svg"}
                          alt={show.title}
                          fill
                          className="object-cover"
                        />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute inset-0 w-full h-full rounded-none bg-black/40 hover:bg-black/60 flex items-center justify-center"
                            >
                              <Play className="w-16 h-16 text-white" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl p-0 bg-black border-none">
                            <VideoPlayerSafe
                              videoUrl={show.trailerUrl}
                              title={`${show.title} - Trailer`}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Official Trailer</h3>
                        <p className="text-sm text-muted-foreground">
                          Watch the official trailer for {show.title}. Released
                          on {show.trailerDate || "2023-01-15"}.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="episodes" className="mt-0">
                {show.episodes ? (
                  <div className="space-y-6">
                    {show.episodes.map((episode: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-white/10 hover:bg-muted/50 transition-colors card-hover"
                      >
                        <div className="relative w-full sm:w-48 aspect-video rounded-md overflow-hidden">
                          <Image
                            src={
                              episode.thumbnail ||
                              "/placeholder.svg?height=720&width=1280"
                            }
                            alt={episode.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="bg-black/50 hover:bg-black/70"
                            >
                              <Play className="w-8 h-8 text-white" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{`Episode ${
                                index + 1
                              }: ${episode.title}`}</h3>
                              <span className="text-sm text-muted-foreground">
                                {episode.duration}
                              </span>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {episode.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No episodes available for this content.
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {relatedShows.map((show, index) => (
                    <motion.div
                      key={show.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="card-hover"
                    >
                      <Link href={`/shows/${show.id}`} className="group block">
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                          <Image
                            src={
                              show.poster ||
                              show.thumbnail ||
                              "/placeholder.svg"
                            }
                            alt={show.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-full bg-white/20 hover:bg-white/30"
                            >
                              <Play className="w-8 h-8 text-white" />
                            </Button>
                          </div>
                          {show.userRating && (
                            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                              {show.userRating}
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium text-sm truncate">
                          {show.title}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {show.genre}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Continue Watching Section */}
        <ContinueWatching />
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <ShareDialog
            title={show.title}
            id={show.id}
            onClose={() => setShowShareDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
