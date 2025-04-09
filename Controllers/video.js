// Import the Video model
const Video = require("../Modals/video");

// Controller: Upload a new video
exports.uploadVideo = async (req, res) => {
  try {
    // Destructure fields from request body
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    // Create a new video document
    const videoUpload = new Video({
      user: req.user._id, // Associate video with logged-in user
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
    });

    // Save the video to the database
    await videoUpload.save();

    // Return success response with uploaded video
    res.status(201).json({ success: "true", videoUpload });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller: Get all videos
exports.getAllVideo = async (req, res) => {
  try {
    // Find all videos, populate user info, and sort by newest first
    const videos = await Video.find()
      .populate("user", "channelName profilePic userName createdAt about")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: "true", videos });
  } catch (error) {
    console.error("Error in getAllVideo:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller: Get a video by its ID
exports.getVideoById = async (req, res) => {
  try {
    let { id } = req.params;

    // Find the video by ID and populate user info
    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    res.status(201).json({ sucess: "true", video: video });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller: Get all videos uploaded by a specific user
exports.getAllVideoByUserID = async (req, res) => {
  try {
    let { userId } = req.params;

    // Find all videos by user ID and populate user info
    const video = await Video.find({ user: userId }).populate(
      "user",
      "channelName profilePic userName createdAt about"
    );

    res.status(201).json({ sucess: "true", video: video });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller: Suggest videos with the same videoType (category)
exports.getSuggestedVideos = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the current video to determine its category
    const currentVideo = await Video.findById(id);
    if (!currentVideo)
      return res.status(404).json({ error: "Video not found" });

    // Find other videos of the same type (excluding current one)
    const suggestions = await Video.find({
      _id: { $ne: id }, // Exclude the current video
      videoType: currentVideo.videoType,
    })
      .populate("user", "channelName")
      .sort({ createdAt: -1 })
      .limit(6); // Limit to 6 suggestions

    res.status(200).json({ success: true, suggestions });
  } catch (error) {
    console.error("Suggestion error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller: Delete a video (only by the owner)
exports.deleteVideo = async (req, res) => {
  try {
    // Find the video by ID
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json("Video not found");

    // Check if the requesting user is the owner
    if (video.user.toString() !== req.user.id)
      return res.status(403).json("You can only delete your own videos");

    // Delete the video
    await video.deleteOne();

    res.status(200).json("Video deleted successfully");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json("Internal server error");
  }
};
