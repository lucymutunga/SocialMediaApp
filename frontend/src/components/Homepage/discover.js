import React from "react";
import "./discover.css";
import { FiSearch } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import profile from "../../assets/profile.jpg";
const Discover = () => {
  return (
    <div className="discover-container">
      <h1>Suggestions for you</h1>
      <div className="discover-header">
        <button className="btn search">
          <FiSearch />
          <h6>Search</h6>
        </button>
      </div>
      <div className="suggestions">
        <div className="suggestion-image">
          <img src={profile} alt="profile" />
        </div>
        <div className="names">
          <h1 className="suggestion-user-name">smiley_face</h1>
          <h6 className="suggestion-name">jane_doe</h6>
        </div>
        <div className="suggestions-stats">
          <div className="suggestions-stat">
            <BsDot />
            <button className="btn follow">Follow Back</button>
          </div>
        </div>
      </div>
      <div className="suggestions">
        <div className="suggestion-image">
          <img src={profile} alt="profile" />
        </div>
        <div className="names">
          <h1 className="suggestion-user-name">smiley_face</h1>
          <h6 className="suggestion-name">jane_doe</h6>
        </div>
        <div className="suggestions-stats">
          <div className="suggestions-stat">
            <BsDot />
            <button className="btn follow">Follow Back</button>
          </div>
        </div>
      </div>
      <div className="suggestions">
        <div className="suggestion-image">
          <img src={profile} alt="profile" />
        </div>
        <div className="names">
          <h1 className="suggestion-user-name">smiley_face</h1>
          <h6 className="suggestion-name">jane_doe</h6>
        </div>
        <div className="suggestions-stats">
          <div className="suggestions-stat">
            <BsDot />
            <button className="btn follow">Follow Back</button>
          </div>
        </div>
      </div>
      <div className="suggestions">
        <div className="suggestion-image">
          <img src={profile} alt="profile" />
        </div>
        <div className="names">
          <h1 className="suggestion-user-name">smiley_face</h1>
          <h6 className="suggestion-name">jane_doe</h6>
        </div>
        <div className="suggestions-stats">
          <div className="suggestions-stat">
            <BsDot />
            <button className="btn follow">Follow</button>
          </div>
        </div>
      </div>
      <div className="suggestions">
        <div className="suggestion-image">
          <img src={profile} alt="profile" />
        </div>
        <div className="names">
          <h1 className="suggestion-user-name">smiley_face</h1>
          <h6 className="suggestion-name">jane_doe</h6>
        </div>
        <div className="suggestions-stats">
          <div className="suggestions-stat">
            <BsDot />
            <button className="btn follow">Follow</button>
          </div>
        </div>
      </div>
      <div className="suggestions">
        <div className="suggestion-image">
          <img src={profile} alt="profile" />
        </div>
        <div className="names">
          <h1 className="suggestion-user-name">smiley_face</h1>
          <h6 className="suggestion-name">jane_doe</h6>
        </div>
        <div className="suggestions-stats">
          <div className="suggestions-stat">
            <BsDot />
            <button className="btn follow">Follow Back</button>
          </div>
        </div>
      </div>
      <div className="suggestions">
        <div className="suggestion-image">
          <img src={profile} alt="profile" />
        </div>
        <div className="names">
          <h1 className="suggestion-user-name">smiley_face</h1>
          <h6 className="suggestion-name">jane_doe</h6>
        </div>
        <div className="suggestions-stats">
          <div className="suggestions-stat">
            <BsDot />
            <button className="btn follow">Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Discover;
