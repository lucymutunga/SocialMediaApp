import React, { useState, createContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
const ThemeContext = createContext();

const Login = () => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3030/login",
        { user_name, password },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      } else if (error.response && error.response.status === 401) {
        // 401 Unauthorized: Invalid credentials
        setErrorMessage("Invalid username or password");
      } else {
        // Other server errors
        setErrorMessage("Error logging in");
      }
    }
  };

  const handleEmpty = (e) => {
    e.preventDefault();
    if (!user_name || !password) {
      setErrorMessage("Please fill in all the fields");
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`login ${theme}`}>
        <div className="hero1">
          <div className="left-side">
            <div className="overlay"></div>
            <h6>
              Hey youu!Welcome Back. <span>Tujuane </span> gotta be your fav
              spot!
            </h6>
            <p>
              Show us what you gat🤩,We love to see it😘.Catch up with your
              friends as we help you make new ones😊.Positive vibes all the
              way💃
            </p>
          </div>
          <div className="form1-container">
            <h4>Login</h4>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleEmpty}>
              <input
                value={user_name}
                type="text"
                placeholder="Username*"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                value={password}
                type="password"
                placeholder="Password*"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <div className="error-message">
                  <p
                    className="error"
                    style={{ fontSize: "8px", color: "red" }}
                  >
                    {errorMessage}
                  </p>
                </div>
              )}
            </form>
            <button
              className="btn"
              onClick={(e) => {
                handleLogin(e);
                handleEmpty(e);
              }}
              type="submit"
            >
              Login
            </button>

            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <button className="btn-e" onClick={toggleTheme}>
              Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Login;
