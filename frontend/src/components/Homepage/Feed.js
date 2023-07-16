import React from "react";
import { FcLike } from "react-icons/fc";
import { BiMessageRounded } from "react-icons/bi";
import { ImForward } from "react-icons/im";
import happy from "../../assets/happy.jpg";
import "./feed.css";

const Feed = () => {
  return (
    <div className="feed_container">
      <div className="feed_header">
        <h1>Posts</h1>
        <button className="btn btn-primary">Create Post</button>
      </div>

      <div className="feeds">
        <div className="feed">
          <img src={happy} alt="happy" className="feed_img" />
          <div className="icons">
            <div className="feed-icon1">
              <FcLike />
              <p>600</p>
            </div>
            <div className="feed-icon1">
              <BiMessageRounded />
              <p>400</p>
            </div>
            <div className="feed-icon1">
              <ImForward />
              <p>200</p>
            </div>
          </div>
        </div>
        <div className="feed">
          <img src={happy} alt="happy" className="feed_img" />
          <div className="icons">
            <div className="feed-icon1">
              <FcLike />
              <p>600</p>
            </div>
            <div className="feed-icon1">
              <BiMessageRounded />
              <p>400</p>
            </div>
            <div className="feed-icon1">
              <ImForward />
              <p>200</p>
            </div>
          </div>
        </div>
        <div className="feed">
          <img src={happy} alt="happy" className="feed_img" />
          <div className="icons">
            <div className="feed-icon1">
              <FcLike />
              <p>600</p>
            </div>
            <div className="feed-icon1">
              <BiMessageRounded />
              <p>400</p>
            </div>
            <div className="feed-icon1">
              <ImForward />
              <p>200</p>
            </div>
          </div>
        </div>
        <div className="feed">
          <img src={happy} alt="happy" className="feed_img" />
          <div className="icons">
            <div className="feed-icon1">
              <FcLike />
              <p>600</p>
            </div>
            <div className="feed-icon1">
              <BiMessageRounded />
              <p>400</p>
            </div>
            <div className="feed-icon1">
              <ImForward />
              <p>200</p>
            </div>
          </div>
        </div>
        <div className="feed">
          <img src={happy} alt="happy" className="feed_img" />
          <div className="icons">
            <div className="feed-icon1">
              <FcLike />
              <p>600</p>
            </div>
            <div className="feed-icon1">
              <BiMessageRounded />
              <p>400</p>
            </div>
            <div className="feed-icon1">
              <ImForward />
              <p>200</p>
            </div>
          </div>
        </div>
        <div className="feed">
          <img src={happy} alt="happy" className="feed_img" />
          <div className="icons">
            <div className="feed-icon1">
              <FcLike />
              <p>600</p>
            </div>
            <div className="feed-icon1">
              <BiMessageRounded />
              <p>400</p>
            </div>
            <div className="feed-icon1">
              <ImForward />
              <p>200</p>
            </div>
          </div>
        </div>
        <div className="feed">
          <img src={happy} alt="happy" className="feed_img" />
          <div className="icons">
            <div className="feed-icon1">
              <FcLike />
              <p>600</p>
            </div>
            <div className="feed-icon1">
              <BiMessageRounded />
              <p>400</p>
            </div>
            <div className="feed-icon1">
              <ImForward />
              <p>200</p>
            </div>
          </div>
        </div>
        <div className="feed">
          <img src={happy} alt="happy" className="feed_img" />
          <div className="icons">
            <div className="feed-icon1">
              <FcLike />
              <p>600</p>
            </div>
            <div className="feed-icon1">
              <BiMessageRounded />
              <p>400</p>
            </div>
            <div className="feed-icon1">
              <ImForward />
              <p>200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feed;
