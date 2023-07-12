import "./App.css";
import React from "react";

import LandingPage from "../src/components/landing_page/land.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/registration/login";
import Signup from "./components/registration/signup";

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
