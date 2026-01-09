import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import { WishlistContext } from "../providers/WishlistProvider";
import {Heart,Star,Calendar,Clock,ArrowLeft,Loader2,Users,Film,} from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    setLoading(true);
    setMovie(null);
    setCast(null);
    setSimilar(null);

    Promise.all([
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`).then(
        (r) => r.json()
      ),
      fetch(
        `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`
      ).then((r) => r.json()),
      fetch(
        `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR`
      ).then((r) => r.json()),
    ]).then(([movieData, creditsData, similarData]) => {
      setMovie(movieData);
      setCast(creditsData.cast);
      setSimilar(similarData.results);
      setLoading(false);
    });
  }, [id]);

  const IMG = import.meta.env.VITE_TMDB_IMG;

  if (loading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-purple-400" />
          <p className="mt-4 text-slate-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!movie || !cast) return null;

  const inWishlist = isInWishlist(movie.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-slate-400 transition hover:text-purple-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux films
      </Link>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
          <div className="relative">
            {movie.poster_path ? (
              <img
                src={`${IMG}${movie.poster_path}`}
                alt={movie.title}
                className="h-full w-full object-cover md:rounded-l-2xl"
              />
            ) : (
              <div className="flex h-full min-h-[450px] items-center justify-center bg-slate-800 text-slate-500">
                Pas d'image
              </div>
            )}
          </div>

          <div className="p-6 lg:p-8">
            <h1 className="mb-4 text-3xl font-bold text-slate-100 sm:text-4xl">
              {movie.title}
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              {movie.vote_average > 0 && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span className="font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-slate-500">/10</span>
                </div>
              )}

              {movie.release_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(movie.release_date).toLocaleDateString("fr-FR")}
                </div>
              )}

              {movie.runtime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {movie.runtime} min
                </div>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-purple-600/20 px-3 py-1 text-xs font-medium text-purple-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-slate-200">
                Synopsis
              </h2>
              <p className="leading-relaxed text-slate-300">
                {movie.overview || "Pas de description disponible."}
              </p>
            </div>

            <button
              onClick={() => {
                inWishlist ? removeFromWishlist(movie.id) : addToWishlist(movie);
              }}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition ${
                inWishlist
                  ? "bg-rose-600 text-white hover:bg-rose-500"
                  : "bg-purple-600 text-white hover:bg-purple-500"
              }`}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              {inWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Cast */}
      <div className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-slate-100">
            Acteurs principaux
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cast.slice(0, 8).map((actor) => (
            <div
              key={actor.cast_id || actor.credit_id}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-purple-500/50"
            >
              {actor.profile_path ? (
                <img
                  src={`${IMG}${actor.profile_path}`}
                  alt={actor.name}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-56 w-full items-center justify-center bg-slate-800 text-slate-500">
                  Pas d'image
                </div>
              )}

              <div className="p-4">
                <p className="font-semibold text-slate-100">{actor.name}</p>
                <p className="mt-1 text-sm text-slate-400">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <Film className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-slate-100">Films similaires</h2>
        </div>

        {!similar ? (
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Chargement...
          </div>
        ) : similar.length === 0 ? (
          <p className="text-slate-400">Aucun film similaire trouvé.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {similar.slice(0, 8).map((m) => (
              <Link
                key={m.id}
                to={`/movie/${m.id}`}
                className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-black/10 backdrop-blur-sm transition hover:border-purple-500/50"
              >
                {m.poster_path ? (
                  <img
                    src={`${IMG}${m.poster_path}`}
                    alt={m.title}
                    className="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-64 w-full items-center justify-center bg-slate-800 text-slate-500">
                    Pas d'image
                  </div>
                )}

                <div className="p-4">
                  <p className="font-semibold text-slate-100 line-clamp-2">
                    {m.title}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                    <span>
                      ⭐ {m.vote_average?.toFixed?.(1) ?? "—"}
                      <span className="text-slate-500">/10</span>
                    </span>
                    <span>{m.release_date ? m.release_date.slice(0, 4) : "—"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
