import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  }, []);

  return (
    <div>
      <h1>Films populaires</h1>

      {!movies ? (
        <p>Chargement...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
