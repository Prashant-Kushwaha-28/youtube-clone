import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Login = ({ setLoginModal }) => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [loader, setLoader] = useState(false);
  const userInputRef = useRef(null);

  useEffect(() => {
    userInputRef.current?.focus();
  }, []);

  const handleInputChange = (event, field) => {
    setLoginField(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleLogin = async () => {
    const { userName, password } = loginField;

    if (!userName || !password) {
      toast.warn("Please fill in all fields");
      return;
    }

    setLoader(true);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", loginField, {
        withCredentials: true,
      });
      setLoader(false);

      const { token, user } = response.data;
      if (user && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user._id);
        localStorage.setItem("userProfilePic", user.profilePic);
        localStorage.setItem("userName", user.userName);
        window.location.reload();
      } else {
        toast.error("Login failed: Missing user data");
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="login">
      <div className="login_card">
        <div className="titleCard_login">
          <YouTubeIcon sx={{ fontSize: "54px" }} className="login_youtubeImage" />
          Login
        </div>

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

        <div className="login_buttons">
          <button className="login-btn" onClick={handleLogin}>Login</button>
          <Link to="/signup" className="login-btn" onClick={setLoginModal}>SignUp</Link>
          <button className="login-btn" onClick={setLoginModal}>Cancel</button>
        </div>

        {loader && (
          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <LinearProgress />
          </Box>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
