import React, { useState } from "react";
import "./signUp.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

// Base URL from environment variable
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const navigate = useNavigate();

  // Default profile image
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    "https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain"
  );

  // Form input fields
  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
  });

  // Progress bar loading state
  const [progressBar, setProgressBar] = useState(false);

  // Handle form input change
  const handleInputField = (e) => {
    const { name, value } = e.target;
    setSignUpField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload profile picture to Cloudinary
  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "youtube-clone");

    try {
      setProgressBar(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/prashant28/image/upload",
        data
      );
      const imageUrl = response.data.secure_url;
      setUploadedImageUrl(imageUrl);
      setSignUpField((prev) => ({ ...prev, profilePic: imageUrl }));
    } catch (error) {
      toast.error("Image upload failed.");
    } finally {
      setProgressBar(false);
    }
  };

  // Handle sign up button click
  const handleSignup = async () => {
    try {
      setProgressBar(true);
      const res = await axios.post(
        `${baseUrl}/auth/signUp`,
        signUpField,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/"); // Redirect to home page on success
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setProgressBar(false);
    }
  };

  return (
    <div className="signUp">
      <div className="signup_card">
        {/* App icon and title */}
        <div className="signUp_title">
          <YouTubeIcon sx={{ fontSize: "54px" }} className="login_youtubeImage" />
          SignUp
        </div>

        {/* Signup form inputs */}
        <div className="signUp_Inputs">
          <input
            type="text"
            name="channelName"
            className="signUp_Input_inp"
            placeholder="Channel Name"
            value={signUpField.channelName}
            onChange={handleInputField}
          />

          <input
            type="text"
            name="userName"
            className="signUp_Input_inp"
            placeholder="User Name"
            value={signUpField.userName}
            onChange={handleInputField}
          />

          <input
            type="password"
            name="password"
            className="signUp_Input_inp"
            placeholder="Password"
            value={signUpField.password}
            onChange={handleInputField}
          />

          <input
            type="text"
            name="about"
            className="signUp_Input_inp"
            placeholder="About Your Channel"
            value={signUpField.about}
            onChange={handleInputField}
          />

          {/* Profile image upload and preview */}
          <div className="image_upload_signup">
            <input type="file" accept="image/*" onChange={uploadImage} />
            <div className="image_upload_signup_div">
              <img className="image_default_signUp" src={uploadedImageUrl} alt="Profile Preview" />
            </div>
          </div>

          {/* Buttons for signup and navigation */}
          <div className="signUpBtns">
            <button className="signUpBtn" onClick={handleSignup}>
              Sign Up
            </button>
            <Link to="/" className="signUpBtn">Home Page</Link>
          </div>

          {/* Show linear progress bar during loading */}
          {progressBar && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>

      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
};

export default SignUp;
