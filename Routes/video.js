// Import required modules
const express = require('express');
const router = express.Router();

// Import video controller for handling business logic
const videoController = require('../Controllers/video');

// Import authentication middleware to protect certain routes
const auth = require('../middleware/authentication');

// Route: POST /video
// Description: Upload a new video (protected)
router.post('/video', auth, videoController.uploadVideo);

// Route: GET /allVideo
// Description: Get all videos (public)
router.get('/allVideo', videoController.getAllVideo);

// Route: GET /getVideoById/:id
// Description: Get a single video by its ID (public)
router.get('/getVideoById/:id', videoController.getVideoById);

// Route: GET /:userId/channel
// Description: Get all videos uploaded by a specific user (public)
router.get('/:userId/channel', videoController.getAllVideoByUserID);

// Route: GET /suggestions/:id
// Description: Get suggested videos based on the video type/category (public)
router.get('/suggestions/:id', videoController.getSuggestedVideos);

// Route: DELETE /videos/:id
// Description: Delete a video (protected, only by owner)
router.delete('/videos/:id', auth, videoController.deleteVideo);

// Export the router to be used in the main server file
module.exports = router;
