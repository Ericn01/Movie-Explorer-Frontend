import { useState } from 'react';
import { Link } from 'react-router-dom';
const DetailView = ({movieRequest, favorites, addFavorite}) => {
    if (movieRequest !== null) {
        return (
            <section className="flex justify-evenly">
                <PosterImage posterPath={movieRequest.poster} />
                <MovieDetails movieData={movieRequest}/>
                <div>
                    <PerformanceDetails movieData={movieRequest} />
                    <br />
                    <ActionButtons movieData={movieRequest} addFavorite={addFavorite} favoriteMovies={favorites} />
                </div>
                <UserRating />
            </section>
        )
    }
    else {
        return <h1>Empty Movie Detail Section (Nullish Selection)</h1>
    }
}

const PosterImage = ({posterPath}) => {
    const largePosterImage = `https://image.tmdb.org/t/p/w500${posterPath}`;
    function handleImageClick(){
        alert("image click");
    }
    return (
        <div className="drop-shadow-2xl cursor-pointer hover:shadow-xl">
            <img src={largePosterImage} alt="Movie Poster" width={"350px"} draggable="false" onClick={handleImageClick} />
        </div>
    );
}
/**
 * Creates and returns a div containing the general movie data.
 * @param {Object} movieData the movie that has been requested by the suer
 * @returns performance details card
 */
const MovieDetails = ({movieData}) => {
    return (
        <div className="px-5 py-3">
            <h2 className="text-3xl font-bold pb-3"> {movieData.title} ({movieData.release_date.substring(0,4)})</h2>
            <h3 className="text-xl italic pb-2"> {movieData.tagline} </h3>
            <ul className="flex list-none justify-start"> 
                <li> {movieData.release_date} </li>
                {movieData.details.genres.map((genreObj) => <li key={genreObj.id} className="ml-3">
                    {genreObj.name} 
                </li>)}
                <li className="ml-3"> {movieData.runtime} Minutes </li>
            </ul>
            <div> 
                <h3> Find More Information At: </h3>
                <div className="flex"> 
                    <a href={`https://www.imdb.com/title/${movieData.imdb_id}`} className="text-blue-600 hover:cursor-pointer hover:underline"> IMDB </a>
                    <a href={`https://www.themoviedb.org/movie/${movieData.tmdb_id}`} className="ml-5 text-blue-600 hover:cursor-pointer hover:underline"> TMDB </a>
                </div>
            </div>
            <div> 
                <h3> Description </h3>
                <p> {movieData.details.overview} </p>
            </div>
        </div>
    )
}
/**
 * Creates and returns a div containing the performance data from the requested movie
 * @param {Object} movieData the movie that has been requested by the suer
 * @returns performance details card
 */
const PerformanceDetails = ({movieData}) => {
    const ratingDetails = movieData.ratings;
    const movieRevenue = new Intl.NumberFormat('en-us', {style: 'currency', currency: "USD"}).format(movieData.revenue);
    return (
        <div> 
            <h3> Movie Performance </h3>
            <article>
                <p> Revenue: {movieRevenue}</p>
                <p> Average Rating: {ratingDetails.average}</p>
                <p> Number of ratings: {ratingDetails.count} </p>
                <p> Popularity: {Math.round(ratingDetails.popularity, 1)}%</p>  
            </article>     
        </div>
    )
}
/**
 * Container that allows the user to add a song to favorites, or close out of the detail view.
 * @param {*} param0 
 * @returns 
 */
const ActionButtons = ({favoriteMovies, addFavorite, movieData}) => {
    const isFavoriteMovie = favoriteMovies.includes(movieData);
    return (
        <div className="">
            <button onClick={() => addFavorite(movieData)} disabled={isFavoriteMovie}> Add To Favorites </button>
            <button> <Link to="/default"> Close </Link> </button>
        </div>
    );
}

const UserRating = () => {
    const [userRating, setUserRating] = useState(new Array(10).fill(0));
    function setRating(rating){

    }
    return (
        <section>
            <h2> User Rating: </h2>
            <div>
                <input type="number" value={0} max={10} min={0}/>
                <button onClick={() => setRating()}> Change Rating </button>
            </div>
            <div className="flex">
                {userRating.map((indexRating, index) => <StarImage key={index} imageIndex={index} indexRating={indexRating} setRatingBasedOnIndex={setRatingBasedOnIndex}/>)}
            </div>
        </section>
    )
}
const StarImage =  ({indexRating}) => {
    return (
        <img className="hover:cursor-pointer" src={`src/assets/star-${indexRating}.svg`} width={"26px"} draggable={false}/>
    )
}

function makeArrayBasedOnRating(rating){
    const baseArray = new Array(10).fill(0);
    for (let i = 0; i < rating; i++){
        baseArray[i] = 1;
    }
    return baseArray;
}

export default DetailView;