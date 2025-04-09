// Import the Comment model
const Comment = require("../Modals/comment");

// Controller to add a new comment
exports.addComment = async (req, res) => {
  try {
    // Destructure video ID and message from the request body
    let { video, message } = req.body;

    // Create a new comment document with the logged-in user's ID
    const comment = new Comment({ user: req.user._id, video, message });

    // Save the comment to the database
    await comment.save();

    // Send a success response with the saved comment
    res.status(201).json({
      message: "success",
      comment,
    });
  } catch (error) {
    // Handle any server error
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to get all comments for a specific video
exports.getCommentByVideoId = async (req, res) => {
  try {
    // Extract videoId from route parameters
    let { videoId } = req.params;

    // Find all comments for the given video and populate user details
    const comment = await Comment.find({ video: videoId }).populate(
      "user", // Populate the user field
      "channelName profilePic userName createdAt" // Only include these fields from the user document
    );

    // Send a success response with the list of comments
    res.status(201).json({
      message: "success",
      comment,
    });
  } catch (error) {
    // Handle any server error
    res.status(500).json({ error: "Server error" });
  }
};
