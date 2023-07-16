import React from "react";
import "./notifications.css";
import profile from "../../assets/profile.jpg";
const Notification = () => {
  return (
    <div className="notications-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <h3>Filter</h3>
      </div>
      <div className="notification">
        <img src={profile} alt="profile" />
        <h4 className="username">Bright</h4>
        <h6>started following you</h6>

        <button className="flwback">Follow back</button>
      </div>
      <div className="notification">
        <img src={profile} alt="profile" />
        <h4 className="username">Stan</h4>
        <h6>Liked your post</h6>
      </div>
      <div className="notification">
        <img src={profile} alt="profile" />
        <h4 className="username">Stacy</h4>
        <h6>started following you</h6>

        <button className="flwback">Follow back</button>
      </div>
      <div className="notification">
        <img src={profile} alt="profile" />
        <h4 className="username">Cutey</h4>
        <h6>started following you</h6>

        <button className="flwback">Follow back</button>
      </div>
      <div className="notification">
        <img src={profile} alt="profile" />
        <h4 className="username">Gift</h4>
        <h6>Mentioned you in their post</h6>
      </div>
    </div>
  );
};

export default Notification;
