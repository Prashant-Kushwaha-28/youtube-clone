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
  const [sideNavbar, setSideNavbar] = useState(true);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar} />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
