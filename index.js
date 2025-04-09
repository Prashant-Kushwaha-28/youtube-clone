require('dotenv').config(); 
var express = require("express");
var app = express();
var port = 5000
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:5173", 
    credentials: true
  }))

app.use(express.json());
app.use(cookieParser());
require('./Connection/conn');

const AuthRoutes = require('./Routes/user');
const VideoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');

app.use('/auth',AuthRoutes);
app.use('/api',VideoRoutes);
app.use('/api/videos', VideoRoutes);
app.use('/commentApi',CommentRoutes);


app.listen(port,()=>{console.log(`Our backend project is running on Port ${port}`)});
