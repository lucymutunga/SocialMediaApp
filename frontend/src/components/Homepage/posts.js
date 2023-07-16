import React from "react";
import { FcLike } from "react-icons/fc";
import { BiMessageRounded } from "react-icons/bi";
import { ImForward } from "react-icons/im";
import happy from "../../assets/happy.jpg";
import "./posts.css";

const Posts = () => {
  return (
    <div className="posts_container">
      <div className="posts_header">
        <h1>Posts</h1>
        <button className="btn btn-primary">Create Post</button>
      </div>
      <div className="posts_body">
        <div className="posts">
          <div className="post">
            <img src={happy} alt="happy" className="feed_img" />
            <div className="icons">
              <div className="post-icon1">
                <FcLike />
                <p>600</p>
              </div>
              <div className="post-icon1">
                <BiMessageRounded />
                <p>400</p>
              </div>
              <div className="post-icon1">
                <ImForward />
                <p>200</p>
              </div>
            </div>
          </div>
        </div>
        <div className="posts">
          <div className="post">
            <img src={happy} alt="happy" className="feed_img" />
            <div className="icons">
              <div className="post-icon1">
                <FcLike />
                <p>600</p>
              </div>
              <div className="post-icon1">
                <BiMessageRounded />
                <p>400</p>
              </div>
              <div className="post-icon1">
                <ImForward />
                <p>200</p>
              </div>
            </div>
          </div>
        </div>
        <div className="posts">
          <div className="post">
            <img src={happy} alt="happy" className="feed_img" />
            <div className="icons">
              <div className="post-icon1">
                <FcLike />
                <p>600</p>
              </div>
              <div className="post-icon1">
                <BiMessageRounded />
                <p>400</p>
              </div>
              <div className="post-icon1">
                <ImForward />
                <p>200</p>
              </div>
            </div>
          </div>
        </div>
        <div className="posts">
          <div className="post">
            <img src={happy} alt="happy" className="post_img" />
            <div className="icons">
              <div className="post-icon1">
                <FcLike />
                <p>600</p>
              </div>
              <div className="post-icon1">
                <BiMessageRounded />
                <p>400</p>
              </div>
              <div className="post-icon1">
                <ImForward />
                <p>200</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Posts;
