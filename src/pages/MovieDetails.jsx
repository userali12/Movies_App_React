import { useEffect, useState } from "react";
import { useParams } from "react-router";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setMovie(data));

    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setCast(data.cast));
  }, [id]);

  if (!movie || !cast) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview || "Pas de description."}</p>

      <h2>Acteurs principaux</h2>
      <ul>
        {cast.slice(0, 8).map((actor) => (
          <li key={actor.cast_id || actor.credit_id}>
            {actor.name} — {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;
