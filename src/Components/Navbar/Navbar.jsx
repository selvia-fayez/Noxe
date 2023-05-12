import React from "react";
import { NavLink } from "react-router-dom";
export default function Navbar({ currentUser, clearUserData }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand nav-link fw-bolder" to="/">
            <h1>Noxe</h1>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {currentUser ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/movies">
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tvshows">
                    Series
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/actors">
                    Actors
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center me-3">
                <i className="fa-solid fa-heart mx-1" to="/favourites"></i>
                <i className="fab fa-facebook mx-1"></i>
                <i className="fab fa-instagram mx-1"></i>
                <i className="fab fa-twitter mx-1"></i>
              </li>
              {currentUser ? (
                <li className="nav-item" onClick={clearUserData}>
                  <NavLink className="nav-link" to="/login">
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
