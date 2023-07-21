import React, { useState, useEffect } from "react";
import axios from "axios";
import "./discover.css";
import { FiSearch } from "react-icons/fi";
import { BsDot } from "react-icons/bs";

const Discover = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch suggestions from the server
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("http://localhost:5050/suggestions", {
          withCredentials: true,
        });
        console.log(response);
        if (response.data.success && Array.isArray(response.data.results)) {
          setSuggestions(response.data.results);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleFollow = (suggestionId) => {
    console.log(`Followed suggestion with ID: ${suggestionId}`);
  };

  const handleFollowBack = (suggestionId) => {
    console.log(`Followed back suggestion with ID: ${suggestionId}`);
  };

  return (
    <div className="discover-container">
      <h1>Suggestions for you</h1>
      <div className="discover-header">
        <button className="btn search">
          <FiSearch />
          <h6>Search</h6>
        </button>
      </div>
      {suggestions.map((suggestion) => (
        <div className="suggestions" key={suggestion.suggestion_id}>
          <div className="suggestion-image">
            <img src={suggestion.profile_pic_url} alt="profile" />
          </div>
          <div className="names">
            <h1 className="suggestion-user-name">
              {suggestion.suggestion_user_name}
            </h1>
            <h6 className="suggestion-name">{suggestion.suggestion_name}</h6>
          </div>
          <div className="suggestions-stats">
            <div className="suggestions-stat">
              <BsDot />
              {suggestion.isFollowingBack ? (
                <button
                  className="btn follow-back"
                  onClick={() => handleFollowBack(suggestion.suggestion_id)}
                >
                  Follow Back
                </button>
              ) : (
                <button
                  className="btn follow"
                  onClick={() => handleFollow(suggestion.suggestion_id)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Discover;
