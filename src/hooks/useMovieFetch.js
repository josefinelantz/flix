import { useState, useEffect } from "react";
import API from "../API";

export const useMovieFetch = movieId => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Only fetch data once
  useEffect(() => {
    // Arrow function to wrap async call
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        // Fetch movie
        const movie = await API.fetchMovie(movieId);
        // Fetch credits
        const credits = await API.fetchCredits(movieId);
        // Get directors only
        const directors = credits.crew.filter(
          member => member.job === "Director"
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors
        });

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchMovie();
  }, [movieId]);

  return { state, loading, error };
};