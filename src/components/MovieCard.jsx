import { Link } from "react-router";
import { useContext } from "react";
import { WishlistContext } from "../providers/WishlistProvider";
import { Heart, Star } from "lucide-react";

const MovieCard = ({ movie }) => {
  const IMG = import.meta.env.VITE_TMDB_IMG;
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  return (
    <div className="group animate-fadeIn overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-purple-500/20">
      <Link to={`/movie/${movie.id}`} className="relative block overflow-hidden">
        {movie.poster_path ? (
          <>
            <img
              src={`${IMG}${movie.poster_path}`}
              alt={movie.title}
              className="h-[340px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex h-[340px] w-full items-center justify-center bg-slate-800 text-slate-500">
            Pas d'image
          </div>
        )}
        
        {movie.vote_average > 0 && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-xs font-semibold text-yellow-400 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link 
          to={`/movie/${movie.id}`}
          className="block font-semibold text-slate-100 transition hover:text-purple-400"
        >
          <h3 className="line-clamp-2 text-base">{movie.title}</h3>
        </Link>

        <p className="mt-1 text-xs text-slate-400">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : '—'}
        </p>

        <button
          onClick={() => addToWishlist(movie)}
          disabled={isInWishlist(movie.id)}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            isInWishlist(movie.id)
              ? 'cursor-not-allowed bg-slate-700 text-slate-400'
              : 'bg-purple-600 text-white hover:bg-purple-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isInWishlist(movie.id) ? 'fill-current' : ''}`} />
          {isInWishlist(movie.id) ? "Dans la wishlist" : "Ajouter"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;