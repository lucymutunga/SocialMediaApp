import React from "react";
import Profile from "./profile";
import Posts from "./posts";
import Discover from "./discover";

const User = () => {
  return (
    <div className="user">
      <Profile />
      <Posts />
      <Discover />
    </div>
  );
};

export default User;
