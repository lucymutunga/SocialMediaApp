import "./App.css";
import React from "react";
import LandingPage from "../src/components/landing_page/land.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/registration/login";
import Signup from "./components/registration/signup";
import Home from "./components/Homepage/Home";
import Following from "./components/Homepage/following";
import User from "./components/Homepage/user";
import Follows from "./components/Homepage/follows";
import UpdateUser from "./components/Homepage/updateUser";
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
    path: "/follows",
    element: <Follows />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/following",
    element: <Following />,
  },
  {
    path: "/updateUser",
    element: <UpdateUser />,
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
