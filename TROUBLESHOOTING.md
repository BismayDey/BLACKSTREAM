# 🔧 Vidking Player Troubleshooting Guide

## Common Errors and Solutions

### 1. ❌ 404 Error: TMDB ID Not Found

**Error Message:**

```
GET https://db.cineby.app/3/tv/1922715?api_key=... 404 (Not Found)
```

**Cause:** The TMDB ID doesn't exist or is incorrect.

**Solutions:**

#### A. Verify TMDB ID

1. Go to [TMDB Website](https://www.themoviedb.org/)
2. Search for your content
3. Check the URL for the correct ID:
   - Movie: `themoviedb.org/movie/{ID}`
   - TV: `themoviedb.org/tv/{ID}`

#### B. Use Verified IDs

Replace with known working IDs:

**Popular Movie IDs:**

```tsx
// Inception
<VidkingPlayer tmdbId="27205" type="movie" />

// The Dark Knight
<VidkingPlayer tmdbId="155" type="movie" />

// Avengers: Endgame
<VidkingPlayer tmdbId="299534" type="movie" />
```

**Popular TV IDs:**

```tsx
// Squid Game
<VidkingPlayer tmdbId="93405" type="tv" season={1} episode={1} />

// Breaking Bad
<VidkingPlayer tmdbId="1396" type="tv" season={1} episode={1} />

// Wednesday
<VidkingPlayer tmdbId="119051" type="tv" season={1} episode={1} />
```

#### C. Check Content Type

Make sure you're using the correct type:

```tsx
// Wrong - using TV ID as movie
<VidkingPlayer tmdbId="93405" type="movie" /> ❌

// Correct - using TV ID with proper type
<VidkingPlayer tmdbId="93405" type="tv" season={1} episode={1} /> ✅
```

---

### 2. 🚫 ERR_BLOCKED_BY_CLIENT

**Error Message:**

```
GET https://static.cloudflareinsights.com/beacon.min.js net::ERR_BLOCKED_BY_CLIENT
POST https://tacklesfilmdom.shop/cuid/?f=... net::ERR_BLOCKED_BY_CLIENT
```

**Cause:** Ad blockers or privacy extensions blocking tracking scripts.

**Impact:** ⚠️ These errors are **NORMAL and HARMLESS**. They don't affect video playback.

**What's Being Blocked:**

- Cloudflare analytics
- Third-party tracking pixels
- Ad network requests

**Solutions:**

#### Option 1: Ignore (Recommended)

These errors don't impact functionality. The video player works fine without these scripts.

#### Option 2: Whitelist (Not Recommended)

If you want to support the service:

1. Open your ad blocker settings
2. Add `vidking.net` to whitelist
3. Reload the page

#### Option 3: Disable Console Errors

Hide these specific errors in DevTools:

```javascript
// Add to browser console settings
-url:cloudflareinsights.com
-url:tacklesfilmdom.shop
```

---

### 3. ⚫ Black Screen / Player Not Loading

**Symptoms:**

- Video player area is black
- No controls visible
- Loading spinner doesn't appear

**Causes & Solutions:**

#### A. Invalid TMDB ID

```tsx
// Check if ID is numeric
const isValid = /^\d+$/.test(tmdbId);
```

#### B. Missing Season/Episode for TV

```tsx
// Wrong - TV show without season/episode
<VidkingPlayer tmdbId="93405" type="tv" /> ❌

// Correct
<VidkingPlayer tmdbId="93405" type="tv" season={1} episode={1} /> ✅
```

#### C. Network Issues

1. Check internet connection
2. Try a different network
3. Disable VPN if active
4. Check if vidking.net is accessible

#### D. Browser Issues

1. Clear browser cache
2. Try incognito/private mode
3. Test in different browser
4. Update browser to latest version

---

### 4. 💾 Progress Not Saving

**Symptoms:**

- Video doesn't resume from last position
- Progress bar resets every time

**Solutions:**

#### A. Check Firebase Connection

```typescript
// Verify Firestore is connected
import { db } from "@/lib/firebase";

// Test connection
const testConnection = async () => {
  try {
    const docRef = doc(db, "test", "connection");
    await setDoc(docRef, { test: true });
    console.log("✅ Firestore connected");
  } catch (error) {
    console.error("❌ Firestore error:", error);
  }
};
```

#### B. Check User Authentication

```typescript
// Ensure user is logged in
const { user } = useAuth();
if (!user) {
  console.warn("⚠️ User not logged in - progress won't sync");
}
```

#### C. Check Firestore Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/watchProgress/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/watchHistory/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

#### D. Check localStorage

```typescript
// Fallback: Check localStorage
const contentId = `${tmdbId}_s${season}_e${episode}`;
const saved = localStorage.getItem(`vidking_progress_${contentId}`);
console.log("Saved progress:", saved);
```

---

### 5. 🔄 Player Keeps Reloading

**Causes:**

- Component re-rendering unnecessarily
- State updates causing remounts
- Key prop changing

**Solutions:**

#### A. Memoize Player

```tsx
import { useMemo } from "react";

const player = useMemo(
  () => (
    <VidkingPlayer
      tmdbId={tmdbId}
      type={type}
      season={season}
      episode={episode}
    />
  ),
  [tmdbId, type, season, episode]
); // Only re-render when these change
```

#### B. Use Stable Keys

```tsx
// Wrong - key changes every render
<VidkingPlayer key={Math.random()} ... /> ❌

// Correct - stable key
<VidkingPlayer key={`${tmdbId}-${season}-${episode}`} ... /> ✅
```

#### C. Avoid Inline Objects

```tsx
// Wrong - new object every render
<VidkingPlayer onProgressUpdate={(p, t) => { /* ... */ }} /> ❌

// Correct - stable callback
const handleProgress = useCallback((p, t) => {
  // ...
}, [])
<VidkingPlayer onProgressUpdate={handleProgress} /> ✅
```

---

### 6. 🎨 Color Not Applying

**Issue:** Custom color not showing in player

**Solutions:**

#### A. Check Color Format

```tsx
// Wrong - includes #
<VidkingPlayer color="#e50914" /> ❌

// Correct - hex without #
<VidkingPlayer color="e50914" /> ✅
```

#### B. Use Valid Hex Colors

```tsx
// Valid
color = "e50914"; // Netflix red ✅
color = "ff0000"; // Pure red ✅
color = "9146ff"; // Twitch purple ✅

// Invalid
color = "red"; // CSS color name ❌
color = "rgb(255,0,0)"; // RGB format ❌
```

---

### 7. 📱 Mobile Issues

**Problems on mobile devices:**

#### A. Player Too Small

```tsx
// Add responsive sizing
<div className="w-full max-w-7xl mx-auto">
  <VidkingPlayer ... />
</div>
```

#### B. Controls Not Working

- Ensure touch events aren't blocked
- Check if mobile browser supports fullscreen
- Test in different mobile browsers

#### C. Autoplay Not Working

```tsx
// Mobile browsers block autoplay
// Use autoPlay={false} for mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

<VidkingPlayer
  autoPlay={!isMobile}
  ...
/>
```

---

## Quick Debugging Checklist

### ✅ Before You Start

- [ ] TMDB ID is correct and numeric
- [ ] Content type (movie/tv) is correct
- [ ] Season/episode provided for TV shows
- [ ] Firebase is configured
- [ ] User is authenticated (for progress tracking)

### 🔍 If Player Doesn't Load

1. Check browser console for errors
2. Verify TMDB ID at themoviedb.org
3. Test with a known working ID (e.g., 27205)
4. Try in incognito mode
5. Check network tab for 404 errors

### 💾 If Progress Doesn't Save

1. Check if user is logged in
2. Verify Firestore rules
3. Check browser console for Firebase errors
4. Test localStorage fallback
5. Verify onProgressUpdate is firing

### 🎥 If Video Won't Play

1. Check content is available on TMDB
2. Try different content
3. Check internet connection
4. Disable VPN/proxy
5. Test in different browser

---

## Error Code Reference

| Error Code                 | Meaning           | Solution                         |
| -------------------------- | ----------------- | -------------------------------- |
| 404                        | TMDB ID not found | Verify ID at themoviedb.org      |
| ERR_BLOCKED_BY_CLIENT      | Ad blocker active | Ignore - doesn't affect playback |
| ERR_CONNECTION_REFUSED     | Network issue     | Check internet connection        |
| ERR_CERT_AUTHORITY_INVALID | SSL issue         | Check system date/time           |
| ERR_NAME_NOT_RESOLVED      | DNS issue         | Check DNS settings               |

---

## Browser Console Commands

### Test Player Component

```javascript
// Check if component is mounted
document.querySelector('iframe[title*="Video Player"]');

// Get iframe src
const iframe = document.querySelector('iframe[title*="Video Player"]');
console.log(iframe?.src);

// Check localStorage
Object.keys(localStorage).filter((k) => k.includes("vidking"));
```

### Test Firebase Connection

```javascript
// In component
useEffect(() => {
  console.log("User:", user?.uid);
  console.log("TMDB ID:", tmdbId);
  console.log("Type:", type);
}, [user, tmdbId, type]);
```

### Monitor Player Events

```javascript
// Add to window
window.addEventListener("message", (event) => {
  console.log("Player event:", event.data);
});
```

---

## Getting Help

### 1. Check Documentation

- `VIDKING_INTEGRATION.md` - Full guide
- `QUICK_START.md` - Quick reference
- `README.md` - Project overview

### 2. Test with Demo

Visit `/video-demo` to test with working examples

### 3. Verify Installation

```bash
# Check all files exist
ls components/vidking-player.tsx
ls lib/tmdb-utils.ts
ls app/video-demo/page.tsx
```

### 4. Common Fix - Restart Dev Server

```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf .next

# Restart
pnpm dev
```

---

## Prevention Tips

### ✨ Best Practices

1. **Always validate TMDB IDs**

```tsx
import { isValidTmdbId } from "@/lib/tmdb-utils";

if (!isValidTmdbId(tmdbId)) {
  return <ErrorComponent />;
}
```

2. **Use type-safe props**

```tsx
interface ShowData {
  tmdbId: string;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
}
```

3. **Handle errors gracefully**

```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <VidkingPlayer ... />
</ErrorBoundary>
```

4. **Test with verified IDs first**

```tsx
// Use known working IDs during development
const TEST_IDS = {
  movie: "27205",
  tv: "93405",
};
```

5. **Log important info**

```tsx
useEffect(() => {
  console.log("Player initialized:", { tmdbId, type, season, episode });
}, []);
```

---

## Still Having Issues?

1. **Check browser console** - Look for red errors
2. **Check network tab** - Look for failed requests
3. **Test with demo page** - Visit `/video-demo`
4. **Try known IDs** - Use IDs from this guide
5. **Clear cache** - Hard refresh (Ctrl+Shift+R)

**The most common issue is an invalid TMDB ID. Always verify at themoviedb.org first!**

---

**Last Updated**: October 6, 2025
