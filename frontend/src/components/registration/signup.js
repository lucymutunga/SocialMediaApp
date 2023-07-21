import React, { useState, createContext } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Login from "./login";

// import { useNavigate } from "react-router-dom";
const ThemeContext = createContext();

const Signup = () => {
  const [name, setName] = useState(""); // [state, setState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setConfirmPassword] = useState("");

  const [bio, setBio] = useState(""); // [state, setState
  const [country, setCountry] = useState("");
  const [signedUp, setSignedUp] = useState(false); // [state, setState
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const Register = {
    user_name: name,
    email: email,
    password: password,
    c_password: c_password,
    profile_pic_url: null,
    bio: bio,
    country: country,
  };
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3030/create",
        Register,
        {}
      );
      console.log(response);
      if (response.data.success === true) {
        setSignedUp(true);
        navigate("/login");
      } else {
        console.error("Error while signing up");
      }
    } catch (error) {
      console.error("Error while signing up:", error.response.data);
    }
  };

  if (signedUp) {
    return <Login />;
  }

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

            <form>
              <input
                value={name}
                type="text"
                placeholder="Enter your name*"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                value={email}
                type="email"
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
                value={c_password}
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
            <button className="btn" type="button" onClick={handleSignup}>
              Signup
            </button>
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
