import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Film, Loader2 } from "lucide-react";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    setLoading(true);
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="mb-10 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <Film className="h-10 w-10 text-purple-400" />
          <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl">
            Films <span className="text-purple-400">Populaires</span>
          </h1>
        </div>
        <p className="text-lg text-slate-400">
          Découvre les films les plus populaires du moment
        </p>
      </div>

      {/* Contenu */}
      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-purple-400" />
            <p className="mt-4 text-slate-400">Chargement des films...</p>
          </div>
        </div>
      ) : movies && movies.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-slate-400">Aucun film trouvé</p>
        </div>
      )}
    </div>
  );
};

export default Home;