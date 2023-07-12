import React from "react";
import "./land.css";
import mainlogo from "../../assets/logo.png";
import smileyfaces from "../../assets/smiley_faces.jpg";
import fingers from "../../assets/fingers.jpg";
import selfie from "../../assets/selfie.jpg";
import headphones from "../../assets/headphones.jpg";

const LandingPage = () => {
  return (
    <div className="landing_container">
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
          <button className="button_signin">Sign In</button>
          <button className="button_signup">Sign Up</button>
        </div>
      </div>
      <div className="landing_content">
        <div className="landing_content_ushape">
          <div className="first_set">
            <div className="landing_content_ushape_wrap">
              <img src={smileyfaces} alt="smileyfaces" />
              <h1>group of smiley faces</h1>
            </div>
            <div className="landing_content_ushape_wrap">
              <img src={fingers} alt="fingers" />
              <h1>fingers of unity</h1>
            </div>
          </div>
          <div className="second_set">
            <div className="landing_content_ushape_wrap">
              <img src={selfie} alt="selfie" />
              <h1>A group selfie</h1>
            </div>
            <div className="landing_content_ushape_wrap">
              <img src={headphones} alt="headphones" />
              <h1>girl listening to music</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
