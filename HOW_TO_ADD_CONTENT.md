# How to Add New Netflix Content

This guide explains how to add new shows and movies with proper, verified TMDB IDs.

---

## Quick Steps

1. Find the content on TMDB
2. Get the correct TMDB ID
3. Add to `lib/netflix-content.ts`
4. Update verification docs

---

## Step 1: Find Content on TMDB

Go to https://www.themoviedb.org/ and search for your show/movie.

### For TV Series:

- URL format: `https://www.themoviedb.org/tv/[TMDB_ID]-title-slug`
- Example: `https://www.themoviedb.org/tv/93405-squid-game`
- TMDB ID = **93405**
- Type = **"series"**

### For Movies:

- URL format: `https://www.themoviedb.org/movie/[TMDB_ID]-title-slug`
- Example: `https://www.themoviedb.org/movie/512195-red-notice`
- TMDB ID = **512195**
- Type = **"movie"**

---

## Step 2: Get Images from TMDB

### Method 1: Use TMDB API (Recommended)

Visit the show/movie page and look for images:

```
Thumbnail (16:9): https://image.tmdb.org/t/p/w1280/[image_id].jpg
Poster (2:3):     https://image.tmdb.org/t/p/w500/[image_id].jpg
Backdrop (16:9):  https://image.tmdb.org/t/p/original/[image_id].jpg
```

### Method 2: Get from TMDB directly

1. Go to the show's page
2. Click on "Images"
3. Right-click on image → Copy image address
4. Use the TMDB CDN format above

---

## Step 3: Add to netflix-content.ts

### Template for TV Series

```typescript
{
  id: "11", // Increment from last ID
  title: "Your Show Title",
  tmdbId: "YOUR_TMDB_ID", // ✅ Verify this exists
  type: "series",
  genre: ["Drama", "Thriller"], // 2-3 genres
  duration: "50 min", // Average episode length
  releaseYear: 2023,
  releaseDate: "January 1, 2023",
  rating: 8.5, // TMDB rating
  userRating: 8.2, // TMDB user rating
  thumbnail: "https://image.tmdb.org/t/p/w1280/[backdrop_image].jpg",
  poster: "https://image.tmdb.org/t/p/w500/[poster_image].jpg",
  backdrop: "https://image.tmdb.org/t/p/original/[backdrop_image].jpg",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  description: "Your show description from TMDB",
  cast: ["Actor 1", "Actor 2", "Actor 3", "Actor 4", "Actor 5", "Actor 6"],
  director: "Director Name",
  studio: "Netflix",
  awards: "Emmy Awards (if any)",
  currentSeason: 1,
  currentEpisode: 1,
  totalSeasons: 2, // From TMDB
  totalEpisodes: 10, // Per season
  episodes: [
    {
      title: "Episode 1 Title",
      duration: "50 min",
      description: "Episode description",
      thumbnail: "/placeholder.svg?height=720&width=1280",
    },
  ],
},
```

### Template for Movies

```typescript
{
  id: "11", // Increment from last ID
  title: "Your Movie Title",
  tmdbId: "YOUR_TMDB_ID", // ✅ Verify this exists
  type: "movie",
  genre: ["Action", "Adventure"], // 2-3 genres
  duration: "120 min", // Movie runtime
  releaseYear: 2023,
  releaseDate: "March 15, 2023",
  rating: 7.8, // TMDB rating
  userRating: 7.5, // TMDB user rating
  thumbnail: "https://image.tmdb.org/t/p/w1280/[backdrop_image].jpg",
  poster: "https://image.tmdb.org/t/p/w500/[poster_image].jpg",
  backdrop: "https://image.tmdb.org/t/p/original/[backdrop_image].jpg",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  description: "Your movie description from TMDB",
  cast: ["Actor 1", "Actor 2", "Actor 3", "Actor 4", "Actor 5", "Actor 6"],
  director: "Director Name",
  studio: "Netflix",
},
```

---

## Step 4: Verify and Test

### Checklist

- [ ] TMDB ID exists at themoviedb.org
- [ ] Type is correct ("series" or "movie")
- [ ] Images load (check in browser)
- [ ] All required fields filled
- [ ] No TypeScript errors
- [ ] Test video playback

### Test Playback

1. Start dev server: `npm run dev`
2. Navigate to your show: `/shows/[id]`
3. Click Play
4. Wait 10-15 seconds for sources to load
5. Verify video plays

---

## Common Issues

### ❌ TMDB ID Not Found

```
GET https://db.cineby.app/3/tv/999999?api_key=... 404
```

**Solution**: Double-check TMDB ID at themoviedb.org

### ❌ Wrong Type

```typescript
tmdbId: "512195", // Movie ID
type: "series" // ❌ Wrong!
```

**Solution**: Check if it's a TV series or movie on TMDB

### ❌ Images Not Loading

```
thumbnail: "https://image.tmdb.org/t/p/w1280/WRONG.jpg"
```

**Solution**:

1. Go to TMDB images page
2. Copy correct image path
3. Use format: `https://image.tmdb.org/t/p/[size]/[image_id].jpg`

### ❌ No Video Sources

```
SettingsOverlay: No qualities received
```

**Solution**:

- Content might not be available on Vidking.net
- Try a more popular show/movie
- Wait and retry later

---

## Real Examples

### Example 1: Breaking Bad (TV Series)

1. Go to: https://www.themoviedb.org/tv/1396-breaking-bad
2. TMDB ID = **1396**
3. Type = **"series"**

```typescript
{
  id: "11",
  title: "Breaking Bad",
  tmdbId: "1396", // ✅ From URL
  type: "series",
  genre: ["Drama", "Crime", "Thriller"],
  duration: "47 min",
  releaseYear: 2008,
  // ... rest of fields
}
```

### Example 2: The Dark Knight (Movie)

1. Go to: https://www.themoviedb.org/movie/155-the-dark-knight
2. TMDB ID = **155**
3. Type = **"movie"**

```typescript
{
  id: "12",
  title: "The Dark Knight",
  tmdbId: "155", // ✅ From URL
  type: "movie",
  genre: ["Action", "Crime", "Drama"],
  duration: "152 min",
  releaseYear: 2008,
  // ... rest of fields
}
```

---

## After Adding Content

### Update Documentation

1. Add to `VERIFIED_TMDB_IDS.md`:

```markdown
| 11 | Breaking Bad | 1396 | ✅ Verified | Oct 2025 |
```

2. Test thoroughly
3. Commit changes

### Update Homepage

The new content will automatically appear in:

- Featured section (first 3 items)
- Trending Now (TV series only)
- Top Rated Movies (sorted by rating)
- Recently Added (sorted by release year)

---

## Resources

- **TMDB Website**: https://www.themoviedb.org/
- **TMDB API Docs**: https://developers.themoviedb.org/3
- **Image Sizes**:
  - `w300`, `w500`, `w780`, `w1280`, `original` (backdrops)
  - `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original` (posters)

---

## Need Help?

Check these files:

- `VERIFIED_TMDB_IDS.md` - List of all working IDs
- `CONSOLE_ERRORS_GUIDE.md` - Understanding errors
- `lib/netflix-content.ts` - Current content examples
