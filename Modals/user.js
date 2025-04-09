// Import mongoose
const mongoose = require("mongoose");

// Define the schema for users
const userSchema = new mongoose.Schema(
  {
    // Display name of the user's channel
    channelName: {
      type: String,
      required: true,
    },

    // Unique username used for login and display
    userName: {
      type: String,
      required: true,
      unique: true, // Ensures no two users can have the same userName
    },

    // Hashed password of the user
    password: {
      type: String,
      required: true,
    },

    // Short description about the user or their channel
    about: {
      type: String,
      required: true,
    },

    // URL or path to the profile picture
    profilePic: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically manages createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export the user model
module.exports = mongoose.model('user', userSchema);
