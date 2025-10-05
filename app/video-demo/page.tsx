"use client";

import { useState } from "react";
import { VidkingPlayer } from "@/components/vidking-player";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function VideoPlayerDemo() {
  // Movie demo state
  const [movieId, setMovieId] = useState("27205");
  const [movieColor, setMovieColor] = useState("e50914");
  const [movieAutoPlay, setMovieAutoPlay] = useState(false);

  // TV demo state
  const [tvId, setTvId] = useState("93405");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [tvColor, setTvColor] = useState("e50914");
  const [tvAutoPlay, setTvAutoPlay] = useState(false);
  const [nextEpisode, setNextEpisode] = useState(true);
  const [episodeSelector, setEpisodeSelector] = useState(true);

  const popularMovies = [
    { id: "27205", title: "Inception", year: 2010 },
    { id: "155", title: "The Dark Knight", year: 2008 },
    { id: "299534", title: "Avengers: Endgame", year: 2019 },
    { id: "299536", title: "Avengers: Infinity War", year: 2018 },
    { id: "278", title: "The Shawshank Redemption", year: 1994 },
  ];

  const popularShows = [
    { id: "93405", title: "Squid Game", year: 2021 },
    { id: "1396", title: "Breaking Bad", year: 2008 },
    { id: "1399", title: "Game of Thrones", year: 2011 },
    { id: "119051", title: "Wednesday", year: 2022 },
    { id: "94605", title: "Arcane", year: 2021 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Vidking Video Player Demo
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Integrated video streaming with automatic progress tracking
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="border-primary/50">
              🚀 Lightning Fast
            </Badge>
            <Badge variant="outline" className="border-primary/50">
              💾 Auto Progress Tracking
            </Badge>
            <Badge variant="outline" className="border-primary/50">
              🎬 HLS Streaming
            </Badge>
            <Badge variant="outline" className="border-primary/50">
              📱 Responsive Design
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="tv">TV Series</TabsTrigger>
          </TabsList>

          <TabsContent value="movies">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Player */}
              <div className="lg:col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle>Movie Player</CardTitle>
                    <CardDescription>
                      Streaming with TMDB ID:{" "}
                      <code className="text-primary">{movieId}</code>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VidkingPlayer
                      tmdbId={movieId}
                      type="movie"
                      title="Demo Movie"
                      color={movieColor}
                      autoPlay={movieAutoPlay}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle>Controls</CardTitle>
                    <CardDescription>Customize the player</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="movie-id">TMDB Movie ID</Label>
                      <Input
                        id="movie-id"
                        value={movieId}
                        onChange={(e) => setMovieId(e.target.value)}
                        placeholder="Enter TMDB ID"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="movie-color">Color (hex without #)</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="movie-color"
                          value={movieColor}
                          onChange={(e) => setMovieColor(e.target.value)}
                          placeholder="e50914"
                        />
                        <div
                          className="w-12 h-10 rounded border"
                          style={{ backgroundColor: `#${movieColor}` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="movie-autoplay">Auto Play</Label>
                      <Switch
                        id="movie-autoplay"
                        checked={movieAutoPlay}
                        onCheckedChange={setMovieAutoPlay}
                      />
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Quick Select Colors
                      </Label>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setMovieColor("e50914")}
                          className="px-3"
                          style={{ borderColor: "#e50914" }}
                        >
                          Netflix
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setMovieColor("9146ff")}
                          className="px-3"
                          style={{ borderColor: "#9146ff" }}
                        >
                          Twitch
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setMovieColor("ff0000")}
                          className="px-3"
                          style={{ borderColor: "#ff0000" }}
                        >
                          Red
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle>Popular Movies</CardTitle>
                    <CardDescription>Try these examples</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {popularMovies.map((movie) => (
                        <Button
                          key={movie.id}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => setMovieId(movie.id)}
                        >
                          <div className="flex justify-between w-full">
                            <span>{movie.title}</span>
                            <span className="text-muted-foreground">
                              {movie.year}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tv">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Player */}
              <div className="lg:col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle>TV Series Player</CardTitle>
                    <CardDescription>
                      Streaming TMDB ID:{" "}
                      <code className="text-primary">{tvId}</code> - Season{" "}
                      {season}, Episode {episode}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VidkingPlayer
                      tmdbId={tvId}
                      type="tv"
                      season={season}
                      episode={episode}
                      title={`Demo TV Show - S${season}E${episode}`}
                      color={tvColor}
                      autoPlay={tvAutoPlay}
                      nextEpisode={nextEpisode}
                      episodeSelector={episodeSelector}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle>Controls</CardTitle>
                    <CardDescription>Customize the player</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tv-id">TMDB TV Show ID</Label>
                      <Input
                        id="tv-id"
                        value={tvId}
                        onChange={(e) => setTvId(e.target.value)}
                        placeholder="Enter TMDB ID"
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="season">Season</Label>
                        <Input
                          id="season"
                          type="number"
                          min="1"
                          value={season}
                          onChange={(e) =>
                            setSeason(parseInt(e.target.value) || 1)
                          }
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="episode">Episode</Label>
                        <Input
                          id="episode"
                          type="number"
                          min="1"
                          value={episode}
                          onChange={(e) =>
                            setEpisode(parseInt(e.target.value) || 1)
                          }
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tv-color">Color (hex without #)</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="tv-color"
                          value={tvColor}
                          onChange={(e) => setTvColor(e.target.value)}
                          placeholder="e50914"
                        />
                        <div
                          className="w-12 h-10 rounded border"
                          style={{ backgroundColor: `#${tvColor}` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tv-autoplay">Auto Play</Label>
                        <Switch
                          id="tv-autoplay"
                          checked={tvAutoPlay}
                          onCheckedChange={setTvAutoPlay}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="next-episode">
                          Next Episode Button
                        </Label>
                        <Switch
                          id="next-episode"
                          checked={nextEpisode}
                          onCheckedChange={setNextEpisode}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="episode-selector">
                          Episode Selector
                        </Label>
                        <Switch
                          id="episode-selector"
                          checked={episodeSelector}
                          onCheckedChange={setEpisodeSelector}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle>Popular TV Shows</CardTitle>
                    <CardDescription>Try these examples</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {popularShows.map((show) => (
                        <Button
                          key={show.id}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            setTvId(show.id);
                            setSeason(1);
                            setEpisode(1);
                          }}
                        >
                          <div className="flex justify-between w-full">
                            <span>{show.title}</span>
                            <span className="text-muted-foreground">
                              {show.year}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>🚀 Simple Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Just one component - no complex setup required. Add the
                VidkingPlayer component and you're done!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>💾 Auto Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automatically saves watch progress to Firestore and
                localStorage. Resume from where you left off!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>⚡ Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Optimized for performance with HLS.js and modern streaming
                technologies for smooth playback.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Code Example */}
        <Card className="mt-12 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle>Code Example</CardTitle>
            <CardDescription>Copy and use in your project</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { VidkingPlayer } from "@/components/vidking-player"

// Movie
<VidkingPlayer
  tmdbId="${movieId}"
  type="movie"
  color="${movieColor}"
  autoPlay={${movieAutoPlay}}
/>

// TV Series
<VidkingPlayer
  tmdbId="${tvId}"
  type="tv"
  season={${season}}
  episode={${episode}}
  color="${tvColor}"
  autoPlay={${tvAutoPlay}}
  nextEpisode={${nextEpisode}}
  episodeSelector={${episodeSelector}}
/>`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
