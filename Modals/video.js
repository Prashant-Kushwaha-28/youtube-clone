// Import mongoose
const mongoose = require("mongoose");

// Define the schema for videos
const videoSchema = new mongoose.Schema(
  {
    // Reference to the user who uploaded the video
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Refers to the User model
      required: true,
    },

    // Title of the video
    title: {
      type: String,
      required: true,
    },

    // Optional description of the video
    description: {
      type: String,
    },

    // Link to the video file or streaming URL
    videoLink: {
      type: String,
      required: true,
    },

    // Thumbnail image URL or path
    thumbnail: {
      type: String,
      required: true,
    },

    // Video category/type, defaults to "All"
    videoType: {
      type: String,
      default: "All",
    },

    // Number of likes the video has received
    like: {
      type: Number,
      default: 0,
    },

    // Number of dislikes the video has received
    dislike: {
      type: Number,
      default: 0,
    },
  },
  {
    // Automatically includes createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export the video model
module.exports = mongoose.model('video', videoSchema);
