import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  let [movies, setMovies] = useState([]);
  let [tvs, setTvs] = useState([]);
  let [actors, setActors] = useState([]);

  async function movieAPI() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=fcba8b1bf14befeab6d05aed4c7c53b6"
    );
    setMovies(data.results);
  }

  async function tvAPI() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=fcba8b1bf14befeab6d05aed4c7c53b6"
    );
    setTvs(data.results);
  }

  async function actorsAPI() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/person/week?api_key=fcba8b1bf14befeab6d05aed4c7c53b6"
    );
    setActors(data.results);
  }
  useEffect(() => {
    movieAPI();
    tvAPI();
    actorsAPI();
  }, []);
  return (
    <>
      {movies.length > 0 && tvs.length > 0 && actors.length > 0 ? (
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
                <div key={index} className="col-md-2">
                  <Link to={`/movie-details/${movie.id}`}>
                    <div className="movie">
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt=""
                      />
                      <h5>{movie.title}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-4 d-flex align-items-center">
                <div>
                  <div className="brdr w-25 mb-3"></div>
                  <h3>
                    Trending TV
                    <br />
                    To Watch Right Now
                  </h3>
                  <p className="text-muted py-2">Most Watched tvs by the day</p>
                  <div className="brdr w-100"></div>
                </div>
              </div>
              {tvs.map((tv, index) => (
                <div key={index} className="col-md-2">
                  <div className="tv">
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                      alt=""
                    />
                    <h5>{tv.name}</h5>
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-4 d-flex align-items-center">
                <div>
                  <div className="brdr w-25 mb-3"></div>
                  <h3>
                    Trending Actors
                    <br />
                    To Watch Right Now
                  </h3>
                  <p className="text-muted py-2">
                    Most Watched actors by the day
                  </p>
                  <div className="brdr w-100"></div>
                </div>
              </div>
              {actors.map((actor, index) => (
                <div key={index} className="col-md-2">
                  <div className="actor">
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                      alt=""
                    />
                    <h5>{actor.name}</h5>
                  </div>
                </div>
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
