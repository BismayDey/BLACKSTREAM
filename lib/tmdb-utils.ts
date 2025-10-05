/**
 * Utilities for validating and handling TMDB IDs
 */

/**
 * Validates if a TMDB ID is in the correct format
 */
export function isValidTmdbId(tmdbId: string | undefined): boolean {
  if (!tmdbId) return false;
  // TMDB IDs are numeric strings
  return /^\d+$/.test(tmdbId);
}

/**
 * Popular and verified TMDB IDs for testing
 */
export const VERIFIED_TMDB_IDS = {
  movies: {
    inception: "27205",
    darkKnight: "155",
    avengersEndgame: "299534",
    avengersInfinityWar: "299536",
    shawshankRedemption: "278",
    pulpFiction: "680",
    interstellar: "157336",
    theMatrix: "603",
    goodfellas: "769",
    fightClub: "550",
  },
  tv: {
    squidGame: "93405",
    breakingBad: "1396",
    gameOfThrones: "1399",
    wednesday: "119051",
    arcane: "94605",
    strangerThings: "66732",
    theLastOfUs: "100088",
    theBoys: "76479",
    witcher: "71912",
    mandalorean: "82856",
  },
};

/**
 * Get content type from TMDB (placeholder - would normally call TMDB API)
 */
export function getContentType(tmdbId: string): "movie" | "tv" | "unknown" {
  const movieIds = Object.values(VERIFIED_TMDB_IDS.movies);
  const tvIds = Object.values(VERIFIED_TMDB_IDS.tv);

  if (movieIds.includes(tmdbId)) return "movie";
  if (tvIds.includes(tmdbId)) return "tv";

  // Default heuristic: lower IDs are often movies
  const id = parseInt(tmdbId);
  if (id < 10000) return "movie";
  if (id > 50000) return "tv";

  return "unknown";
}

/**
 * Sanitize TMDB ID input
 */
export function sanitizeTmdbId(input: string): string {
  // Remove any non-numeric characters
  return input.replace(/\D/g, "");
}

/**
 * Check if a TMDB ID is in the verified list
 */
export function isVerifiedTmdbId(tmdbId: string): boolean {
  const allIds = [
    ...Object.values(VERIFIED_TMDB_IDS.movies),
    ...Object.values(VERIFIED_TMDB_IDS.tv),
  ];
  return allIds.includes(tmdbId);
}

/**
 * Get suggestions for invalid TMDB IDs
 */
export function getSuggestions(type: "movie" | "tv"): string[] {
  if (type === "movie") {
    return Object.values(VERIFIED_TMDB_IDS.movies).slice(0, 5);
  }
  return Object.values(VERIFIED_TMDB_IDS.tv).slice(0, 5);
}
