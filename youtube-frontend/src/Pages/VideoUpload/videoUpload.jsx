// Import necessary hooks, components, and libraries
import React, { useState, useEffect } from "react";
import "./videoUpload.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Main functional component for video upload
const VideoUpload = () => {
  // State to handle form input values
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
  });

  // State to manage loading spinner visibility
  const [loader, setLoader] = useState(false);

  // Hook to navigate between routes
  const navigate = useNavigate();

  // Redirect user to login if not logged in
  useEffect(() => {
    const isLogin = localStorage.getItem("userId");
    if (!isLogin) navigate("/");
  }, []);

  // Update input field values as user types
  const handleOnChangeInput = (e, field) => {
    setInputField((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Upload image or video to Cloudinary and update form state
  const uploadImage = async (e, type) => {
    setLoader(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "youtube-clone"); // Cloudinary preset

    try {
      // Upload to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/prashant28/${type}/upload`,
        formData
      );
      const url = response.data.url;
      const key = type === "image" ? "thumbnail" : "videoLink";

      // Update state with uploaded file URL
      setInputField((prev) => ({ ...prev, [key]: url }));
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoader(false);
    }
  };

  // Submit video data to backend
  const handleSubmit = async () => {
    setLoader(true);
    try {
      const res = await axios.post("http://localhost:5000/api/video", inputField, {
        withCredentials: true,
      });
      console.log("Upload success:", res.data);
      navigate("/"); // Redirect to homepage after successful upload
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  // JSX return block rendering the upload form
  return (
    <div className="videoUpload">
      <div className="uploadBox">
        {/* Page Title with YouTube Icon */}
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Upload Video
        </div>

        {/* Upload Form */}
        <div className="uploadForm">
          {/* Text Inputs for Title, Description, and Category */}
          <input
            type="text"
            placeholder="Title"
            value={inputField.title}
            onChange={(e) => handleOnChangeInput(e, "title")}
          />
          <input
            type="text"
            placeholder="Description"
            value={inputField.description}
            onChange={(e) => handleOnChangeInput(e, "description")}
          />
          <input
            type="text"
            placeholder="Category / Video Type"
            value={inputField.videoType}
            onChange={(e) => handleOnChangeInput(e, "videoType")}
          />

          {/* File input for thumbnail image */}
          <label>
            Thumbnail
            <input type="file" accept="image/*" onChange={(e) => uploadImage(e, "image")} />
          </label>

          {/* File input for video upload */}
          <label>
            Video
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              onChange={(e) => uploadImage(e, "video")}
            />
          </label>

          {/* Show loading spinner while uploading */}
          {loader && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </div>

        {/* Upload and Home Buttons */}
        <div className="uploadBtns">
          <div
            className="uploadBtn-form"
            onClick={!loader ? handleSubmit : null}
            style={{
              opacity: loader ? 0.6 : 1,
              pointerEvents: loader ? "none" : "auto",
            }}
          >
            Upload
          </div>
          <Link to="/" className="uploadBtn-form">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
