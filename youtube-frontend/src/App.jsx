// Import global styles and necessary components
import './App.css';
import Navbar from './Component/Navbar/navbar';
import Home from './Pages/Home/home.jsx';
import Video from './Pages/Video/video.jsx';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile/profile.jsx';
import VideoUpload from './Pages/VideoUpload/videoUpload.jsx';
import SignUp from './Pages/SignUp/signUp.jsx';

function App() {
  // State to control visibility of the sidebar
  const [sideNavbar, setSideNavbar] = useState(true);

  // Function to update the sidebar visibility state
  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  return (
    <div className="App">
      {/* Top navigation bar, receives control functions for sidebar */}
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />

      {/* React Router route configuration */}
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />

        {/* Video watch page (dynamic ID from URL) */}
        <Route path="/watch/:id" element={<Video />} />

        {/* User profile page */}
        <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar} />} />

        {/* Video upload page */}
        <Route path="/:id/upload" element={<VideoUpload />} />

        {/* Sign-up page */}
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
