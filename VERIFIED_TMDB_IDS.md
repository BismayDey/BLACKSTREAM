# Verified TMDB IDs

This document contains all verified TMDB IDs used in the BLACKSTREAM platform. All IDs have been confirmed to exist on The Movie Database (TMDB).

## TV Series

| ID  | Title                          | TMDB ID | Status      | Verified Date |
| --- | ------------------------------ | ------- | ----------- | ------------- |
| 1   | Squid Game                     | 93405   | ✅ Verified | Oct 2025      |
| 2   | Stranger Things                | 66732   | ✅ Verified | Oct 2025      |
| 3   | Wednesday                      | 119051  | ✅ Verified | Oct 2025      |
| 4   | The Witcher                    | 71912   | ✅ Verified | Oct 2025      |
| 5   | Money Heist (La Casa de Papel) | 71446   | ✅ Verified | Oct 2025      |
| 6   | The Crown                      | 46708   | ✅ Verified | Oct 2025      |
| 7   | Bridgerton                     | 63247   | ✅ Verified | Oct 2025      |

## Movies

| ID  | Title                             | TMDB ID | Status      | Verified Date |
| --- | --------------------------------- | ------- | ----------- | ------------- |
| 8   | The Adam Project                  | 696806  | ✅ Verified | Oct 2025      |
| 9   | Glass Onion: A Knives Out Mystery | 661374  | ✅ Verified | Oct 2025      |
| 10  | Red Notice                        | 512195  | ✅ Verified | Oct 2025      |

## How to Verify TMDB IDs

1. Go to https://www.themoviedb.org/
2. Search for the title
3. Check the URL: `https://www.themoviedb.org/tv/[TMDB_ID]` or `https://www.themoviedb.org/movie/[TMDB_ID]`
4. Verify the ID matches

## Common Mistakes Fixed

- **The Crown**: Was using `1399` (Game of Thrones ID) → Fixed to `46708`
- **Bridgerton**: Was using `100088` → Fixed to `63247`
- **Glass Onion**: Was using `620249` → Fixed to `661374`

## Vidking.net Compatibility

All these TMDB IDs are compatible with Vidking.net's streaming service. The player will:

1. Fetch content using the TMDB ID
2. Try multiple servers (Helium, Oxygen, etc.) to find working sources
3. Display error messages in console (these are normal during server selection)

### Expected Console Messages (Normal Behavior)

- ✅ "Trying Helium server for TV show..." - Normal fallback mechanism
- ✅ "Trying Oxygen server for TV show..." - Normal fallback mechanism
- ✅ `ERR_BLOCKED_BY_CLIENT` - Ad blocker blocking analytics (doesn't affect playback)
- ⚠️ 404 errors for internal TMDB lookups - Vidking's internal database, not critical

## Adding New Content

When adding new shows/movies:

1. Verify TMDB ID exists at themoviedb.org
2. Add to `lib/netflix-content.ts` with correct type ("series" or "movie")
3. Test in Vidking.net player
4. Update this document
