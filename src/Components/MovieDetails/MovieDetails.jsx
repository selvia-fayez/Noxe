import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  //get id from url
  let { id } = useParams();
  let [movieDetails, setMovieDetails] = useState(null);
  async function movieDetailsAPI() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=fcba8b1bf14befeab6d05aed4c7c53b6&language=en-US`
    );
    setMovieDetails(data);
  }
  useEffect(() => {
    movieDetailsAPI();
  }, []);

  return (
    <>
      {movieDetails ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                  alt=""
                />
              </div>
              <div className="col-md-8">
                <h3 className="my-2">{movieDetails.title} </h3>
                <p className="py-2 text-muted">{movieDetails.overview}</p>
                {movieDetails.genres?.map((genre, idx) => (
                  <span
                    key={idx}
                    className="bg-info text-white me-2 p-2 rounded "
                  >
                    {genre.name}
                  </span>
                ))}
                <h6 className="py-2 mt-4">
                  Vote : {movieDetails.vote_average}
                </h6>
                <h6 className="py-2">
                  Vote count : {movieDetails.vote_count}{" "}
                </h6>
                <h6 className="py-2">
                  Popularity : {movieDetails.popularity}{" "}
                </h6>
                <h6 className="py-2">
                  Release date : {movieDetails.release_date}{" "}
                </h6>
              </div>
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
