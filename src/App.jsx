import React, { useState } from "react";
import "./App.css"; // external CSS file

function App() {
  const [query, setQuery] = useState(""); // State to hold the search query
  const [movies, setMovies] = useState([]); // State to hold the movie search results
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error messages

  const searchMovies = async (query) => {
    if (!query) return; // Prevent empty search

    setLoading(true); // Set loading to true when starting the search
    setError(null); // Reset previous errors

    try {
      // Fetching data from OMDB API with the search query
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${query}`
      );
      const data = await response.json(); // Parse response data

      if (data.Response === "True") {
        setMovies(data.Search); // Update the state with search results
      } else {
        setError(data.Error); // Show any error returned by the OMDB API
        setMovies([]); // Clear the movie list if no results
      }
    } catch (err) {
      console.error("Error fetching movies:", err); // Log any errors
      setError("Error fetching movies"); // Display error message
      setMovies([]); // Clear the movie list if there was an error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="App">
      <h1 className="heading">Movie Search</h1>

      {/* Search input field */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update the query state
        placeholder="Search for a movie"
        className="search-input"
      />
      <button onClick={() => searchMovies(query)} className="search-button">
        Search
      </button>

      {/* Loading message */}
      {loading && <p className="loading-text">Loading...</p>}
      {/* Error message */}
      {error && <p className="error-text">{error}</p>}

      {/* Movie results */}
      <div className="movie-grid">
        {movies.length > 0 &&
          movies.map((movie) => {
            // Check if the movie has a poster
            if (movie.Poster === "N/A") {
              return (
                <div className="movie-card" key={movie.imdbID}>
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                  <p>No poster available</p>
                </div>
              );
            }

            return (
              <div className="movie-card" key={movie.imdbID}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="movie-image"
                />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
