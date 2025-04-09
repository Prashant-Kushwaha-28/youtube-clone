// Load environment variables from .env file
require('dotenv').config();

// Import required modules
var express = require("express");
var app = express();
var port = 5000; // Port where server will run
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Enable CORS to allow frontend (React) to communicate with backend
app.use(cors({
  origin: "http://localhost:5173", // Your frontend's origin
  credentials: true // Allow cookies to be sent across origins
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse cookies from requests
app.use(cookieParser());

// Connect to MongoDB database
require('./Connection/conn');

// Import route modules
const AuthRoutes = require('./Routes/user');        // User authentication routes
const VideoRoutes = require('./Routes/video');      // Video upload, fetch, etc.
const CommentRoutes = require('./Routes/comment');  // Comments functionality

// Mount route handlers
app.use('/auth', AuthRoutes);          // Routes for sign in, sign up, etc.
app.use('/api', VideoRoutes);          // Video routes (duplicated path for flexibility)
app.use('/api/videos', VideoRoutes);   // (Optional) Alternative route for videos
app.use('/commentApi', CommentRoutes); // Routes to handle comments

// Start the server
app.listen(port, () => {
  console.log(`Our backend project is running on Port ${port}`);
});
