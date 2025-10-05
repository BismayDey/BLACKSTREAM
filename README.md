# 🎬 BLACKSTREAM

A modern streaming platform built with Next.js 14, featuring the Vidking.net video player integration with **real Netflix content** and verified TMDB IDs for seamless movie and TV show streaming.

## 📚 Quick Links

- **[Verified TMDB IDs](VERIFIED_TMDB_IDS.md)** - Complete list of verified content IDs
- **[Console Errors Guide](CONSOLE_ERRORS_GUIDE.md)** - Understanding normal vs critical errors
- **[How to Add Content](HOW_TO_ADD_CONTENT.md)** - Step-by-step guide for adding new shows/movies
- **[Verification Summary](TMDB_VERIFICATION_SUMMARY.md)** - Latest status report

## ✨ Features

### 🎥 Video Streaming

- **Vidking.net Integration** - Professional HLS video player
- **Automatic Progress Tracking** - Resume from where you left off
- **Multi-format Support** - Movies and TV series
- **Episode Navigation** - Built-in season/episode selector for TV shows
- **Custom Branding** - Customizable player colors

### 🔐 User Management

- Firebase Authentication
- User profiles and watchlists
- Watch history tracking
- Favorites management

### 🎨 Modern UI/UX

- Dark theme with gradient effects
- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Shadcn/ui components
- Tailwind CSS styling

### 📊 Content Discovery

- Featured content carousel
- Trending shows and movies
- Genre-based filtering
- Search functionality
- Related content recommendations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/BismayDey/BLACKSTREAM.git
cd BLACKSTREAM
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📺 Vidking Player Integration

### Quick Start

```tsx
import { VidkingPlayer } from "@/components/vidking-player"

// Movie Player
<VidkingPlayer
  tmdbId="27205"
  type="movie"
  title="Inception"
/>

// TV Show Player
<VidkingPlayer
  tmdbId="93405"
  type="tv"
  season={1}
  episode={1}
  title="Squid Game - S1E1"
  nextEpisode={true}
  episodeSelector={true}
/>
```

### Features

- ✅ Automatic progress saving to Firestore
- ✅ Resume playback functionality
- ✅ localStorage backup
- ✅ Episode navigation (TV shows)
- ✅ Custom colors and themes
- ✅ Event tracking (play, pause, seek, end)

### Demo

Visit `/video-demo` to see the interactive player demo with live controls.

### Documentation

- 📖 [Full Integration Guide](./VIDKING_INTEGRATION.md)
- 🚀 [Quick Start Guide](./QUICK_START.md)
- 📋 [Integration Summary](./INTEGRATION_SUMMARY.md)

## 🏗️ Project Structure

```
BLACKSTREAM/
├── app/
│   ├── api/              # API routes
│   ├── shows/            # Show detail pages
│   ├── movies/           # Movies page
│   ├── series/           # Series page
│   ├── video-demo/       # Player demo page
│   ├── login/            # Authentication pages
│   └── ...
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── vidking-player.tsx # Video player component
│   ├── navbar.tsx        # Navigation
│   └── ...
├── context/
│   ├── auth-context.tsx  # Authentication context
│   └── user-context.tsx  # User data context
├── lib/
│   ├── firebase.ts       # Firebase configuration
│   ├── db.ts            # Database utilities
│   └── ...
└── public/              # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Video Player**: Vidking.net
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **State Management**: React Context
- **Package Manager**: pnpm

## 📱 Pages

- `/` - Home page with featured content
- `/shows` - Browse all shows
- `/shows/[id]` - Individual show details with video player
- `/movies` - Movies page
- `/series` - TV series page
- `/video-demo` - Interactive player demo
- `/login` - User login
- `/register` - User registration
- `/profile` - User profile
- `/watchlist` - User's watchlist
- `/subscription` - Subscription plans

## 🎨 Customization

### Player Colors

Customize the video player to match your brand:

```tsx
<VidkingPlayer
  tmdbId="27205"
  type="movie"
  color="e50914" // Netflix red
/>
```

Popular presets:

- Netflix: `e50914`
- Disney+: `0063e5`
- HBO Max: `9030ff`
- Twitch: `9146ff`

### Theme

The app uses a dark theme by default. To customize, edit:

- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration

## 🔥 Key Features Explained

### Progress Tracking

- Automatically saves watch progress to Firestore
- Syncs across devices for logged-in users
- localStorage backup for guest users
- Resume from exact timestamp

### Watch History

- Tracks all watched content
- Shows watch percentage
- Sortable by date
- Quick access to continue watching

### Watchlist

- Add/remove shows and movies
- Sync across devices
- Quick access from navbar
- Integrated with user profile

### Episode Management

For TV shows:

- Automatic episode navigation
- Built-in episode selector
- Season switching
- "Next Episode" button

## 🌐 API Integration

### TMDB (The Movie Database)

The app uses TMDB IDs for content identification:

```typescript
interface Show {
  tmdbId: string; // TMDB ID
  type: "movie" | "series";
  season?: number;
  episode?: number;
  // ... other fields
}
```

To find TMDB IDs:

1. Visit https://www.themoviedb.org/
2. Search for content
3. Get ID from URL: `themoviedb.org/movie/{ID}` or `themoviedb.org/tv/{ID}`

### Vidking API

Player URLs:

- Movies: `https://www.vidking.net/embed/movie/{tmdbId}`
- TV: `https://www.vidking.net/embed/tv/{tmdbId}/{season}/{episode}`

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render

## 📊 Firestore Structure

```
users/
  {userId}/
    - profile data
    - watchlist[]
    - favorites[]

    watchProgress/
      {contentId}/
        - timestamp
        - progress
        - duration

    watchHistory/
      {contentId}/
        - lastWatched
        - title
        - type

    completed/
      {contentId}/
        - completedAt
        - title
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Bismay Dey**

- GitHub: [@BismayDey](https://github.com/BismayDey)

## 🙏 Acknowledgments

- [Vidking.net](https://www.vidking.net/) - Video player API
- [TMDB](https://www.themoviedb.org/) - Movie database
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Firebase](https://firebase.google.com/) - Authentication & Database
- [Next.js](https://nextjs.org/) - React framework

## 📞 Support

For support, please open an issue in the GitHub repository or visit the demo page at `/video-demo`.

---

**Built with ❤️ using Next.js, TypeScript, and Vidking.net**

**Last Updated**: October 6, 2025
