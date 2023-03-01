import React, { useEffect, useState } from 'react';
import DefaultView from './components/DefaultView';
import HomeView from './components/HomeView';
import DetailView from './components/DetailView';
import { Route, Routes } from 'react-router-dom';

// Application component
function App() {
  const [movies, setMovies] = useState(null);
  // Movie matches setup
  const [movieMatches, setMovieMatches] = useState([]);
  // Setting up a callback function to retrieve matches from the home view.
  function setMatches (matches) {
    setMovieMatches(matches);
  }
  // Favorite Movies set up
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  // Function/logic to add a favorite movie
  function addFavoriteMovie(movie){
    if (favoriteMovies.includes(movie)){
      alert('This movie has already been favorited!');
    }
    else {
      setFavoriteMovies([...favoriteMovies, movie]); // add the newest movie to favorite movies list 
    }
  }
  function removeFavoriteMovie(movieId){
    const removeMovieIndex = favoriteMovies.findIndex( (favoriteMovie) => favoriteMovie.id === movieId);
    removeMovieIndex === 0 ? favoriteMovies.shift() : favoriteMovies.splice(removeMovieIndex, removeMovieIndex);
    setFavoriteMovies([...favoriteMovies]);
  }
  // Movie Details click setup (must stored the movie in state)
  const [movieDetails, setMovieDetails] = useState(null); // set it up as nothing for now
  function requestMovieDetails(movie) {
    setMovieDetails(movie);
  }
  // Genres list setup
  const [genres, setGenres] = useState(JSON.parse(localStorage.getItem("genres")));
  function getGenresList(movies){
    let genres = new Map();
    movies.map((m) => { 
      const genreObject = m.details.genres;
      if (genreObject !== null){
        genreObject.forEach( (genreEntry) => {
          const genreIsSet = genres.has(genreEntry.id);
          genreIsSet === false ? genres.set(genreEntry.id, genreEntry.name) : ""}
          )
      }
    });
    setGenres(Object.fromEntries(genres));
    localStorage.setItem("genres", JSON.stringify(Object.fromEntries(genres)));
  }
  // Data endpoint URL
  const movieDataURL = "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=200";
  // Check the movie data 
  useEffect( () => 
    {
      async function getMovieData() {
        const request = await fetch(movieDataURL);
        const data = await request.json();
        setMovies(data);
        localStorage.setItem("movieData", JSON.stringify(data));
      }
      const movieData = localStorage.getItem("movieData");
      movieData === null ? getMovieData() : setMovies(JSON.parse(movieData)); // local storage existence vs not existing
      genres === undefined ? getGenresList(movies) : getGenresList(JSON.parse(movieData)); 
    }, []);
  return (
  <main>
    <Routes>
      <Route path="/" element={<HomeView movieData={movies} setParentMovieMatches={setMatches}/>} />
      <Route path="/default" element={<DefaultView homeMatches={movieMatches} favorites={favoriteMovies} addFavorite={addFavoriteMovie} movieDetails={requestMovieDetails} genres={genres} setParentMovieMatches={setMatches} movieData={movies} removeFavoriteMovie={removeFavoriteMovie}/>} />
      <Route path="/details" element={<DetailView movieRequest={movieDetails} addFavorite={addFavoriteMovie} favorites={favoriteMovies}/>} />
    </Routes>
  </main>);
};

export default App;
