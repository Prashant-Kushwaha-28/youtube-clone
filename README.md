# 🎥 YouTube Clone – MERN Stack Capstone Project

A full-stack YouTube-like video sharing platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project allows users to browse, search, upload, and interact with videos, mimicking core functionalities of YouTube.

---

## 📌 Project Features

### 🚀 Frontend (React.js)
- **Home Page**
  - YouTube-style header and static sidebar (toggleable)
  - Filter buttons by category
  - Responsive grid layout of video cards (thumbnail, title, views, channel name)

- **Authentication**
  - JWT-based sign up and login (username, email, password)
  - Sign in via Google-style form page
  - Authenticated users see their name and can interact with content

- **Search & Filter**
  - Search bar in header filters videos by title
  - Category filters for video type browsing

- **Video Player Page**
  - Play selected video with title, description, likes/dislikes
  - Comment section with add/edit/delete capabilities
  - Real-time update of comments in the DB

- **Channel Page**
  - Users can create and manage their own channels
  - View, edit, and delete their uploaded videos
  - Custom layout showing channel videos and banner

- **Responsive Design**
  - Works seamlessly across mobile, tablet, and desktop

---

### 🛠️ Backend (Node.js + Express.js)
- **Authentication API**
  - User sign up, login, JWT token generation & validation

- **Channel Management**
  - Create and fetch user channels
  - Manage channel info and videos

- **Video Management**
  - Upload, fetch, update, delete videos
  - Metadata includes title, description, views, likes, dislikes

- **Comments**
  - Add, fetch, edit, and delete comments
  - Each comment tied to a video and user

---

### 🧠 Database (MongoDB)
MongoDB is used to store:
- User details
- Video metadata (title, thumbnail, URL, views, etc.)
- Channel information
- Comments per video

---

## 🧰 Technologies Used

| Area        | Tech Stack                         |
|-------------|------------------------------------|
| Frontend    | React, React Router, Axios         |
| Backend     | Node.js, Express.js                |
| Database    | MongoDB (Local or Atlas)           |
| Auth        | JWT (JSON Web Token)               |
| Version Control | Git, GitHub                    |

---

## 📁 Folder Structure

📦 project-root/
├── Connection/               # DB connection
├── Controllers/              # Controllers for user, video, comment
├── Modals/                   # MongoDB models (user, video, comment)
├── Routes/                   # Express routes
├── middleware/               # Auth middleware
├── index.js                  # Entry point (backend)
├── youtube-frontend/         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── Component/        # Navbar, SideNav, Login, HomePage, etc.
│   │   ├── Pages/            # Home, Video, Profile, Upload, SignUp
│   │   ├── assets/
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│______ YouTube Clone\README.md

▶️ Run Locally

1. Clone the repo bash :-- git -- https://github.com/Prashant-Kushwaha-28/youtube-clone

2. Backend Setup :
cd youtube-clone 
npm install
npm start

3. Frontend Setup :
cd youtube-clone
cd youtube-frontend
npm install
npm run dev

Make sure MongoDB is running locally or update the MongoDB URI in conn.js.

📽️ Demo Video
 watch the demo Video for Clearity 

📝 Evaluation Rubrics 
Category	         Criteria	
Frontend	      UI/UX, Auth, Video Player, Channel
Backend	          APIs, MongoDB Handling, JWT	
Search & Filter	  Search by Title, Filter by Category
Responsiveness	  Mobile/Tablet/Desktop layout
Code Quality	  Clean structure, folder organization


👨‍💻 Author :-- Prashant Kushwaha
Capstone Project – YouTube Clone
GitHub: https://github.com/Prashant-Kushwaha-28/

