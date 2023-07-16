import "./App.css";
import React from "react";

import LandingPage from "../src/components/landing_page/land.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/registration/login";
import Signup from "./components/registration/signup";
import Profile from "./components/Homepage/profile";
import Home from "./components/Homepage/Home";
import Followers from "./components/Homepage/followers";
import Following from "./components/Homepage/following";
import User from "./components/Homepage/user";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/followers",
    element: <Followers />,
  },
  {
    path: "/following",
    element: <Following />,
  },
  {
    path: "/user",
    element: <User />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
