import React from 'react';
// Importing the Sidebar component which appears on the left
import SideNavbar from '../../Component/SideNavbar/sideNavbar.jsx';
// Importing the main HomePage component which shows the main feed/content
import HomePage from '../../Component/HomePage/homePage.jsx';
// Importing CSS for styling the home layout
import './home.css';

// Main Home component that combines the sidebar and homepage feed
const Home = ({ sideNavbar }) => {
  return (
    <div className="home">
      {/* Renders the left sidebar navigation; visibility depends on sideNavbar prop */}
      <SideNavbar sideNavbar={sideNavbar} />

      {/* Renders the main home page content area */}
      <HomePage sideNavbar={sideNavbar} />
    </div>
  );
};

export default Home;
