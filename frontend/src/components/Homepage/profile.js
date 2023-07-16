import React, { useEffect, useState } from "react";
import "./profile.css";
import profile from "../../assets/profile.jpg";
import mainlogo from "../../assets/logo.png";
import { HiUserGroup } from "react-icons/hi";
import { MdGroup } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineStorage } from "react-icons/md";
import { Link } from "react-router-dom";
import Dash from "./dash";

const Profile = () => {
  const [homeModal, setHomeModal] = useState(false);

  const toggleHome = () => {
    setHomeModal((prevState) => !prevState);
  };

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
          <div className="profile-image">
            <img src={profile} alt="profile" />
          </div>
          <h8 className="user-name">Janedoe_</h8>
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="followers">
                <HiUserGroup />
                <h2>Followers</h2>
                <h5>20</h5>
              </div>

              <div className="followers">
                <MdGroup />
                <Link to="/following">
                  <h2>Following</h2>
                </Link>
                <h5>80</h5>
              </div>
            </div>
          </div>
          <div className="profile-bio">
            <h4>Helllo. I'm lucy de alcy. And I love Githeri()</h4>
          </div>
          <div className="profile-user-settings">
            <AiFillEdit />
            <button className="btn profile-edit-btn">Edit Profile</button>
          </div>
        </div>
      </div>
      {homeModal && <Dash />}
    </div>
  );
};

export default Profile;
