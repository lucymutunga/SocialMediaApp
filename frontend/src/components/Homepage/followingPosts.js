import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import { BiMessageRounded } from "react-icons/bi";
import { ImForward } from "react-icons/im";
import "./followingPosts.css";
import PostModal from "./hidepostsModal";
import { Link } from "react-router-dom";

const FollowingPosts = () => {
  const [followingPosts, setFollowingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/posts/following",
          {
            withCredentials: true,
          }
        );

        setFollowingPosts(response.data.results);
        setLoading(false); // Set loading to false once data is fetched successfully

        console.log(response.data.results);
      } catch (error) {
        setError("Error fetching following posts"); // Set error message if there's an error fetching posts
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchFollowingPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="feed_container">
      <div className="feed_header">
        <h1>Following Posts</h1>
        <Link to="/home">
          <button className="btn btn-primary">Home</button>
        </Link>
      </div>

      <div className="feeds">
        {followingPosts && followingPosts.length > 0 ? (
          followingPosts.map((post) => (
            <div
              className={`feed ${selectedPost === post ? "selected-post" : ""}`}
              key={post.post_id}
              onClick={() => handlePostClick(post)}
            >
              <img src={post.image_url} alt="Post" className="feed_img" />
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
          ))
        ) : (
          <div>No following posts to display</div>
        )}
      </div>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default FollowingPosts;
