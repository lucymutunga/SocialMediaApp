import React, { useEffect, useState } from "react";
import "./land.css";
import { Link } from "react-router-dom";
import mainlogo from "../../assets/logo.png";
import smileyfaces from "../../assets/smiley_faces.jpg";
import fingers from "../../assets/fingers.jpg";
import selfie from "../../assets/selfie.jpg";
import headphones from "../../assets/headphones.jpg";

const LandingPage = () => {
  const [colorTheme, setColorTheme] = useState("theme-gold"); // Set initial color theme

  useEffect(() => {
    // Function to toggle between color themes
    const changeColorTheme = () => {
      const themes = [
        "theme-gold",
        "theme-lavender",
        "theme-green",
        "theme-violet",
        "theme-orange",
        "theme-blue",
        "theme-pink",
      ];
      const currentThemeIndex = themes.indexOf(colorTheme);
      const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
      setColorTheme(themes[nextThemeIndex]);
    };

    // Function to start the color-changing animation
    const startColorAnimation = (interval) => {
      setInterval(changeColorTheme, interval);
    };

    // Call the function with the desired interval (in milliseconds)
    startColorAnimation(5000); //
  }, [colorTheme]); // Add colorTheme to the dependency array
  return (
    <div
      className={`landing_container ${colorTheme}`}
      id="color-theme-container"
    >
      <div className="landing_navbar">
        <div className="landing_navbar_logo">
          <img src={mainlogo} alt="logo" />
        </div>
        <div className="landing_navbar_links">
          <ul>
            <li>Home</li>

            <li>Features</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="landing_navbar_buttons">
          <Link to="/login">
            <button className="button_signin">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="button_signup">Sign Up</button>
          </Link>
        </div>
      </div>
      <div className="landing_content">
        <div className="landing_content_ushape">
          <div className="first_set">
            <div className="landing_content_ushape_wrap">
              <img src={smileyfaces} alt="smileyfaces" />
              <h1>
                Immerse Yourself in <br />
                Vibrant Social Connections
              </h1>
            </div>
            <div className="landing_content_ushape_wrap">
              <img src={fingers} alt="fingers" />
              <h1>
                Ignite Your Social <br />
                Experience
              </h1>
            </div>
          </div>
          <div className="second_set">
            <div className="landing_content_ushape_wrap">
              <img src={selfie} alt="selfie" />
              <h1>
                Experience the Thrill <br />
                of Shared Moments
              </h1>
            </div>
            <div className="landing_content_ushape_wrap">
              <img src={headphones} alt="headphones" />
              <h1>
                Unleash Your Inner <br />
                Happiness
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
