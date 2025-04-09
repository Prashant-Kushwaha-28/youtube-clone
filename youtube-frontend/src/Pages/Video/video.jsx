import React, { useState, useEffect } from "react";
import "./video.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Video = () => {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoURL] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const user = {
    profilePic: localStorage.getItem("userProfilePic") || "default.png",
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
  };

  const fetchSuggestions = async (videoId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/suggestions/${videoId}`);
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/commentApi/comment/${id}`);
      setComments(res.data.comment || []);
    } catch (err) {
      console.error("Comments fetch failed:", err);
      toast.error("Failed to load comments.");
    }
  };

  useEffect(() => {
    const fetchVideoById = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/getVideoById/${id}`);
        const video = res.data.video;
        setData(video);
        setVideoURL(video?.videoLink);
        fetchComments();
        fetchSuggestions(video._id); // Fetch suggestions after video is fetched
      } catch (err) {
        console.error("Video fetch failed:", err);
        toast.error("Failed to load video.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoById();
  }, [id]);

  const handleComment = async () => {
    if (!message.trim()) return;

    const body = { message, video: id };

    try {
      const res = await axios.post(
        "http://localhost:5000/commentApi/comment",
        body,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setComments((prev) => [res.data.comment, ...prev]);
      setMessage("");
    } catch (err) {
      console.error("Comment failed:", err);
      toast.error("Please login first to comment.");
    }
  };

  if (loading) return <div className="video">Loading...</div>;
  if (!data) return <div className="video">Video not found.</div>;

  return (
    <div className="video">
      <div className="videoPostSection">
        {/* ▶️ Video */}
        <div className="video_youtube">
          {videoUrl ? (
            <video width="100%" controls autoPlay className="video_youtube_video">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="videoErrorFallback">Video not available</div>
          )}
        </div>

        {/* 📺 Video Info */}
        <div className="video_youtubeAbout">
          <div className="video_uTubeTitle">{data?.title}</div>

          <div className="youtube_video_ProfileBlock">
            <div className="youtube_video_ProfileBlock_left">
              <Link
                to={`/user/${data?.user?._id}`}
                className="youtube_video_ProfileBlock_left_img"
              >
                <img
                  className="youtube_video_ProfileBlock_left_image"
                  src={data?.user?.profilePic || "default.png"}
                  alt="Uploader"
                />
              </Link>
              <div className="youtubeVideo_subsView">
                <div className="youtubePostProfileName">
                  {data?.user?.channelName || "Unknown Channel"}
                </div>
                <div className="youtubePostProfileSubs">
                  Joined: {data?.user?.createdAt?.slice(0, 10) || "N/A"}
                </div>
              </div>
              <div className="subscribeBtnYoutube">Subscribe</div>
            </div>

            <div className="youtube_video_likeBlock">
              <div className="youtube_video_likeBlock_like">
                <ThumbUpOutlinedIcon />
              </div>
              <div className="youtube_video_likeBlock_like">
                <ThumbDownAltOutlinedIcon />
              </div>
            </div>
          </div>

          <div className="youtube_video_About">
            <div>Published: {data?.createdAt?.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>
        </div>

        {/* 💬 Comments */}
        <div className="youtubeCommentSection">
          <div className="youtubeCommentSectionTitle">
            {comments.length} Comments
          </div>

          <div className="youtubeSelfComment">
            <img
              className="video_youtubeSelfCommentProfile"
              src={user.profilePic}
              alt="Your Profile"
            />
            <div className="addAcomment">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="addAcommentInput"
                placeholder="Add a comment..."
              />
              <div className="cancelSubmitComment">
                <div className="cancelComment" onClick={() => setMessage("")}>
                  Cancel
                </div>
                <div className="cancelComment" onClick={handleComment}>
                  Comment
                </div>
              </div>
            </div>
          </div>

          <div className="youtubeOthersComments">
            {comments.map((item) => {
              const profilePic =
                item?.user?.profilePic || "/images/default-thumbnail.jpg.webp";
              const channelName = item?.user?.channelName || "Anonymous";
              const date = new Date(item?.createdAt);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div className="youtubeSelfComment" key={item._id}>
                  <img
                    className="video_youtubeSelfCommentProfile"
                    src={profilePic}
                    alt={`${channelName}'s profile`}
                  />
                  <div className="others_commentSection">
                    <div className="others_commentSectionHeader">
                      <div className="channelName_comment">{channelName}</div>
                      <div
                        className="commentTimingOthers"
                        title={date.toISOString()}
                      >
                        {formattedDate}
                      </div>
                    </div>
                    <div className="otherCommentSectionComment">
                      {item?.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🔁 Suggestions */}
      <div className="videoSuggestions">
        {suggestions.length > 0 ? (
          suggestions.map((video) => (
            <Link
              to={`/video/${video._id}`}
              className="videoSuggestionsBlock"
              key={video._id}
            >
              <div className="video_suggetion_thumbnail">
                <img
                  src={video.thumbnail}
                  className="video_suggetion_thumbnail_img"
                  alt="Suggested Video"
                />
              </div>
              <div className="video_suggetions_About">
                <div className="video_suggetions_About_title">{video.title}</div>
                <div className="video_suggetions_About_Profile">
                  {video.user?.channelName || "Unknown"}
                </div>
                <div className="video_suggetions_About_Profile">
                  {new Date(video.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="noSuggestions">No suggestions available.</div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Video;
