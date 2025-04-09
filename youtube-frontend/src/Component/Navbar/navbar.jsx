import React, { useState, useEffect } from "react";
import "./navbar.css";

// Icons from MUI
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/login";
import axios from "axios";

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userPic, setUserPic] = useState(
    "https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain"
  );
  const [userName, setUserName] = useState("");
  const [navbarModal, setNavbarModal] = useState(false); // dropdown modal for user options
  const [login, setLogin] = useState(false); // toggles login modal
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  // Toggles user options modal (Login/Logout/Profile)
  const handleClickModal = () => {
    setNavbarModal((prev) => !prev);
  };

  // Toggles the side navbar (hamburger)
  const toggleSideNavbar = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  // Navigate to profile page
  const handleProfile = () => {
    const userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModal(false);
  };

  // Closes login modal after login/signup
  const setLoginModal = () => {
    setLogin(false);
  };

  // Handles Login/Logout actions from dropdown
  const handlePopupOptionClick = (action) => {
    setNavbarModal(false);
    if (action === "login") {
      setLogin(true);
    } else {
      localStorage.clear(); // clear all user data
      logoutUser();
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // refresh to update UI
      }, 500);
    }
  };

  // Logout API call
  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // On component mount, load user info from localStorage
  useEffect(() => {
    const userProfilePic = localStorage.getItem("userProfilePic");
    const storedUserName = localStorage.getItem("userName");
    setIsLoggedIn(!!localStorage.getItem("userId"));

    if (userProfilePic) setUserPic(userProfilePic);
    if (storedUserName) setUserName(storedUserName);
  }, []);

  // Triggers search when enter key pressed or search icon clicked
  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/?search=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <div className="navbar">
      {/* Left Section: Hamburger + Logo */}
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={toggleSideNavbar}>
          <MenuIcon sx={{ color: "white" }} />
        </div>

        <Link to="/" className="navbar_youtubeImg">
          <YouTubeIcon sx={{ fontSize: "34px" }} className="navbar_youtubeImage" />
          <div className="navbar_utubeTitle">YouTube</div>
        </Link>
      </div>

      {/* Middle Section: Search bar + mic */}
      <div className="navbar-middle">
        <div className="navabar_searchBox">
          <input
            type="text"
            placeholder="Search"
            className="navbar_searchBoxInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <div className="navbar_searchIconBox" onClick={handleSearch}>
            <SearchIcon sx={{ fontSize: "24px", color: "white" }} />
          </div>
        </div>
        <div className="navbar_mike">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      {/* Right Section: Upload, Notifications, Profile Image */}
      <div className="navbar-right">
        <Link to="/763/upload">
          <VideoCallIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
        </Link>
        <NotificationsIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
        <img
          src={userPic}
          alt="User"
          className="navbar-right-logo"
          onClick={handleClickModal}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150"; // fallback if image fails
          }}
        />

        {/* Dropdown menu for user */}
        {navbarModal && (
          <div className="navbar-modal">
            {isLoggedIn ? (
              <>
                <div className="navbar-modal-option" style={{ fontWeight: "bold", cursor: "default" }}>
                  {userName}
                </div>
                <div className="navbar-modal-option" onClick={handleProfile}>
                  Profile
                </div>
                <div className="navbar-modal-option" onClick={() => handlePopupOptionClick("logout")}>
                  Logout
                </div>
              </>
            ) : (
              <>
                <div className="navbar-modal-option" onClick={() => handlePopupOptionClick("login")}>
                  Login
                </div>
                <div
                  className="navbar-modal-option"
                  onClick={() => {
                    setNavbarModal(false);
                    navigate("/signUp");
                  }}
                >
                  Sign Up
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Conditionally render login modal */}
      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
};

export default Navbar;
