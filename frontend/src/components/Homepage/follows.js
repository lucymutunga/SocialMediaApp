import React from "react";
import Following from "./following";
import FollowingPosts from "./followingPosts";

const Follows = () => {
  return (
    <div className="follows">
      <Following />
      <FollowingPosts />
    </div>
  );
};
export default Follows;
