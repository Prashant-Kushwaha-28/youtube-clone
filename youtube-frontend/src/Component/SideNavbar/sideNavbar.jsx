import React from "react";
import "./sideNavbar.css";

// MUI Icons for each sidebar item
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ContentCutIcon from "@mui/icons-material/ContentCut";

const SideNavbar = ({ sideNavbar }) => {
  return (
    <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"}>
      {/* -------- MAIN NAV LINKS -------- */}
      <div className="home_sideNavbarTop">
        <div className="home_sideNavbarTopOption">
          <HomeIcon />
          <div className="home_sideNavbarTopOptionTitle">Home</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <VideocamIcon />
          <div className="home_sideNavbarTopOptionTitle">Shorts</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <SubscriptionsIcon />
          <div className="home_sideNavbarTopOptionTitle">Subscription</div>
        </div>
      </div>

      <hr className="sideNavbarDivider" />

      {/* -------- 'YOU' SECTION -------- */}
      <div className="home_sideNavbarMiddle">
        {/* Header with expandable icon (just visual here) */}
        <div className="home_sideNavbarTopOption">
          <div className="home_sideNavbarTopOptionTitle">You</div>
          <ChevronRightIcon />
        </div>

        <div className="home_sideNavbarTopOption">
          <RecentActorsIcon />
          <div className="home_sideNavbarTopOptionTitle">Your channel</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <HistoryIcon />
          <div className="home_sideNavbarTopOptionTitle">History</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <PlaylistAddIcon />
          <div className="home_sideNavbarTopOptionTitle">Playlists</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <SmartDisplayOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Your videos</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <WatchLaterOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Watch later</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <ThumbUpAltOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <ContentCutIcon />
          <div className="home_sideNavbarTopOptionTitle">Your clips</div>
        </div>
      </div>

      <hr className="sideNavbarDivider" />

      {/* -------- SUBSCRIPTIONS SECTION -------- */}
      <div className="home_sideNavbarMiddle">
        {/* Section header */}
        <div className="home_sideNavbarTopOption">
          <div className="home_sideNavbarTopOptionTitleHeader">
            Subscriptions
          </div>
        </div>

        {/* Example subscriptions (static for now) */}
        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_ImgLogo"
            src="https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg"
            alt="Aaj Tak"
          />
          <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_ImgLogo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBvadbtzlJyF5wvmwIJRFH71Q93av0p7pklQ&s"
            alt="Lallantop"
          />
          <div className="home_sideNavbarTopOptionTitle">The LallanTop</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_ImgLogo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW__LeJsnrSCy0twaCt-Mb8ew21k1ob41nZg&s"
            alt="IPL"
          />
          <div className="home_sideNavbarTopOptionTitle">IPL</div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
