import React, { useState, useEffect } from "react";
import "./videoUpload.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
  });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("userId");
    if (!isLogin) navigate("/");
  }, []);

  const handleOnChangeInput = (e, field) => {
    setInputField((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const uploadImage = async (e, type) => {
    setLoader(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "youtube-clone");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/prashant28/${type}/upload`,
        formData
      );
      const url = response.data.url;
      const key = type === "image" ? "thumbnail" : "videoLink";

      setInputField((prev) => ({ ...prev, [key]: url }));
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const res = await axios.post("http://localhost:5000/api/video", inputField, {
        withCredentials: true,
      });
      console.log("Upload success:", res.data);
      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="videoUpload">
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Upload Video
        </div>

        <div className="uploadForm">
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

          <label>
            Thumbnail
            <input type="file" accept="image/*" onChange={(e) => uploadImage(e, "image")} />
          </label>

          <label>
            Video
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              onChange={(e) => uploadImage(e, "video")}
            />
          </label>

          {loader && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </div>

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
