import React, { useState } from "react";
import axios from "axios";
import "./updateUser.css";
const UpdateUser = () => {
  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload profile picture to Cloudinary
      const formData = new FormData();
      formData.append("file", profilePic);
      formData.append("upload_preset", "Tujuane");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dsqaetaop/image/upload",
        formData
      );

      // Update user profile with Cloudinary image URL
      const response = await axios.put(
        "http://localhost:3030/update",
        {
          user_name,
          email,
          password,
          c_password,
          bio,
          country,
          profile_pic_url: uploadResponse.data.secure_url,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      // Handle success and show appropriate message to the user
      setSuccessMessage("User profile updated successfully");
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error and show appropriate message to the user
      setErrorMessage("Error updating user profile");
      setSuccessMessage("");
    }
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <div className="update-user-container">
      <h1>Update User Profile</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="forminput-container">
          <div className="form input">
            <label>Username:</label>
            <input
              type="text"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form input">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form input">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form input">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={c_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form input">
            <label>Bio:</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className="form input">
          <label>Profile Picture:</label>
          <input type="file" onChange={handleProfilePicChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateUser;
