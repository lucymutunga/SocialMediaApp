import React, { useState, createContext } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
const ThemeContext = createContext();

const Signup = () => {
  const [name, setName] = useState(""); // [state, setState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bio, setBio] = useState(""); // [state, setState
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const handleSignup = async (event) => {
    try {
      const response = await axios.post(
        "http://localhost:3030/create",
        { name, email, password, confirmPassword, bio, country, theme },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/login");
      } else {
        setErrorMessage(["Invalid Credentials"]);
      }
    } catch (error) {
      if (error.response && error.respose.data && error.response.data.message) {
        setErrorMessage([error.response.data.message]);
      } else {
        setErrorMessage(["Error login in"]);
      }
    }
  };

  const handleEmpty = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage(["Please fill in all the fields"]);
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`signup ${theme}`}>
        <div className="hero2">
          <div className="form2left-side">
            <div className="overlay"></div>
            <h3>Wanna join a vibrant community?This is your sign! </h3>
            <p>Click the signup button and find your tribe!</p>
          </div>
          <div className="form2-container">
            <h4>Sign Up</h4>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleEmpty}>
              <input
                value={name}
                type="text"
                placeholder="Enter your name*"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                value={email}
                type="text"
                placeholder="Email*"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                value={password}
                type="password"
                placeholder="Password*"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                value={confirmPassword}
                type="password"
                placeholder="Confirm your password*"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <input
                value={bio}
                type="text"
                placeholder="Enter your bio"
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                value={country}
                type="text"
                placeholder="Enter your country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </form>
            <Link to="/login">
              <button
                className="btn"
                onClick={(e) => {
                  handleSignup(e);
                }}
                type="submit"
              >
                Signup
              </button>
            </Link>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
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

export default Signup;
