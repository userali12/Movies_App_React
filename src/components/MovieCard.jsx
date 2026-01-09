import { Link } from "react-router";

const MovieCard = ({ movie }) => {
  const IMG = import.meta.env.VITE_TMDB_IMG;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      {movie.poster_path && (
        <img
          src={`${IMG}${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "100%", borderRadius: 8 }}
        />
      )}

      <h3 style={{ marginTop: 10 }}>{movie.title}</h3>

      <Link to={`/movie/${movie.id}`}>Détails</Link>
    </div>
  );
};

export default MovieCard;
