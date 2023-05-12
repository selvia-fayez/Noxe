import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Movies from "./Components/Movies/Movies";
import MainLayout from "./Components/MainLayout/MainLayout";
import Register from "./Components/Register/Register";
import TvShows from "./Components/TvShows/TvShows";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import Actors from "./Components/Actors/Actors";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
  function Guard(props) {
    if (localStorage.getItem("token") == null) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }
  let [currentUser, setCurrentUser] = useState(null);
  function decodeToken() {
    let user = jwtDecode(localStorage.getItem("token"));
    setCurrentUser(user);
  }
  function clearUserData() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <MainLayout currentUser={currentUser} clearUserData={clearUserData} />
      ),
      children: [
        { index: true, element: <Home /> },
        {
          path: "movies",
          element: (
            <Guard>
              <Movies />
            </Guard>
          ),
        },
        {
          path: "movie-details/:id",
          element: (
            <Guard>
              <MovieDetails />
            </Guard>
          ),
        },
        {
          path: "tvshows",
          element: (
            <Guard>
              <TvShows />
            </Guard>
          ),
        },
        {
          path: "actors",
          element: (
            <Guard>
              <Actors />
            </Guard>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login decodeToken={decodeToken} />,
        },
      ],
    },
  ]);
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      decodeToken();
    }
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
