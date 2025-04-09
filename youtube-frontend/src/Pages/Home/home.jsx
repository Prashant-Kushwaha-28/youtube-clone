import React from 'react';
import SideNavbar from '../../Component/SideNavbar/sideNavbar.jsx';
import HomePage from '../../Component/HomePage/homePage.jsx';
import './home.css';

const Home = ({ sideNavbar }) => {
  return (
    <div className="home">
      <SideNavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} />
    </div>
  );
};

export default Home;
