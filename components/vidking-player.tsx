"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { isValidTmdbId } from "@/lib/tmdb-utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface VidkingPlayerProps {
  tmdbId: string;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
  title?: string;
  color?: string;
  autoPlay?: boolean;
  nextEpisode?: boolean;
  episodeSelector?: boolean;
  onProgressUpdate?: (progress: number, timestamp: number) => void;
}

interface PlayerEvent {
  type: "PLAYER_EVENT";
  data: {
    event: "timeupdate" | "play" | "pause" | "ended" | "seeked";
    currentTime: number;
    duration: number;
    progress: number;
    id: string;
    mediaType: "movie" | "tv";
    season?: number;
    episode?: number;
    timestamp: number;
  };
}

export function VidkingPlayer({
  tmdbId,
  type,
  season,
  episode,
  title,
  color = "e50914",
  autoPlay = false,
  nextEpisode = true,
  episodeSelector = true,
  onProgressUpdate,
}: VidkingPlayerProps) {
  const authContext = useAuth();
  const user = authContext?.user || null;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [savedProgress, setSavedProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Validate TMDB ID on mount
  useEffect(() => {
    if (!isValidTmdbId(tmdbId)) {
      setError(
        `Invalid TMDB ID: "${tmdbId}". Please provide a valid numeric TMDB ID.`
      );
      setIsLoading(false);
      return;
    }

    if (type === "tv" && (!season || !episode)) {
      setError("Season and episode are required for TV shows.");
      setIsLoading(false);
      return;
    }

    setError(null);
  }, [tmdbId, type, season, episode]);

  // Load saved progress from Firestore/localStorage
  useEffect(() => {
    const loadProgress = async () => {
      if (!user || !tmdbId || error) {
        setIsLoading(false);
        return;
      }

      try {
        // Create a unique ID for the content
        const contentId =
          type === "tv" ? `${tmdbId}_s${season}_e${episode}` : tmdbId;

        // Try to load from Firestore first
        const progressRef = doc(
          db,
          "users",
          user.uid,
          "watchProgress",
          contentId
        );
        const progressDoc = await getDoc(progressRef);

        if (progressDoc.exists()) {
          const data = progressDoc.data();
          setSavedProgress(data.timestamp || 0);
        } else {
          // Fallback to localStorage
          const localProgress = localStorage.getItem(
            `vidking_progress_${contentId}`
          );
          if (localProgress) {
            const parsed = JSON.parse(localProgress);
            setSavedProgress(parsed.timestamp || 0);
          }
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user, tmdbId, type, season, episode]);

  // Listen for player events
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      try {
        // Parse the event data
        let eventData: PlayerEvent;
        if (typeof event.data === "string") {
          try {
            eventData = JSON.parse(event.data);
          } catch {
            // Not JSON, ignore
            return;
          }
        } else {
          eventData = event.data;
        }

        // Check if it's a player event
        if (eventData.type !== "PLAYER_EVENT") return;

        const { data } = eventData;
        console.log("Player Event:", data);

        // Create unique content ID
        const contentId =
          data.mediaType === "tv" && data.season && data.episode
            ? `${data.id}_s${data.season}_e${data.episode}`
            : data.id;

        // Save progress to Firestore and localStorage
        if (
          user &&
          (data.event === "timeupdate" ||
            data.event === "pause" ||
            data.event === "ended")
        ) {
          const progressData = {
            id: data.id,
            type: data.mediaType,
            progress: data.progress,
            timestamp: data.currentTime,
            duration: data.duration,
            season: data.season,
            episode: data.episode,
            lastWatched: new Date().toISOString(),
            title: title || "Unknown",
          };

          // Save to Firestore
          try {
            const progressRef = doc(
              db,
              "users",
              user.uid,
              "watchProgress",
              contentId
            );
            await setDoc(progressRef, progressData, { merge: true });

            // Also save to watch history
            const historyRef = doc(
              db,
              "users",
              user.uid,
              "watchHistory",
              contentId
            );
            await setDoc(
              historyRef,
              {
                id: data.id,
                title: title || "Unknown",
                type: data.mediaType,
                season: data.season,
                episode: data.episode,
                lastWatched: new Date().toISOString(),
                progress: data.progress,
                timestamp: data.currentTime,
                duration: data.duration,
              },
              { merge: true }
            );
          } catch (error) {
            console.error("Error saving to Firestore:", error);
          }

          // Save to localStorage as backup
          localStorage.setItem(
            `vidking_progress_${contentId}`,
            JSON.stringify(progressData)
          );

          // Call onProgressUpdate callback if provided
          if (onProgressUpdate) {
            onProgressUpdate(data.progress, data.currentTime);
          }
        }

        // Handle video ended event
        if (data.event === "ended" && user) {
          // Mark as completed
          const contentId =
            data.mediaType === "tv" && data.season && data.episode
              ? `${data.id}_s${data.season}_e${data.episode}`
              : data.id;

          const completedRef = doc(
            db,
            "users",
            user.uid,
            "completed",
            contentId
          );
          await setDoc(completedRef, {
            id: data.id,
            type: data.mediaType,
            season: data.season,
            episode: data.episode,
            completedAt: new Date().toISOString(),
            title: title || "Unknown",
          });
        }
      } catch (error) {
        console.error("Error handling player message:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [user, title, onProgressUpdate]);

  // Build iframe URL
  const buildIframeUrl = () => {
    let url = "https://www.vidking.net/embed/";

    if (type === "tv" && season && episode) {
      url += `tv/${tmdbId}/${season}/${episode}`;
    } else {
      url += `movie/${tmdbId}`;
    }

    const params = new URLSearchParams();
    params.append("color", color);
    params.append("autoPlay", autoPlay.toString());

    if (savedProgress > 0) {
      params.append("progress", Math.floor(savedProgress).toString());
    }

    if (type === "tv") {
      params.append("nextEpisode", nextEpisode.toString());
      params.append("episodeSelector", episodeSelector.toString());
    }

    return `${url}?${params.toString()}`;
  };

  // Error state
  if (error) {
    return (
      <div className="w-full aspect-video bg-black/50 backdrop-blur-sm flex items-center justify-center p-8">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Video Player Error</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">{error}</p>
            {!isValidTmdbId(tmdbId) && (
              <div className="text-xs mt-3 space-y-1">
                <p className="font-semibold">Valid TMDB IDs examples:</p>
                <p>• Movies: 27205 (Inception), 155 (The Dark Knight)</p>
                <p>• TV Shows: 93405 (Squid Game), 1396 (Breaking Bad)</p>
                <p className="mt-2">
                  Find IDs at:{" "}
                  <a
                    href="https://www.themoviedb.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    themoviedb.org
                  </a>
                </p>
              </div>
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full aspect-video bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading player...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
      <iframe
        ref={iframeRef}
        src={buildIframeUrl()}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={title || "Video Player"}
        onError={() => {
          if (retryCount < 2) {
            setRetryCount(retryCount + 1);
            console.warn(`Player load failed, retry ${retryCount + 1}/2`);
          } else {
            setError(
              "Failed to load video player. The content may not be available or the TMDB ID may be incorrect."
            );
          }
        }}
      />
    </div>
  );
}
