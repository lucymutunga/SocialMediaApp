// Modal.js
import React from "react";
import { FcLike } from "react-icons/fc";
import { BiMessageRounded } from "react-icons/bi";
import { ImForward } from "react-icons/im";
import "./hidepostsModal.css";

const PostModal = ({ post, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <img src={post.image_url} alt="Post" className="modal-img" />
        <div className="modal-text">
          <h3 className="post-content">{post.text_content}</h3>
          <div className="icons">
            <div className="feed-icon1">
              <FcLike />
              <p>{post.likes}</p>
            </div>
            <div className="feed-icon1">
              <BiMessageRounded />
              <p>{post.comments}</p>
            </div>
            <div className="feed-icon1">
              <ImForward />
              <p>{post.shares}</p>
            </div>
          </div>
        </div>
      </div>
      <button className="modal-close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default PostModal;
