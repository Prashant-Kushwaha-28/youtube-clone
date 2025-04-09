const Video = require("../Modals/video");

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    const videoUpload = new Video({
      user: req.user._id,
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
    });
    await videoUpload.save();

    res.status(201).json({ success: "true", videoUpload });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("user", "channelName profilePic userName createdAt about")
      .sort({ createdAt: -1 }); // newest first, optional

    res.status(200).json({ success: "true", videos });
  } catch (error) {
    console.error("Error in getAllVideo:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    let { id } = req.params;
    // // please watch the video for the code
    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    res.status(201).json({ sucess: "true", video: video });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllVideoByUserID = async (req, res) => {
  try {
    let { userId } = req.params;
    const video = await Video.find({ user: userId }).populate(
      "user",
      "channelName profilePic userName createdAt about"
    );
    res.status(201).json({ sucess: "true", video: video });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Suggest videos based on same videoType (category)
exports.getSuggestedVideos = async (req, res) => {
  try {
    const { id } = req.params;

    // Get current video to find its videoType
    const currentVideo = await Video.findById(id);
    if (!currentVideo)
      return res.status(404).json({ error: "Video not found" });

    // Find other videos of same type, excluding current video
    const suggestions = await Video.find({
      _id: { $ne: id },
      videoType: currentVideo.videoType,
    })
      .populate("user", "channelName")
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({ success: true, suggestions });
  } catch (error) {
    console.error("Suggestion error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json("Video not found");

    // Check if user is the owner
    if (video.user.toString() !== req.user.id)
      return res.status(403).json("You can only delete your own videos");

    await video.deleteOne();
    res.status(200).json("Video deleted successfully");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json("Internal server error");
  }
};
