import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Movies() {
  let [movies, setMovies] = useState([]);
  async function movieAPI() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=fcba8b1bf14befeab6d05aed4c7c53b6"
    );
    setMovies(data.results);
  }
  useEffect(() => {
    movieAPI();
  }, []);
  return (
    <>
      {movies.length > 0 ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-4 d-flex align-items-center">
                <div>
                  <div className="brdr w-25 mb-3"></div>
                  <h3>
                    Trending Movies
                    <br />
                    To Watch Right Now
                  </h3>
                  <p className="text-muted py-2">
                    Most Watched movies by the day
                  </p>
                  <div className="brdr w-100"></div>
                </div>
              </div>
              {movies.map((movie, index) => (
                <>
                  <div key={index} className="col-md-2">
                    <div className="movie">
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt=""
                      />
                      <h5>{movie.title}</h5>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-spinner fa-5x fa-spin"></i>
          </div>
        </>
      )}
    </>
  );
}
