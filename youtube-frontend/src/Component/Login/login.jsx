import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // for toast notifications
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress"; // for loading animation

const Login = ({ setLoginModal }) => {
  // State for storing form input
  const [loginField, setLoginField] = useState({ userName: "", password: "" });

  // State to manage loading spinner
  const [loader, setLoader] = useState(false);

  // For auto-focusing input
  const userInputRef = useRef(null);

  // Focus on input when component mounts
  useEffect(() => {
    userInputRef.current?.focus();
  }, []);

  // Updates form fields dynamically
  const handleInputChange = (event, field) => {
    setLoginField(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  // Function to handle login API call
  const handleLogin = async () => {
    const { userName, password } = loginField;

    // Validation
    if (!userName || !password) {
      toast.warn("Please fill in all fields");
      return;
    }

    setLoader(true); // Show loading spinner
    try {
      // Make login request
      const response = await axios.post("http://localhost:5000/auth/login", loginField, {
        withCredentials: true, // important for sending cookies
      });
      setLoader(false);

      const { token, user } = response.data;

      if (user && token) {
        // Store user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user._id);
        localStorage.setItem("userProfilePic", user.profilePic);
        localStorage.setItem("userName", user.userName);

        // Reload page after successful login
        window.location.reload();
      } else {
        toast.error("Login failed: Missing user data");
      }
    } catch (error) {
      setLoader(false);
      // Show error message from backend or fallback message
      toast.error(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="login">
      <div className="login_card">
        {/* Title section */}
        <div className="titleCard_login">
          <YouTubeIcon sx={{ fontSize: "54px" }} className="login_youtubeImage" />
          Login
        </div>

        {/* Input fields */}
        <div className="loginCredentials">
          <input
            ref={userInputRef}
            className="userNameLoginUserName"
            placeholder="User Name"
            value={loginField.userName}
            onChange={(e) => handleInputChange(e, "userName")}
          />
          <input
            className="userNameLoginUserName"
            type="password"
            placeholder="Password"
            value={loginField.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
        </div>

        {/* Buttons */}
        <div className="login_buttons">
          <button className="login-btn" onClick={handleLogin}>Login</button>
          <Link to="/signup" className="login-btn" onClick={setLoginModal}>SignUp</Link>
          <button className="login-btn" onClick={setLoginModal}>Cancel</button>
        </div>

        {/* Loader bar */}
        {loader && (
          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <LinearProgress />
          </Box>
        )}
      </div>

      {/* Toast container for alerts */}
      <ToastContainer />
    </div>
  );
};

export default Login;
