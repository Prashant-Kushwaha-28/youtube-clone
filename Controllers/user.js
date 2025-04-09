// Import required modules
const User = require("../Modals/user");
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating JWT tokens

// Cookie options used during sign-in and logout
const cookieOptions = {
  httpOnly: true,  // Makes cookies inaccessible to JavaScript on the client (helps prevent XSS)
  secure: false,   // Should be true in production to ensure cookies are only sent over HTTPS
  sameSite: "Lax"  // Controls when cookies are sent; "Lax" is generally safe for authentication
};

// Controller: Register a new user
exports.signUp = async (req, res) => {
  try {
    const { channelName, userName, about, profilePic, password } = req.body;

    // Check if the username is already taken
    const isExist = await User.findOne({ userName });
    console.log(isExist);

    if (isExist) {
      // If username exists, return error
      res.status(400).json({
        error: "Username is already taken. Please try a different one.",
      });
    } else {
      // Hash the password before saving
      let updatePass = await bcrypt.hash(password, 10);

      // Create and save the new user
      const user = new User({
        channelName,
        userName,
        about,
        profilePic,
        password: updatePass,
      });
      await user.save();

      // Return success response with the user data
      res.status(201).json({
        message: "User registered successfully",
        success: "yes",
        data: user,
      });
    }
  } catch (error) {
    // Handle server error
    res.status(500).json({ error: "Server error" });
  }
};

// Controller: Login a user
exports.signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ userName });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, "Its_My_Secret_Key");

      // Set the token in cookies
      res.cookie("token", token, cookieOptions);

      // Return success response with user info and token
      res.json({
        message: "Logged in successfully",
        success: "true",
        token,
        user: {
          _id: user._id,
          profilePic: user.profilePic,
          channelName: user.channelName,
          userName: user.userName,
        },
      });
    } else {
      // If credentials are invalid
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (errorMsg) {
    // Handle server error
    res.status(500).json({ error: "Server error" });
  }
};

// Controller: Logout the user by clearing the token cookie
exports.logout = async (req, res) => {
  res
    .clearCookie("token", cookieOptions) // Clear the token cookie
    .json({ message: "Logged out successfully" }); // Return success message
};
