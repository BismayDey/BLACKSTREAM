# Vidking Player Quick Start Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Import the Component

```tsx
import { VidkingPlayer } from "@/components/vidking-player";
```

### Step 2: Add to Your Page

```tsx
// For Movies
<VidkingPlayer tmdbId="27205" type="movie" title="Inception" />

// For TV Shows
<VidkingPlayer tmdbId="93405" type="tv" season={1} episode={1} title="Squid Game" />
```

### Step 3: Done! 🎉

The player automatically handles:

- ✅ Video streaming
- ✅ Progress tracking
- ✅ Resume playback
- ✅ Episode navigation (TV shows)

---

## 🎬 Examples

### Netflix-Style Movie Player

```tsx
<VidkingPlayer
  tmdbId="155"
  type="movie"
  title="The Dark Knight"
  color="e50914"
  autoPlay={false}
/>
```

### TV Show with Navigation

```tsx
<VidkingPlayer
  tmdbId="1399"
  type="tv"
  season={1}
  episode={1}
  title="Game of Thrones - S1E1"
  color="e50914"
  nextEpisode={true}
  episodeSelector={true}
/>
```

### Custom Branded Player

```tsx
<VidkingPlayer
  tmdbId="299534"
  type="movie"
  title="Avengers: Endgame"
  color="9146ff" // Purple theme
  autoPlay={true}
/>
```

---

## 🔍 Finding TMDB IDs

### Method 1: TMDB Website

1. Visit https://www.themoviedb.org/
2. Search for your content
3. Copy ID from URL

**Example URLs:**

- Movie: `themoviedb.org/movie/27205` → ID: `27205`
- TV: `themoviedb.org/tv/93405` → ID: `93405`

### Method 2: Popular IDs Reference

**Movies:**

- Inception: `27205`
- The Dark Knight: `155`
- Avengers: Endgame: `299534`
- The Shawshank Redemption: `278`
- Pulp Fiction: `680`

**TV Shows:**

- Squid Game: `93405`
- Breaking Bad: `1396`
- Game of Thrones: `1399`
- Wednesday: `119051`
- Stranger Things: `66732`

---

## 🎨 Color Customization

Popular streaming service colors:

```tsx
// Netflix Red
color = "e50914";

// Amazon Prime Blue
color = "00a8e1";

// Disney+ Blue
color = "0063e5";

// HBO Max Purple
color = "9030ff";

// Twitch Purple
color = "9146ff";

// YouTube Red
color = "ff0000";

// Hulu Green
color = "1ce783";

// Apple TV+ White
color = "ffffff";
```

---

## 📊 Progress Tracking

### Automatic Saving

Progress is saved automatically to:

1. **Firestore** (for logged-in users)
   - Collection: `users/{userId}/watchProgress/{contentId}`
2. **localStorage** (backup)
   - Key: `vidking_progress_{contentId}`

### Content ID Format

- **Movies**: `{tmdbId}`
- **TV Shows**: `{tmdbId}_s{season}_e{episode}`

Example:

- Movie: `27205`
- TV Show: `93405_s1_e1`

### Resume Playback

The player automatically:

1. Loads saved progress on mount
2. Starts from last position
3. Updates progress every few seconds
4. Saves on pause, seek, and end

---

## 🔧 Advanced Usage

### With Progress Callback

```tsx
<VidkingPlayer
  tmdbId="27205"
  type="movie"
  title="Inception"
  onProgressUpdate={(progress, timestamp) => {
    console.log(`Watched ${progress}% (${timestamp} seconds)`);
    // Update UI, send analytics, etc.
  }}
/>
```

### Dynamic Season/Episode

```tsx
const [season, setSeason] = useState(1)
const [episode, setEpisode] = useState(1)

<VidkingPlayer
  tmdbId="93405"
  type="tv"
  season={season}
  episode={episode}
  title={`Squid Game - S${season}E${episode}`}
/>

<Button onClick={() => setEpisode(episode + 1)}>
  Next Episode
</Button>
```

### Conditional Player Type

```tsx
<VidkingPlayer
  tmdbId={content.tmdbId}
  type={content.type === "series" ? "tv" : "movie"}
  season={content.type === "series" ? content.season : undefined}
  episode={content.type === "series" ? content.episode : undefined}
  title={content.title}
/>
```

---

## 🎯 Demo Page

Visit **`/video-demo`** in your browser to:

- ✨ See the player in action
- 🎮 Try interactive controls
- 🎨 Test different colors
- 📺 Switch between movies and TV shows
- 📋 Copy code examples

---

## ⚡ Performance Tips

1. **Lazy Load**: Only render player when needed

```tsx
{
  isWatching && <VidkingPlayer {...props} />;
}
```

2. **Memoize**: Prevent unnecessary re-renders

```tsx
const player = useMemo(
  () => <VidkingPlayer {...props} />,
  [tmdbId, season, episode]
);
```

3. **Preload Progress**: Load saved progress before rendering

```tsx
useEffect(() => {
  loadProgress().then(() => setReady(true));
}, []);
```

---

## 🐛 Common Issues

### Player shows black screen

- ✅ Check TMDB ID is correct
- ✅ Verify content exists on TMDB
- ✅ Try a different browser

### Progress not saving

- ✅ Check user is logged in (for Firestore)
- ✅ Verify Firestore rules allow writes
- ✅ Check browser console for errors

### Wrong episode loads

- ✅ Verify season/episode numbers are correct
- ✅ Check state updates properly
- ✅ Use unique keys when rendering multiple players

---

## 📚 Full Documentation

For complete API reference, see:

- `VIDKING_INTEGRATION.md` - Full integration guide
- `INTEGRATION_SUMMARY.md` - Complete change summary
- `/video-demo` - Interactive demo page

---

## 💡 Pro Tips

1. **Always provide a title** for better progress tracking
2. **Use meaningful colors** that match your brand
3. **Enable episodeSelector** for TV shows for better UX
4. **Handle onProgressUpdate** for analytics
5. **Test with popular content** first (IDs listed above)

---

**Need Help?** Check the demo page at `/video-demo` or review `VIDKING_INTEGRATION.md`

**Happy Streaming! 🎬🍿**
