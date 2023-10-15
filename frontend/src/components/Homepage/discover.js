import React, { useState, useEffect } from "react";
import axios from "axios";
import "./discover.css";
import { FiSearch } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import selfie from "../../assets/selfie.jpg";

const Discover = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [followedUsers, setFollowedUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch suggestions from the server
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("http://localhost:5050/suggestions", {
          withCredentials: true,
        });
        console.log(response.data.results);
        if (response.data.success && Array.isArray(response.data.results)) {
          setSuggestions(response.data.results);

          // Prepare a map of followed users for quick lookup
          const followedUsersMap = response.data.results.reduce(
            (map, suggestion) => {
              if (suggestion.isFollowingBack) {
                map[suggestion.user_id] = true;
              }
              return map;
            },
            {}
          );
          setFollowedUsers(followedUsersMap);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleFollow = async (user_id) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/follower",
        { user_id: user_id }, // JSON payload with the user_id
        { withCredentials: true }
      );
      if (response.data.success === true) {
        setFollowedUsers((prevFollowedUsers) => ({
          ...prevFollowedUsers,
          [user_id]: true,
        }));
      }
    } catch (error) {
      console.log("Error creating follower:", error);
    }
  };

  const handleUnfollow = (suggestionId) => {
    console.log(`Followed back suggestion with ID: ${suggestionId}`);
  };
  const filterSuggestions = () => {
    if (!searchQuery) {
      return suggestions;
    }
    const filteredSuggestions = suggestions.filter((suggestion) => {
      const firstName = suggestion.user_name.split(" ")[0];
      return firstName.toLowerCase().startsWith(searchQuery.toLowerCase());
    });

    return filteredSuggestions;
  };

  return (
    <div className="discover-container">
      <h1>Suggestions for you</h1>
      <div className="discover-header">
        <div className="search-bar">
          <FiSearch />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Step 3: Bind the search bar input field to the state variable
            placeholder="Search by first initial"
          />
          {/* <button type="button">Search</button> */}
        </div>
      </div>
      {filterSuggestions().map(
        (
          suggestion // Step 4: Render only the filtered suggestions
        ) => (
          <div className="mainsuggest">
            <div className="suggestions" key={suggestion.suggestion_id}>
              <div className="suggestion-image">
                {suggestion.profile_pic_url === null ? (
                  <img src={selfie} alt="profile" />
                ) : (
                  <img src={suggestion.profile_pic_url} alt="profile" />
                )}
              </div>
              <div className="names">
                <h1 className="suggestion-user-name">{suggestion.user_name}</h1>
                <h6 className="suggestion-name">
                  {suggestion.suggestion_name}
                </h6>
              </div>
              <div className="suggestions-stats">
                <div className="suggestions-stat">
                  <BsDot />
                  {followedUsers[suggestion.user_id] ? (
                    <button
                      className="btn follow-back"
                      onClick={() => handleUnfollow(suggestion.suggestion_id)}
                    >
                      unfollow
                    </button>
                  ) : (
                    <button
                      className="btn follow"
                      onClick={() => handleFollow(suggestion.user_id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Discover;
