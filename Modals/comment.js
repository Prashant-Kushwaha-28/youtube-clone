// Import mongoose
const mongoose = require("mongoose");

// Define the schema for comments
const commentSchema = new mongoose.Schema(
  {
    // Reference to the user who posted the comment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',  // Refers to the User model
      required: true,
    },

    // Reference to the video on which the comment was made
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'video', // Refers to the Video model
      required: true,
    },

    // The actual comment/message text
    message: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export the comment model
module.exports = mongoose.model('comment', commentSchema);
