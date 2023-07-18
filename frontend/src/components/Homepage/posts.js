import React from "react";
import { FcLike } from "react-icons/fc";
import { BiMessageRounded } from "react-icons/bi";
import { ImForward } from "react-icons/im";

import "./posts.css";
import { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";

const Posts = () => {
  const [content, setContent] = useState("");
  const [items, setItems] = useState([]);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3333/posts/user", {
          withCredentials: true,
        });

        setItems(response.data.results);
        setId(response.data.userId);
        setLoading(false); // Set loading to false once data is fetched successfully

        console.log(response.data.results);
      } catch (error) {
        setError("Error fetching posts"); // Set error message if there's an error fetching posts
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchItems();
  }, []);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Tujuane");

    try {
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dsqaetaop/image/upload",
        formData
      );

      console.log("Image uploaded successfully!");
      setImageUrl(uploadResponse.data.secure_url);

      const saveResponse = await axios.post(
        "http://localhost:3333/post",
        {
          text_content: content,
          image_url: uploadResponse.data.secure_url,
        },
        { withCredentials: true }
      );

      console.log(uploadResponse.data.secure_url);
      console.log("Image URL and content saved successfully!");

      // Resetting the imageUrl and image states
      setImageUrl("");
      setImage(null);

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error while uploading and saving image:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="posts_container">
      <div className="posts_header">
        <h1>Posts</h1>
        <button className="btn btn-primary">Create Post</button>
      </div>

      <div className="text-area-container">
        <form className="post-form" onSubmit={handleImageUpload}>
          <textarea
            className="post-textarea"
            placeholder="What's on your mind?"
            value={content}
            onChange={handleContentChange}
          />
          <input
            className="post-file-input"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="post-submit-btn" type="submit">
            Share
          </button>
        </form>

        {imageUrl && (
          <div className="post-image-container">
            <Image
              className="post-image"
              cloudName="dj9ckjrdd"
              publicId={imageUrl}
            />
          </div>
        )}
      </div>

      <div className="cloudbody">
        <div className="post-list">
          {items && items.length > 0 ? (
            items.map((item) => (
              <div className="post-item" key={item.post_id}>
                <div className="user-profile">
                  <img
                    src={item.userProfilePic}
                    alt={item.username}
                    className="profile-picture"
                  />
                  <span className="username">{item.username}</span>
                </div>
                <div className="post-content-wrapper">
                  <h3 className="post-content">{item.text_content}</h3>
                  <img
                    src={item.image_url}
                    alt={item.image_url}
                    className="post-image"
                  />
                  <div className="icons">
                    <div className="post-icon1">
                      <FcLike />
                      {/* <p>600</p> */}
                    </div>
                    <div className="post-icon1">
                      <BiMessageRounded />
                      {/* <p>20</p> */}
                    </div>
                    <div className="post-icon1">
                      <ImForward />
                      {/* <p>2</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No posts to display</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
