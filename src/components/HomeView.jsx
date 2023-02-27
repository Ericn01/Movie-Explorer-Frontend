import { useState } from 'react';
import { Link } from 'react-router-dom';
// Component for the home view - this one is the simplest by FAR
const HomeView = ({movieData, setParentMovieMatches}) => {
    // Home View Movie Search Matches
    const [movieNameInput, setMovieNameInput] = useState(""); // The Home view name input
    // Function to find movie matches -> sets up state to change the value of movie matches
    function findMovieMatches(e){
        const buttonId = e.target.id;
        if (buttonId === 'matching'){
            const matchingMovies = movieData.filter( (movie) => String(movie.title).toLowerCase().includes(movieNameInput.toLowerCase())); // Returns all the matching movies as an array of objects
            setParentMovieMatches(matchingMovies);
        }
        else {
            setParentMovieMatches(movieData);
        }
    }
    return (
        <section className="flex justify-center items-center h-screen bg-blue-200">
            <div className="border-2 border-black p-10 rounded-xl drop-shadow-xl h-min bg-slate-200 bg-gradient-to-r from-orange-300 to-red-400">
                <h3 className="font-medium text-xl text-center"> Movie Browser </h3>
                <div className="flex-auto my-5"> 
                    <label htmlFor="movie-input"> Title </label>
                    <input type="text" id="movie-input" name="movie-input" autoComplete='false' placeholder="Search A Movie..." className="m-5 border-2 border-black rounded-xl p-0.5" onChange={(e) => setMovieNameInput(e.target.value)}></input>
                </div>
                <div className="flex-auto my-5 justify-items-evenly"> 
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-xl" id="matching" onClick={findMovieMatches}> <Link to="/default"> Find Matching Movies </Link> </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-xl" id='all' onClick={findMovieMatches}> <Link to="/default"> Show All Movies </Link> </button>
                </div>
            </div>
        </section>
    );
}

export default HomeView
