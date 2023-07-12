import React, { useState, createContext } from "react";
import "./login.css";
import { Link } from "react-router-dom";
const ThemeContext = createContext();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleEmpty = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all the fields");
    } else {
      setErrorMessage("");
      alert("Form submitted successfully");
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`login ${theme}`}>
        <div className="hero">
          <div className="left-side">
            <div className="overlay"></div>
            <h3>
              Hey youu!Welcome Back. <span>Tujuane </span> gotta be your fav
              spot!
            </h3>
            <p>
              Show us what you got🤩,We love to see it😘.Catch up with your
              friends as we help you make new ones😊.Positive vibes all the
              way💃
            </p>
          </div>
          <div className="form-container">
            <h4>Login</h4>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleEmpty}>
              <input
                value={username}
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
            </form>
            <Link to="/signup">
              <button className="btn" onClick={handleEmpty} type="submit">
                Login
              </button>
            </Link>

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
