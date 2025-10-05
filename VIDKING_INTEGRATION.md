# Vidking Video Player Integration

This project now uses the **Vidking.net** video player API for streaming movies and TV shows with automatic progress tracking.

## Features

✅ **Simple Integration** - Just one iframe tag - no complex setup required  
✅ **Lightning Fast** - Optimized for performance with HLS.js and modern streaming  
✅ **Isolated Storage** - Each configuration uses separate localStorage - no conflicts  
✅ **Progress Tracking** - Automatic watch progress saved to Firestore and localStorage  
✅ **Full API** - Complete control with URL parameters

## Component Usage

### VidkingPlayer Component

Located at `components/vidking-player.tsx`

```tsx
import { VidkingPlayer } from "@/components/vidking-player"

// For Movies
<VidkingPlayer
  tmdbId="27205"
  type="movie"
  title="Inception"
  color="e50914"
  autoPlay={false}
/>

// For TV Series
<VidkingPlayer
  tmdbId="93405"
  type="tv"
  season={1}
  episode={1}
  title="Squid Game - S1E1"
  color="e50914"
  autoPlay={false}
  nextEpisode={true}
  episodeSelector={true}
/>
```

### Props

| Prop               | Type            | Required | Description                                            |
| ------------------ | --------------- | -------- | ------------------------------------------------------ |
| `tmdbId`           | string          | Yes      | The TMDB movie or TV show ID                           |
| `type`             | "movie" \| "tv" | Yes      | Content type                                           |
| `season`           | number          | For TV   | Season number                                          |
| `episode`          | number          | For TV   | Episode number                                         |
| `title`            | string          | No       | Title for progress tracking                            |
| `color`            | string          | No       | Primary color (hex without #), default: "e50914"       |
| `autoPlay`         | boolean         | No       | Enable auto-play, default: false                       |
| `nextEpisode`      | boolean         | No       | Show next episode button (TV only), default: true      |
| `episodeSelector`  | boolean         | No       | Enable episode selection menu (TV only), default: true |
| `onProgressUpdate` | function        | No       | Callback for progress updates                          |

## API Routes

### Movies

```
/embed/movie/{tmdbId}
```

Replace `{tmdbId}` with the TMDB movie ID

### TV Series

```
/embed/tv/{tmdbId}/{season}/{episode}
```

Specify the show ID, season number, and episode number

## URL Parameters

| Parameter         | Type    | Description                             | Example                 |
| ----------------- | ------- | --------------------------------------- | ----------------------- |
| `color`           | string  | Primary color (hex without #)           | `?color=ff0000`         |
| `autoPlay`        | boolean | Enable auto-play feature                | `?autoPlay=true`        |
| `nextEpisode`     | boolean | Show next episode button (TV only)      | `?nextEpisode=true`     |
| `episodeSelector` | boolean | Enable episode selection menu (TV only) | `?episodeSelector=true` |
| `progress`        | number  | Start time in seconds                   | `?progress=120`         |

## Watch Progress Tracking

The player automatically sends watch progress events to the parent window. These events are automatically handled by the `VidkingPlayer` component and saved to:

1. **Firestore** - `users/{userId}/watchProgress/{contentId}`
2. **Firestore** - `users/{userId}/watchHistory/{contentId}` (for watch history)
3. **localStorage** - `vidking_progress_{contentId}` (backup)

### Event Data Structure

```json
{
  "type": "PLAYER_EVENT",
  "data": {
    "event": "timeupdate|play|pause|ended|seeked",
    "currentTime": 120.5,
    "duration": 7200,
    "progress": 1.6,
    "id": "299534",
    "mediaType": "movie",
    "season": 1,
    "episode": 8,
    "timestamp": 1640995200000
  }
}
```

### Events Sent

- `timeupdate` - Continuous progress during playback
- `play` - When video starts
- `pause` - When video pauses
- `ended` - When video ends
- `seeked` - When user seeks to different time

## Examples

### Basic Movie Player

```tsx
<VidkingPlayer tmdbId="1078605" type="movie" title="Venom: The Last Dance" />
```

### TV Series with All Features

```tsx
<VidkingPlayer
  tmdbId="119051"
  type="tv"
  season={1}
  episode={8}
  title="Wednesday - S1E8"
  color="e50914"
  autoPlay={true}
  nextEpisode={true}
  episodeSelector={true}
/>
```

### Custom Branded Player

```tsx
<VidkingPlayer
  tmdbId="1078605"
  type="movie"
  title="Venom: The Last Dance"
  color="9146ff"
  autoPlay={true}
/>
```

### Player with Resume Progress

The player automatically loads saved progress from Firestore/localStorage and resumes from where the user left off.

## Direct Iframe Usage

If you prefer to use the iframe directly without the React component:

```html
<!-- Movie -->
<iframe
  src="https://www.vidking.net/embed/movie/1078605?color=e50914&autoPlay=false"
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
>
</iframe>

<!-- TV Show -->
<iframe
  src="https://www.vidking.net/embed/tv/119051/1/8?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true"
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
>
</iframe>
```

## Finding TMDB IDs

To find TMDB IDs for movies and TV shows:

1. Go to [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Search for your movie or TV show
3. The ID is in the URL: `https://www.themoviedb.org/movie/{ID}` or `https://www.themoviedb.org/tv/{ID}`

Examples:

- Inception: `https://www.themoviedb.org/movie/27205` → ID: **27205**
- Breaking Bad: `https://www.themoviedb.org/tv/1396` → ID: **1396**
- Squid Game: `https://www.themoviedb.org/tv/93405` → ID: **93405**

## Implementation in BLACKSTREAM

The Vidking player has been integrated into:

- `app/shows/[id]/page.tsx` - Individual show pages
- `components/vidking-player.tsx` - Reusable player component

### Sample Data Updates

The show data now includes `tmdbId` fields:

```typescript
{
  id: "1",
  title: "Squid Game",
  tmdbId: "93405",
  type: "series",
  currentSeason: 1,
  currentEpisode: 1,
  // ... other fields
}
```

## Progress Tracking Implementation

Progress is automatically saved when:

- User watches the video (timeupdate events)
- User pauses the video
- Video ends
- User seeks to different time

Progress is loaded when:

- Component mounts
- User is authenticated
- Content ID is available

This ensures seamless resume functionality across sessions and devices.
