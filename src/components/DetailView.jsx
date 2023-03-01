import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header  from './Header';

const DetailView = ({movieRequest, favorites, addFavorite}) => {
    const backdropURL = `https://image.tmdb.org/t/p/original${movieRequest.backdrop}`;
    if (movieRequest !== null) {
        return (
        <div>
            <Header />
            <section className={`flex bg-cover bg-no-repeat bg-[url(${backdropURL})] items-center m-10`}>
                <PosterImage posterPath={movieRequest.poster} />
                <MovieDetails movieData={movieRequest}/>
                <div>
                    <PerformanceDetails movieData={movieRequest} />
                    <br />
                    <ActionButtons movieData={movieRequest} addFavorite={addFavorite} favoriteMovies={favorites} />
                </div>
                <UserRating />
            </section>
        </div>
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
        <div className="cursor-pointer hover:shadow-xl h-max basis-1/5">
            <img className="min-w-full rounded-lg" src={largePosterImage} alt="Movie Poster" draggable="false" onClick={handleImageClick} />
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
        <div className="mx-8 basis-1/3 rounded-lg overflow-hidden shadow-lg p-5 bg-slate-100 border-2 border-gray-200 hover:bg-slate-200 hover:border-gray-300">
            <HeaderDetails movieData={movieData} />
            <OtherDetails movieData={movieData} />
        </div>
    )
}
const HeaderDetails = ({movieData}) => {
    return(
        <div>
            <h2 className="text-2xl font-bold"> {movieData.title} ({movieData.release_date.substring(0,4)})</h2>
            <ul className="flex list-none justify-start items-center"> 
                <li className='my-4 text-sm font-semibold tracking-wide'> {movieData.release_date.replaceAll("-", "/")} </li>
                {movieData.details.genres.map((genreObj) => <li className="ml-3 inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600 h-min" key={genreObj.id}>
                    {genreObj.name} 
                </li>)}
                <li className="ml-3 my-4 text-sm font-semibold tracking-wide"> {minutesToHours(movieData.runtime)} </li>
            </ul>
        </div>
    );
}
const OtherDetails = ({movieData}) => {
    return (
        <div>
            <h3 className="text-lg italic pb-2 text-gray-900"> {movieData.tagline} </h3>
            <div> 
                <h3> Find More Information At: </h3>
                <div className="flex my-3"> 
                    <a href={`https://www.imdb.com/title/${movieData.imdb_id}`} className="text-blue-600 hover:cursor-pointer hover:underline"> IMDB </a>
                    <a href={`https://www.themoviedb.org/movie/${movieData.tmdb_id}`} className="ml-5 text-blue-600 hover:cursor-pointer hover:underline"> TMDB </a>
                </div>
            </div>
            <div> 
                <h3 className={"text-lg font-semibold mb-2"}> Description </h3>
                <p className='text-md'> {movieData.details.overview} </p>
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
        <div className='basis-1/3 rounded-lg overflow-hidden shadow-lg p-5 bg-slate-100 border-2 border-gray-200 hover:bg-slate-200 hover:border-gray-300 mr-10'> 
            <h3 className='text-xl font-semibold '> Performance Details </h3>
            <article>
                <p className='py-2'> Revenue: {movieRevenue}</p>
                <p className='py-2'> Average Rating: {ratingDetails.average}</p>
                <p className='py-2'> Number of ratings: {ratingDetails.count} </p>
                <p className='py-2'> Popularity: {Math.round(ratingDetails.popularity, 1)}%</p>  
            </article>     
        </div>
    );
}
/**
 * Container that allows the user to add a song to favorites, or close out of the detail view.
 * @param {*} param0 
 * @returns 
 */
const ActionButtons = ({favoriteMovies, addFavorite, movieData}) => {
    const isFavoriteMovie = favoriteMovies.includes(movieData);
    if (!isFavoriteMovie){
        return (
            <div className='flex justify-start mt-3'>
                <button className="w-[140px] text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-blue-500 hover:bg-blue-700" onClick={() => addFavorite(movieData)}> Add To Favorites </button>
                <Link to="/default"> <button className='w-[80px] ml-5 text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-red-500 hover:bg-red-700'> Close  </button> </Link>
            </div> 
        );
    } else{
        return (
            <div className='flex justify-start mt-3'>
                <button className="w-[140px] text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-blue-400 opacity-50 line-through" onClick={() => addFavorite(movieData)} disabled={true} title="Already Favorited" > Add To Favorites </button>
                <Link to="/default"> <button className='w-[80px] ml-5 text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-red-400 hover:bg-red-600'> Close  </button> </Link>
            </div> 
        );
    }
}

const UserRating = () => {
    const [userRating, setUserRating] = useState(new Array(10).fill(0));
    function setRating(e){
        const inputValue = Number(e.target.value);
        const rating = inputValue != "" ? Number(e.target.value) : 0;
        setUserRating(rating);
    }
    function applyRating (){

    }
    return (
        <section className='basis-1/6 rounded-lg overflow-hidden shadow-lg p-5 bg-slate-100 border-2 border-gray-200 hover:bg-slate-200 hover:border-gray-300'>
            <div className='flex'>
                <h2 className='tracking-tight font-semibold'> User Rating: </h2>
                <input className={"w-[75px] h-[25px] ml-3 border border-gray-500 px-3 py-1 rounded-lg shadow-md focus:outline-none focus:border-orange-400 mb-3"} type="number" max={10} min={0} onChange={setRating} placeholder={`${Math.ceil(Math.random() * 10)}.${Math.round(Math.random() * 10),0}`} />
            </div>
            <div className='flex justify-start mt-2 mb-5'>
                <button className='w-[50%] text-white font-semibold flex justify-center p-2 border rounded-md shadow-sm text-sm bg-violet-600 hover:bg-violet-800' onClick={() => setRating()}> Change Rating </button>
            </div>
            <div className="flex">
                {userRating.map((indexRating, index) => <StarImage key={index} imageIndex={index} indexRating={indexRating} />)}
            </div>
        </section>
    )
}
const StarImage =  ({indexRating}) => {
    return (
        <img className="hover:cursor-pointer" src={`images/star-${indexRating}.svg`} width={"26px"} draggable={false}/>
    )
}

function makeArrayBasedOnRating(rating){
    const baseArray = new Array(10).fill(0);
    for (let i = 0; i < rating; i++){
        baseArray[i] = 1;
    }
    return baseArray;
}
function minutesToHours(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
return `${hours}h ${minutes}m`
}
export default DetailView;