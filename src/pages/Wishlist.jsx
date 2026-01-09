import { useContext, useState } from "react";
import { Link } from "react-router";
import { WishlistContext } from "../providers/WishlistProvider";
import { Search, Star, Trash2 } from "lucide-react";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState("");
  const IMG = import.meta.env.VITE_TMDB_IMG;

  const filteredWishlist = wishlist.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-slate-100 sm:text-4xl">
          🎬 Ma Liste de Souhaits
        </h1>
        <p className="mt-2 text-slate-400">
          {wishlist.length} {wishlist.length > 1 ? "films" : "film"} dans ta wishlist
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
          <p className="mb-4 text-lg">Ta wishlist est vide.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-500"
          >
            Découvrir des films
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher dans ma wishlist..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-slate-100 placeholder-slate-400 backdrop-blur-sm transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            
            {searchQuery && (
              <p className="mt-3 text-center text-sm text-slate-400">
                {filteredWishlist.length} résultat{filteredWishlist.length > 1 ? "s" : ""} pour "
                <span className="text-purple-400">{searchQuery}</span>"
              </p>
            )}
          </div>

          {filteredWishlist.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-slate-400">Aucun film trouvé dans ta wishlist</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredWishlist.map((movie) => (
                <div
                  key={movie.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition-all hover:scale-105 hover:border-purple-500/50"
                >
                  <Link to={`/movie/${movie.id}`} className="block">
                    {movie.poster_path ? (
                      <img
                        src={`${IMG}${movie.poster_path}`}
                        alt={movie.title}
                        className="h-[360px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-[360px] w-full items-center justify-center bg-white/5 text-slate-400">
                        Pas d'affiche
                      </div>
                    )}
                  </Link>

                  <div className="p-4">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="block font-semibold text-slate-100 transition hover:text-purple-400"
                    >
                      <h3 className="line-clamp-2">{movie.title}</h3>
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm text-slate-300">
                      {movie.overview || "Pas de description."}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                      {movie.vote_average > 0 && (
                        <span className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-4 w-4 fill-yellow-400" />
                          {movie.vote_average.toFixed(1)}/10
                        </span>
                      )}
                      <span className="text-slate-400">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : "—"}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(movie.id)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-rose-500/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Wishlist;