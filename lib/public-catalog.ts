import { movieCatalog, type Movie } from "@/lib/catalog";

// A movie is never public merely because metadata or a URL exists.
// Add an id here only after Cineyah has verified real playback on supported
// desktop browsers and iPhone/Safari with the exact published source.
const verifiedPlayableMovieIds = new Set<string>([
  "pendatang-2023",
  // GENERATED VERIFIED START
  // GENERATED VERIFIED END
]);

function isRealArtwork(value?: string) {
  if (!value) return false;
  const asset = value.trim().toLowerCase();
  if (!asset) return false;
  if (asset.startsWith("data:")) return false;
  if (asset.includes("placeholder")) return false;
  return asset.startsWith("/") || asset.startsWith("https://") || asset.startsWith("http://");
}

export function isPublicMovie(movie: Movie) {
  return movie.runtimeMinutes >= 60
    && verifiedPlayableMovieIds.has(movie.id)
    && movie.sources.length > 0
    && isRealArtwork(movie.poster)
    && isRealArtwork(movie.backdrop);
}

export const publicMovies = movieCatalog.filter(isPublicMovie);
export const playableMovies = publicMovies;
export const discoverableMovies = publicMovies;

function recommendationScore(source: Movie, candidate: Movie) {
  const sharedGenres = candidate.genres.filter(genre => source.genres.includes(genre)).length;
  const sameLanguage = candidate.languageEn === source.languageEn ? 1 : 0;
  const yearGap = Math.abs(candidate.year - source.year);
  return sharedGenres * 10 + sameLanguage * 4 + Math.max(0, 5 - Math.floor(yearGap / 10));
}

export function getSimilarMovies(movie: Movie, limit = 6) {
  return publicMovies
    .filter(candidate => candidate.id !== movie.id)
    .map(candidate => ({ candidate, score: recommendationScore(movie, candidate) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score
      || Math.abs(a.candidate.year - movie.year) - Math.abs(b.candidate.year - movie.year)
      || a.candidate.titleEn.localeCompare(b.candidate.titleEn))
    .slice(0, limit)
    .map(item => item.candidate);
}

export function getYouMayAlsoLike(movie: Movie, limit = 6) {
  const similarIds = new Set(getSimilarMovies(movie, limit).map(item => item.id));
  const pool = publicMovies.filter(candidate => candidate.id !== movie.id && !similarIds.has(candidate.id));
  const seed = [...movie.id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return [...pool]
    .sort((a, b) => ((a.year + seed) % 97) - ((b.year + seed) % 97) || a.titleEn.localeCompare(b.titleEn))
    .slice(0, limit);
}
