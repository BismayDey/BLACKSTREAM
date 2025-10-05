# 🚀 BLACKSTREAM - Quick Reference Card

## ✅ Status: All Systems Operational

**Last Updated**: October 6, 2025  
**TMDB IDs**: 10/10 Verified  
**Homepage**: ✅ Redesigned with Real Content  
**Video Player**: ✅ Vidking.net Integrated

---

## 📋 Quick Facts

### Content Library

- **TV Series**: 7 (Squid Game, Stranger Things, Wednesday, The Witcher, Money Heist, The Crown, Bridgerton)
- **Movies**: 3 (The Adam Project, Glass Onion, Red Notice)
- **Total**: 10 verified items with real TMDB images

### Technologies

- Next.js 14 (App Router)
- TypeScript
- Vidking.net (Video Player)
- TMDB (Content Database)
- Firebase (Auth & Data)
- Tailwind CSS + Shadcn/ui

---

## 🎯 Common Tasks

### Start Development Server

```bash
npm run dev
# or
pnpm dev
```

### Add New Content

1. Get TMDB ID from themoviedb.org
2. Add to `lib/netflix-content.ts`
3. Follow template in `HOW_TO_ADD_CONTENT.md`
4. Test playback

### Fix Console Errors

Most errors are **normal**! Check `CONSOLE_ERRORS_GUIDE.md`

---

## 📖 Documentation Map

| File                           | Purpose                            |
| ------------------------------ | ---------------------------------- |
| `README.md`                    | Main project overview              |
| `VERIFIED_TMDB_IDS.md`         | Quick reference of all working IDs |
| `CONSOLE_ERRORS_GUIDE.md`      | Understand which errors to ignore  |
| `HOW_TO_ADD_CONTENT.md`        | Step-by-step guide for new content |
| `TMDB_VERIFICATION_SUMMARY.md` | Latest verification report         |
| `VIDKING_INTEGRATION.md`       | Video player integration details   |
| `TROUBLESHOOTING.md`           | General troubleshooting guide      |

---

## ⚠️ Console Errors - Quick Guide

### ✅ IGNORE (Normal)

- `ERR_BLOCKED_BY_CLIENT` → Ad blocker (harmless)
- `Trying Helium/Oxygen server...` → Server fallback (normal)
- `Failed to fetch` WASM → Player initializing (wait)
- `404` on internal APIs → Vidking metadata (ignore)

### ❌ FIX (Critical)

- Invalid TMDB ID in your code
- Wrong content type (movie vs series)
- No sources after 15+ seconds

---

## 🔗 Quick Links

### Development

- **Local**: http://localhost:3000
- **Demo Page**: http://localhost:3000/video-demo
- **Shows**: http://localhost:3000/shows

### External Resources

- **TMDB**: https://www.themoviedb.org/
- **Vidking**: https://www.vidking.net/
- **Firebase Console**: https://console.firebase.google.com/

---

## 🎬 How Video Player Works

1. User clicks "Play"
2. VidkingPlayer loads with TMDB ID
3. Player tries multiple servers (Helium, Oxygen, etc.)
4. First working source is used
5. Progress is saved to Firestore + localStorage
6. Resume on next visit

**Expected Wait Time**: 5-15 seconds for first load

---

## 📊 Verified TMDB IDs (Quick Lookup)

| ID  | Title            | TMDB   | Type   |
| --- | ---------------- | ------ | ------ |
| 1   | Squid Game       | 93405  | series |
| 2   | Stranger Things  | 66732  | series |
| 3   | Wednesday        | 119051 | series |
| 4   | The Witcher      | 71912  | series |
| 5   | Money Heist      | 71446  | series |
| 6   | The Crown        | 46708  | series |
| 7   | Bridgerton       | 63247  | series |
| 8   | The Adam Project | 696806 | movie  |
| 9   | Glass Onion      | 661374 | movie  |
| 10  | Red Notice       | 512195 | movie  |

---

## 💡 Pro Tips

1. **Console errors are normal** - Focus on whether video plays
2. **Be patient** - Server selection takes time
3. **Check VERIFIED_TMDB_IDS.md** - Before adding content
4. **Don't disable ad blocker** - ERR_BLOCKED_BY_CLIENT is harmless
5. **Use verified IDs** - All current IDs are tested and working

---

## 🆘 Quick Troubleshooting

| Problem           | Solution                                       |
| ----------------- | ---------------------------------------------- |
| Video won't load  | Wait 15s, check TMDB ID is correct             |
| 404 error         | Verify TMDB ID exists at themoviedb.org        |
| No images         | Check TMDB CDN URLs in netflix-content.ts      |
| TypeScript errors | Run `npm run build` to check                   |
| Console spam      | Read CONSOLE_ERRORS_GUIDE.md - most are normal |

---

## 🎉 What's Working

✅ Homepage with real Netflix content  
✅ Real images from TMDB CDN  
✅ Video player with Vidking.net  
✅ Progress tracking (Firestore + localStorage)  
✅ Watchlist functionality  
✅ Season/episode navigation  
✅ Resume playback  
✅ Error handling

---

## 📝 Need More Info?

- **Video Player**: Read `VIDKING_INTEGRATION.md`
- **Console Errors**: Read `CONSOLE_ERRORS_GUIDE.md`
- **Add Content**: Read `HOW_TO_ADD_CONTENT.md`
- **Verification**: Read `TMDB_VERIFICATION_SUMMARY.md`

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Last Verified**: October 6, 2025
