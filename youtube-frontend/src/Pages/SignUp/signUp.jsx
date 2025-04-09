import React, { useState } from "react";
import "./signUp.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const navigate = useNavigate();

  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    "https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain"
  );

  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
  });

  const [progressBar, setProgressBar] = useState(false);

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setSignUpField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSignup = async () => {
    try {
      setProgressBar(true);
      const res = await axios.post(
        `${baseUrl}/auth/signUp`,
        signUpField,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setProgressBar(false);
    }
  };

  return (
    <div className="signUp">
      <div className="signup_card">
        <div className="signUp_title">
          <YouTubeIcon sx={{ fontSize: "54px" }} className="login_youtubeImage" />
          SignUp
        </div>

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

          <div className="image_upload_signup">
            <input type="file" accept="image/*" onChange={uploadImage} />
            <div className="image_upload_signup_div">
              <img className="image_default_signUp" src={uploadedImageUrl} alt="Profile Preview" />
            </div>
          </div>

          <div className="signUpBtns">
            <button className="signUpBtn" onClick={handleSignup}>
              Sign Up
            </button>
            <Link to="/" className="signUpBtn">Home Page</Link>
          </div>

          {progressBar && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
