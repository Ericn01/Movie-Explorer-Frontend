import { useState } from 'react';
import { Link } from 'react-router-dom';
const DefaultView = ({homeMatches, favorites, addFavorite, movieDetails, genres, setParentMovieMatches, movieData, removeFavoriteMovie}) => {
    const [filterIsShown, setFilterIsShown] = useState(true);
    const [favoritesIsShown, setFavoriteIsShown] = useState(true);
    function setSectionDisplay(sectionName){
        sectionName === 'filter' ? setFilterIsShown(!filterIsShown) : setFavoriteIsShown(!favoritesIsShown);
    }
    return (
        <section className="flex justify-around mt-10">
            <MovieFilter genresList={genres} movieData={movieData} setFilterResults={setParentMovieMatches} filterIsShown={filterIsShown}/>
            <ShowSection initialDireciton={'left'} section={"filter"} setSectionDisplay={setSectionDisplay} />
            <MovieMatches matches={homeMatches} favoriteMovies={favorites} addFavorite={addFavorite} setMovieDetails={movieDetails} setSortedMatches={setParentMovieMatches} />
            <ShowSection initialDireciton={'right'} section={'favorites'} setSectionDisplay={setSectionDisplay} />
            <Favorites favoriteMovies={favorites} removeFavoriteMovie={removeFavoriteMovie} favoritesIsShown={favoritesIsShown}/>
        </section>
    );
}

// -------------------------------------------------------------- FILTERS SECTION ---------------------------------------------------------------------------------------------
const MovieFilter = ({genresList, movieData, setFilterResults, filterIsShown}) => {
        const [checkedFilter, setCheckedFilter] = useState("");
        const [lessGreaterFilter, setLessGreaterFilter] = useState(""); // Holds the radio values for the less and greater than buttons
        const [formData, setFormData] = useState({
            title: "",
            genre: "",
            yearLess: "",
            yearGreater: "",
            ratingLess: "",
            ratingGreater: ""
        });
        const displayState = filterIsShown ? "block" : "hidden";
        const checkRadio = (e) => {setCheckedFilter(e.target.value)};
        const lessGreaterFilterSelection = (e) => {const selection = e.target.value;
                                                    setLessGreaterFilter(selection);}
        function handleFormChange(e){
            const {value, name} = e.target;
            setFormData((state) => ({
                ...state,
                [name]: value
            }));
        }
        function filterMovies(){
            let queryMatches = [];
            if (checkedFilter === 'title' || checkedFilter === 'genre'){
                const [searchKey, searchValue] = Object.entries(formData).find((formEntry) => formEntry[0].toLowerCase() === checkedFilter.toLowerCase());
                switch(searchKey){
                    case "title":
                        queryMatches = movieData.filter ((m) => String(m.title).toLowerCase().includes(String(searchValue)));
                        break;
                    case "genre":
                        movieData.forEach((m) => {
                            const movieGenresArr = m.details.genres; // Array Containing the movie genre objects
                            if (movieGenresArr !== null){
                                for (let i = 0;  i < movieGenresArr.length; i++){
                                    if (Number(movieGenresArr[i].id) === Number(searchValue)){
                                        queryMatches.push(m);
                                        break;
                                    }; 
                                }
                            } 
                        });
                        break;
                    default:
                }
            }
            else if (checkedFilter === 'year'){
                if (lessGreaterFilter === 'year-greater-select'){
                    queryMatches = movieData.filter( (m) => Number(m.release_date.substring(0,4)) > Number(formData.yearGreater));
                }else if (lessGreaterFilter === 'year-less-select'){
                    queryMatches = movieData.filter( (m) => Number(m.release_date.substring(0, 4)) < Number(formData.yearLess));
                } 
                else {alert("Please select either 'greater' or 'less' for the year selection")}
            }
            else if (checkedFilter === 'rating'){
                if (lessGreaterFilter === 'rating-greater-select'){
                    queryMatches = movieData.filter( (m) => Number(m.ratings.average) > Number(formData.ratingGreater) );
                }  else if (lessGreaterFilter === 'rating-less-select'){
                    queryMatches = movieData.filter( (m) => Number(m.ratings.average) < Number(formData.ratingLess) );
                }
            }
            else{
                alert("Please check a filter to begin!");
            }
            setFilterResults(queryMatches);
        }
        return (
            <section className={`bg-gray-200 h-min py-5 shadow-lg rounded-lg sm:px-12 ${displayState}`}>
                <h2 className="mt-1 text-lg font-semibold"> Movie Filters </h2>
                <TitleFilterContainer name={"title"} checkRadio={checkRadio}  checkInputData={handleFormChange} formData={formData} />
                <GenreFilterContainer name={"genre"} checkRadio={checkRadio} checkInputData={handleFormChange} genresList={genresList} formData={formData}/>
                <DoubleValueFilterContainer  name={"year"}  checkRadio={checkRadio} checkInputData={handleFormChange} formData={formData} setSubFilter={lessGreaterFilterSelection}/> 
                <DoubleValueFilterContainer name={"rating"} checkRadio={checkRadio} checkInputData={handleFormChange} formData={formData} setSubFilter={lessGreaterFilterSelection}/>
                <div className="w-full flex justify-between mt-4"> 
                    <button className="w-[85%] text-white font-medium flex justify-center p-2 border rounded-md shadow-sm text-sm bg-violet-500 hover:bg-violet-700" onClick={filterMovies}> Filter </button>
                    <button className="w-[85%] text-white font-medium flex justify-center p-2 border  rounded-md shadow-sm text-sm bg-red-500 hover:bg-red-700" onClick={() => setFormData({title: "",genre: "",yearLess: "",yearGreater: "",ratingLess: "",ratingGreater: ""})} > Clear </button>
                </div>
            </section>
        )
}
// Creating Containers For Every Filter Type
// 1. Title filter container (text input)
const TitleFilterContainer = (props) => {
    return (
        <div className="my-8">
            <input type="radio" value={props.name} name="filter-select" onChange={props.checkRadio} />
            <label htmlFor={`${props.name}-input`} className="text-sm font-medium text-gray-800 uppercase"> {props.name} </label>
            <input type="text" className={"w-[200px] border border-gray-500 px-3 py-1 rounded-lg shadow-md focus:outline-none focus:border-orange-400"} onChange={props.checkInputData} name={props.name} value={props.formData.title}/>
        </div>
    );
}
// 2. Genre filter container (select input)
const GenreFilterContainer = (props) => {
    const genreEntries = Object.entries(props.genresList);
    return (
        <div className="my-8">
            <input type="radio" value={props.name} name="filter-select" onChange={props.checkRadio}/>
            <label htmlFor={`${props.name}-input`} className="text-sm font-medium text-gray-800 uppercase"> {props.name} </label>
            <select type="text" className={"w-[200px] border border-gray-500 px-3 py-1 rounded-lg shadow-md focus:outline-none focus:border-orange-400"} onChange={props.checkInputData} name={props.name} value={props.formData.genre}>
                {genreEntries.map( (genreObj) => <option key={genreObj[0]} value={genreObj[0]}> {genreObj[1]} </option>)}
            </select>
        </div>
        );
}
// 3. Filters containing two inputs
const DoubleValueFilterContainer = (props) => {
    const inputName = props.name;
    const isYearInput = inputName === 'year';
    return (
            <div className="my-8">
                <input type="radio" name="filter-select" value={inputName} onChange={props.checkRadio}/>
                <span className="text-sm font-medium text-gray-800 uppercase"> {inputName} </span>
                <aside className="ml-10">
                    <div className='flex mt-3'>
                        <input type="radio" value={isYearInput ?"year-less-select" : "rating-less-select"} name={isYearInput ?"year-less-greater-select" : "rating-less-greater-select"} onChange={props.setSubFilter}/>
                        <label htmlFor={`less-input`} className="text-sm font-medium text-gray-800 ml-2 mr-7"> Less </label>
                        <input type="number" className="w-[85px] border border-gray-400 px-3 rounded-lg shadow-md focus:outline-none " onChange={props.checkInputData} name={isYearInput ? `yearLess` : `ratingLess`}
                        value={isYearInput ? props.formData.yearLess : props.formData.ratingLess} />
                    </div>
                    <div className='flex mt-3'>
                        <input type="radio"  value={isYearInput ?  "year-greater-select" : "rating-greater-select"} name={isYearInput ? "year-less-greater-select" : "rating-less-greater-select"} onChange={props.setSubFilter} />
                        <label htmlFor={`less-input`} className="text-sm font-medium text-gray-800 mx-2"> Greater </label>
                        <input type="number"  className="w-[85px] border border-gray-400 px-3 rounded-lg shadow-md focus:outline-none" onChange={props.checkInputData} name={isYearInput ? `yearGreater` : `ratingGreater`} value={isYearInput ? props.formData.yearGreater : props.formData.ratingGreater} /> 
                    </div>
                </aside>
            </div>
        );
}

// ---------------------------------------------------------------- MATCHES SECTION ------------------------------------------------------------------------------------------
const MovieRow = (props) => {
    const posterPath = `https://image.tmdb.org/t/p/w92${props.movieData.poster}`;
    const releaseYear = props.movieData.release_date.substring(0,4); // The first 4 chars of the release date are the year.
    const ratings = props.movieData.ratings;
    // Needs to know what movies are currently favorited and which ones aren't.
    const isFavorite= props.favorites.includes(props.movieData);
    return (
        <tr className={props.i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="hover:cursor-pointer" onClick={() => props.setMovieDetails(props.movieData)}> 
            <Link to="/details"> <img src={posterPath}/> </Link> </td>
            <td className="px-3 text-[16px] font-semibold text-blue-600 hover:cursor-pointer hover:underline" onClick={() => props.setMovieDetails(props.movieData)}> 
            <Link to="/details"> {props.movieData.title} </Link> </td>
            <td className="px-3" > {releaseYear} </td>
            <td className="px-3"> {ratings.average} </td>
            <td className="px-3"> {Math.round(ratings.popularity, 2)}% </td>
            <td className="px-3"> <button onClick={() => props.addFavorite(props.movieData)}> <FavoriteMovie isFavorite={isFavorite} /> </button> </td>
            <td className="px-3"> <button className="text-green-800 text-sm font-semibold bg-green-300 rounded-lg py-1 px-2 uppercase" onClick={() => props.setMovieDetails(props.movieData)}> 
            <Link to="/details"> View </Link> </button> </td>
        </tr>
    )
}
const FavoriteMovie = ({isFavorite}) => {
    if (isFavorite){
        return  (
            <img src="src/assets/active-fav.png" alt="favorite" width={"32px"} /> 
        );
    }
    return(            
        <img className="" src="src/assets/inactive-fav.png" alt="favorite" width={"32px"} title="Add to favorites" /> 
    ); 
}
const MovieMatches = (props) => {
    const matchesData = props.matches.sort((a,b) => String(a.title).localeCompare(String(b.title)));
    if (matchesData.length > 0){
        function sortMovieColumns(sortingAttribute, sortingOrder){
            // creates a new ref for the array, as for react to re-render we need to create a new array, or else the reference will be the exact same
            const resultSet = [...matchesData];
            switch(sortingAttribute){
                case "title":
                    resultSet.sort((a, b) => a.title.localeCompare(b.title)); 
                    break;
                case "release-year":
                    resultSet.sort((a,b) => {const releaseDateA = new Date(a.release_date)  
                                                                        const releaseDateB = new Date(b.release_date)
                                                                        return releaseDateA.getTime() - releaseDateB.getTime()});
                    break;
                case "average-rating":
                    resultSet.sort((a,b) => a.ratings.average - b.ratings.average);
                    break;
                case "popularity":
                    resultSet.sort((a,b) => a.ratings.popularity - b.ratings.popularity);
                    break;
                default:
                    console.log("This Code Cannot Be Reached Naturally...");
            };
            const sortedMatches = sortingOrder === "descending" ? [...resultSet].reverse() : [...resultSet];
            console.log(sortedMatches);
            props.setSortedMatches(sortedMatches);
        }
        return(
            <section className='mx-8'>
                <h2> {`${matchesData.length} Matches Found!`} </h2>
                <div className='max-h-[49rem] overflow-y-scroll rounded-md shadow-md
                '>
                <table className="table-auto w-full"> 
                    <TableHead columns={[{name: "Poster", id:"poster", sortable:false}, {name: "Title", id:"title", sortable:true}, {name: "Release Year", id:"release-year", sortable:true}, {name: "Average Rating", id:"average-rating", sortable:true}, {name: "Popularity", id:"popularity", sortable:true}, {name:"Favorites", id:"favorite", sortable:false}, {name: "Details", id:"details", sortable:false}]} sortColumnOrder={sortMovieColumns} /> 
                    <tbody className="divide-y divide-gray-300">
                        {matchesData.map ( (m, index) => <MovieRow key={m.id} movieData={m} i={index} favorites={props.favoriteMovies} addFavorite={props.addFavorite} setMovieDetails={props.setMovieDetails} /> )}
                    </tbody>
                </table>
                </div>
            </section>
        );
    }
    else {
        return (
            <div>
                <h1> No Results Were Found... Sorry! </h1>
                <img src="https://thumbs.dreamstime.com/b/very-sad-american-shorthair-cat-shaded-silvers-tabby-portrait-very-sad-american-shorthair-cat-shaded-silvers-tabby-portrait-close-139233557.jpg" width={"300px"}/>
            </div>
        )
    }
}

const TableHead = ({columns, sortColumnOrder}) => {
    const [sortAttribute, setSortAttribute] = useState("title");
    const [sortOrder, setSortOrder] = useState("ascending"); // true -> asc, false -> desc
    function changeColumnOrder (selectedAttribute) {
        const columnSortOrder = selectedAttribute === sortAttribute && sortOrder === 'ascending' ? 'descending' : 'ascending'; // switches the sort order for the selected column
        setSortAttribute(selectedAttribute);
        setSortOrder(columnSortOrder);
        sortColumnOrder(sortAttribute, sortOrder);
    }
    return (
        <thead className='bg-violet-300 border-b-2 border-gray-200'>
            <tr>
                {columns.map((column) => column.sortable ? 
                <th key={column.id} className="p-4 text-md font-bold tracking-wide hover:cursor-pointer text-left" id={column.id} onClick={() => changeColumnOrder(column.id)}> {column.name} <span>▲ ▼</span> </th> : 
                <th key={column.id} className="p-4 text-md font-bold tracking-wide text-left" id={column.id}> {column.name} </th>)}
            </tr>
        </thead>
    );
}

// --------------------------------------------------------------- FAVORITES SECTION ------------------------------------------------------------------------------------------
const FavoriteListItem = (props) => {
    const posterPath = `https://image.tmdb.org/t/p/w185${props.poster}`;
    const movieTitle = props.title;
    return(
        <ul className='relative'>
            <li> {movieTitle} </li>
            <li> <img src={"src/assets/red-x-icon.png"} width={"24px"} className='absolute top-7 right-1 font-extrabold text-red-500 text-3xl shadow-lg z-10 hover:cursor-pointer' title="Remove From Favorites" onClick={() => props.removeFavorite(props.id)} /> 
                <img src={posterPath} alt="movie poster" />
            </li>
        </ul>
    );
}
const Favorites = (props) => {
    const favorites = props.favoriteMovies;
    const displayState = props.favoritesIsShown ? "block" : "hidden";
    if (favorites.length > 0){
        return (
            <div className={`${displayState}`}>
                <h2> Favorite Movies </h2>
                {favorites.map( (movie) => <FavoriteListItem key={movie.id} id={movie.id} poster={movie.poster} title={movie.title} removeFavorite={props.removeFavoriteMovie} />)}
            </div>
        );
    }
    else {
        return ( <h1 className={`${displayState}`}> No Favorites Movies Set!</h1>);
    }
}
// ======================================================== HIDE / DISPLAY SECTION =============================================================
const ShowSection = ({initialDireciton, section, setSectionDisplay}) => {
    const [direction, setDirection] = useState(initialDireciton);
    if (direction === 'right'){
        return (
            <div className='h-full bg-gray-400'>
                <p className='cursor-pointer' onClick={() => setSectionDisplay(section)}> ▶ </p>
            </div>
        );
    }
    return (
        <div className='h-full bg-gray-400 flex align-center'>
            <p className='cursor-pointer' onClick={() => setSectionDisplay(section)}> ◀ </p>
        </div>
    )
}
export default DefaultView;