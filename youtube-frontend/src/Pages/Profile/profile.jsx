import React, { useState, useEffect } from "react";
import "./profile.css";
import SideNavbar from "../../Component/SideNavbar/sideNavbar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = ({ sideNavbar }) => {
  // Get user ID from the URL params
  const { id } = useParams();

  // State to store videos, user info, and loading status
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data and videos
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/${id}/channel`);
        setVideos(res.data.video || []);
        setUser(res.data.video?.[0]?.user || null); // Extract user from the first video if available
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfileData();
  }, [id]);

  // Set the document title to the channel name when user data is available
  useEffect(() => {
    if (user?.channelName) {
      document.title = `${user.channelName} - Channel`;
    }
  }, [user]);

  // Function to delete a video
  const handleDelete = async (videoId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this video?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:5000/api/videos/${videoId}`, {
        withCredentials: true,
      });

      // Remove the deleted video from UI
      setVideos((prevVideos) => prevVideos.filter((v) => v._id !== videoId));
    } catch (err) {
      console.error("Failed to delete video:", err);
    }
  };

  return (
    <div className="profile">
      {/* Sidebar Navigation */}
      <SideNavbar sideNavbar={sideNavbar} />

      {/* Main Profile Content */}
      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
        {loading ? (
          <div className="profile_loading">Loading profile...</div>
        ) : (
          <>
            {/* Top Section: Banner, Profile Pic, Channel Info */}
            <div className="profile_top_section">
              <div className="profile_banner" />

              <div className="profile_top_section_profile">
                <img
                  className="profile_top_section_img"
                  src={user?.profilePic || "/images/default-thumbnail.jpg.webp"}
                  alt="Profile"
                />
              </div>

              <div className="profile_top_section_About">
                <div className="profile_top_section_About_Name">
                  {user?.channelName || "No Channel Name"}
                </div>
                <div className="profile_top_section_info">
                  {user?.userName || "Anonymous"} • {videos.length} video
                  {videos.length !== 1 ? "s" : ""}
                </div>
                <div className="profile_top_section_info">
                  {user?.about || "No channel description provided."}
                </div>
                <button className="subscribe-btn">Subscribe</button>
              </div>
            </div>

            {/* Video Gallery Section */}
            <div className="profile_videos">
              <div className="profile_videos_title">
                Videos <ArrowRightIcon />
              </div>

              <div className="profileVideos">
                {videos.length === 0 ? (
                  <div className="no-videos-message">No videos uploaded yet.</div>
                ) : (
                  videos.map((video) => (
                    <div key={video._id} className="profileVideo_block_wrapper">
                      {/* Link to video watch page */}
                      <Link to={`/watch/${video._id}`} className="profileVideo_block">
                        <div className="profileVideo_block_thumbnail">
                          <img
                            src={video.thumbnail || "/images/default-thumbnail.jpg.webp"}
                            alt="Video thumbnail"
                            className="profileVideo_block_thumbnail_img"
                          />
                        </div>

                        <div className="profileVideo_block_detail">
                          <div className="profileVideo_block_detail_name">
                            {video.title || "Untitled"}
                          </div>
                          <div className="profileVideo_block_detail_about">
                            Created on {new Date(video.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </Link>

                      {/* Delete button for video */}
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(video._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
