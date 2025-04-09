import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Custom hook to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HomePage = ({ sideNavbar }) => {
  // State to hold all videos
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const query = useQuery();

  // Extract search query from URL
  const searchText = query.get("search")?.toLowerCase() || "";

  // Fetch all videos from backend when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/allVideo`)
      .then((res) => {
        setData(res.data.videos); // Store videos in state
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Video categories for the top filter bar
  const options = [
    "All",
    "Virat Kohli",
    "Podcasts",
    "Indian Premier League",
    "Web Devlopment",
    "Rohit Sharma",
    "Ranbir kapor",
    "new Movie",
    "Samay Raina",
    "waqf bill",
    "Twenty20 Cricket",
    "Music",
    "Live",
    "Mixes",
    "Gaming",
    "Debates",
    "Coke Studio",
    "Democracy",
    "Comedy",
  ];

  // Navigate to a category-based search
  const handleCategoryClick = (category) => {
    if (category === "All") {
      navigate(`/`);
    } else {
      navigate(`/?search=${encodeURIComponent(category)}`);
    }
  };

  // Filter videos based on the search query (case-insensitive match on title)
  const filteredData = data.filter((video) =>
    video?.title?.toLowerCase().includes(searchText)
  );

  return (
    <div className={sideNavbar ? "homePage" : "fullHomePage"}>
      {/* Horizontal scroll bar for category filtering */}
      <div className="homePage_options">
        {options.map((item, index) => (
          <div
            key={index}
            className={`homePage_option ${
              item.toLowerCase() === searchText ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Video grid */}
      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
        {filteredData.length > 0 ? (
          filteredData.map((item, ind) => (
            <Link to={`/watch/${item._id}`} key={ind} className="youtube_Video">
              <div className="youtube_thumbnailBox">
                <img
                  src={item.thumbnail || "/images/default-thumbnail.jpg"}
                  alt="thumbnail"
                  className="youtube_thumbnailPic"
                />
              </div>

              <div className="youtubeTitleBox">
                <div className="youtubeTitleBoxProfile">
                  <img
                    src={item?.user?.profilePic || "/images/default-profile.jpg"}
                    alt="profile"
                    className="youtube_thumbnail_Profile"
                  />
                </div>

                <div className="youtubeTitleBox_Title">
                  <div className="youtube_videoTitle">
                    {item?.title || "Untitled"}
                  </div>
                  <div className="youtube_timingThubnail">30 sec video</div>
                  <div className="youtube_channelName">
                    {item?.user?.channelName || "Unknown Channel"}
                  </div>
                  <div className="youtubeVideo_views">
                    {item?.like ?? 0} {item?.like === 1 ? "like" : "likes"}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {item?.views ?? 0} {item?.views === 1 ? "view" : "views"}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          // Show this when no videos match the search
          <div className="emptySearch">
            <img
              src="/images/no-results.svg"
              alt="No results"
              style={{ width: "180px", marginBottom: "1rem" }}
            />
            <p style={{ color: "white" }}>
              No videos found for "<strong>{searchText}</strong>"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
