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
        <section className="flex justify-center items-center h-screen bg-[url('src/assets/hero-img.jpg')]">
            <div className="border-2 border-black p-10 rounded-xl drop-shadow-xl h-min bg-slate-200 bg-gradient-to-r from-orange-300 to-red-400">
                <h3 className="font-medium text-xl text-center"> Movie Browser </h3>
                <div className="flex-auto my-5"> 
                    <label htmlFor="movie-input" className='block mb-2 text-md font-medium'> Movie Title </label>
                    <input type="text" id="movie-input" name="movie-input" autoComplete='false' placeholder="Search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " onChange={(e) => setMovieNameInput(e.target.value)}></input>
                </div>
                <div className="flex-auto my-5 justify-items-evenly"> 
                    <button className="rounded-lg relative justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 border-green-600 shadow-lg bg-green-500  text-white font-semibold hover:bg-green-600 hover:border-green-700" onClick={findMovieMatches}> <Link to="/default"> Find Matching Movies </Link> </button>
                    <button className="rounded-lg relative justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 border-violet-600 shadow-lg bg-violet-500  text-white font-semibold hover:bg-violet-600 hover:border-violet-700 " id='all' onClick={findMovieMatches}> <Link to="/default"> Show All Movies </Link> </button>
                </div>
            </div>
        </section>
    );
}

export default HomeView
