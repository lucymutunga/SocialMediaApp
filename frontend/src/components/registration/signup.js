import React, { useState, createContext } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const ThemeContext = createContext();

const Signup = () => {
  const [name, setName] = useState(""); // [state, setState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //   const [profile_pic, setProfile_pic] = useState(
  //     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  //   );
  const [bio, setBio] = useState(""); // [state, setState
  const [country, setCountry] = useState("");
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleEmpty = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields");
    } else {
      setErrorMessage("");
      alert("Form submitted successfully");
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`signup ${theme}`}>
        <div className="hero">
          <div className="left-side">
            <div className="overlay"></div>
            <h3>Wanna join a vibrant community?This is your sign! </h3>
            <p>Click the signup button and find your tribe!</p>
          </div>
          <div className="form-container">
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
              {/* <input
                value={profile_pic}
                type="text"
                placeholder="Upload your profile pic"
                onChange={(e) => setProfile_pic(e.target.value)}
              /> */}
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
              <button className="btn" type="submit">
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
