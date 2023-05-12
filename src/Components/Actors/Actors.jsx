import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Actors() {
  let [actors, setActors] = useState([]);
  async function actorsAPI() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/person/week?api_key=fcba8b1bf14befeab6d05aed4c7c53b6"
    );
    setActors(data.results);
  }
  useEffect(() => {
    actorsAPI();
  }, []);
  return (
    <>
      {actors.length > 0 ? (
        <>
          <div className="container">
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
                <>
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
