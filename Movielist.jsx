import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Movielist() {

  const Navigate = useNavigate();

  const [movielist, setmovielist] = useState([]);
  const [searchmovie, setsearchmovie] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((dd) => dd.json())
      .then((dd) => setmovielist(dd))
      .catch((err) => console.log(err))
  }, []);

  // filter movies based on search input
  const filteredMovies = movielist.filter((movie) =>
    movie.title.toLowerCase().includes(searchmovie.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchmovie.toLowerCase())
  );

  // sort movies based on sortOption
  let sortedMovies = [...filteredMovies];
  if (sortOption === "title-asc") sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
  if (sortOption === "title-desc") sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
  if (sortOption === "year-asc") sortedMovies.sort((a, b) => a.year - b.year);
  if (sortOption === "year-desc") sortedMovies.sort((a, b) => b.year - a.year);
  if (sortOption === "rating-asc") sortedMovies.sort((a, b) => a.rating - b.rating);
  if (sortOption === "rating-desc") sortedMovies.sort((a, b) => b.rating - a.rating);

  if (movielist.length === 0) {
    return <p>Loading....</p>
  }

  return (
    <div className="d-flex flex-column">
      <div className="dropsearch d-flex flex-wrap gap-5">

        {/* Genre Dropdown */}
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Genre
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => setsearchmovie("Sci-Fi")}>Sci-Fi</a></li>
            <li><a className="dropdown-item" onClick={() => setsearchmovie("Action")}>Action</a></li>
            <li><a className="dropdown-item" onClick={() => setsearchmovie("Adventure")}>Adventure</a></li>
            <li><a className="dropdown-item" onClick={() => setsearchmovie("Super Hero")}>Super Hero</a></li>
            <li><a className="dropdown-item" onClick={() => setsearchmovie("Thriller")}>Thriller</a></li>
            <li><a className="dropdown-item" onClick={() => setsearchmovie("Drama")}>Drama</a></li>
          </ul>
        </div>

        {/* Sort Dropdown */}
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => setSortOption("title-asc")}>Title (A–Z)</a></li>
            <li><a className="dropdown-item" onClick={() => setSortOption("title-desc")}>Title (Z–A)</a></li>
            <li><a className="dropdown-item" onClick={() => setSortOption("year-desc")}>Year (Newest–Oldest)</a></li>
            <li><a className="dropdown-item" onClick={() => setSortOption("year-asc")}>Year (Oldest–Newest)</a></li>
            <li><a className="dropdown-item" onClick={() => setSortOption("rating-desc")}>Rating (High–Low)</a></li>
            <li><a className="dropdown-item" onClick={() => setSortOption("rating-asc")}>Rating (Low–High)</a></li>
          </ul>
        </div>

        {/* Search Bar */}
        <div>
          <div className="search-bar input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search.."
              value={searchmovie}
              onChange={(e) => setsearchmovie(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button className='btn btn-primary' onClick={()=>Navigate('/likedmovie')}>Liked Movies</button>
        </div>

         <div>
          <button className='btn btn-primary' onClick={()=>Navigate('/watchlater')}>Watch Later</button>
        </div>

      </div>

      {/* Movies grid */}
      <div className="d-flex flex-wrap gap-5 divcard">
        {sortedMovies.length > 0 ? (
          sortedMovies.map((movie) => (
            <div className="card" key={movie.id}>
              <img src={movie.poster} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
                <a
                  className="watchbtnlist btn btn-primary"
                  onClick={() => Navigate(`/openmovie/${movie.id}`)}
                >
                  Watch
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found...</p>
        )}
      </div>

    </div>
  )
}

export default Movielist
