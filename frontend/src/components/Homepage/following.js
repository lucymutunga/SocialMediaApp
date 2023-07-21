import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import profile from "../../assets/profile.jpg";
import "./following.css";

const Following = () => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get("http://localhost:5050/followers", {
          withCredentials: true,
        });
        setFollowing(response.data.results);
        console.log(response);
      } catch (error) {
        console.error("Error fetching your  following:", error);
      }
    };

    fetchFollowing();
  }, []);

  const handleUnfollow = async (followingId) => {
    try {
      await axios.delete(`http://localhost:5050/follower/${followingId}`, {
        withCredentials: true,
      });

      setFollowing((prevFollowing) =>
        prevFollowing.filter((item) => item.id !== followingId)
      );

      console.log(`Unfollowed following with ID: ${followingId}`);
    } catch (error) {
      console.error("Error unfollowing following:", error);
    }
  };

  return (
    <div className="following-container">
      <h3>Bringing you closer to your taste</h3>
      <div className="following-header">
        <button className="btn search">
          <FiSearch />
          <h6>Search</h6>
        </button>
      </div>
      {following.length > 0 ? (
        following.map((item) => (
          <div className="following" key={item.id}>
            <div className="following-image">
              <img src={profile} alt="profile" />
            </div>
            <div className="names">
              <h1 className="following-user-name">{item.username}</h1>
              <h6 className="following-name">{item.name}</h6>
            </div>
            <div className="following-stats">
              <div className="following-stat">
                <BsDot />
                <div className="btn following">Following</div>
              </div>
              <button
                className="btn-unfollow"
                onClick={() => handleUnfollow(item.id)}
              >
                Unfollow
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>You don't follow anyone yet.</p>
      )}
    </div>
  );
};

export default Following;
