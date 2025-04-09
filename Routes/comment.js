// Import required modules
const express = require('express');
const router = express.Router();

// Import controller for handling comment logic
const CommentController = require('../Controllers/comment');

// Import authentication middleware
const auth = require('../middleware/authentication');

// Route: POST /comment
// Description: Add a new comment (protected route - requires login)
router.post('/comment', auth, CommentController.addComment);

// Route: GET /comment/:videoId
// Description: Get all comments for a specific video by its ID (public)
router.get('/comment/:videoId', CommentController.getCommentByVideoId);

// Export the router to be used in the main app
module.exports = router;
