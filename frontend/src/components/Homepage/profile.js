import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

import mainlogo from "../../assets/logo.png";
import { HiUserGroup } from "react-icons/hi";
import { MdGroup } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineStorage } from "react-icons/md";
import { Link } from "react-router-dom";
import Dash from "./dash";

const Profile = () => {
  const [homeModal, setHomeModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const toggleHome = () => {
    setHomeModal((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3030/profile", {
          withCredentials: true,
        });

        setUserProfile(response.data.userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (homeModal && !event.target.closest(".dash")) {
        setHomeModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [homeModal]);

  useEffect(() => {
    if (homeModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [homeModal]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="dash" onClick={toggleHome}>
          <MdOutlineStorage />
        </div>
        <div className="logo-container">
          <img src={mainlogo} alt="logo" />
          <h1>Tujuane</h1>
        </div>
        <div className="profile">
          {userProfile && (
            <>
              <div className="profile-image">
                <img src={userProfile.profile_pic_url} alt="profile" />
              </div>

              <h6 className="user-name">{userProfile.user_name}</h6>
              <div className="profile-stats">
                <div className="profile-stat">
                  <div className="followers">
                    <HiUserGroup />
                    <h2>Followers</h2>
                    <h5>{userProfile.followers}</h5>
                  </div>

                  <div className="followers">
                    <MdGroup />
                    <Link to="/follows">
                      <h2>Following</h2>
                    </Link>
                    <h5>{userProfile.following}</h5>
                  </div>
                </div>
              </div>
              <div className="profile-bio">
                <h4>{userProfile.bio}</h4>
              </div>
              <div className="profile-user-settings">
                <AiFillEdit />
                <Link to="/updateUser" className="btn profile-edit-btn">
                  Edit Profile
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {homeModal && <Dash />}
    </div>
  );
};

export default Profile;
