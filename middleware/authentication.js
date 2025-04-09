// Import required modules
const jwt = require("jsonwebtoken");
const User = require("../Modals/user");

// Middleware: Authenticate user using JWT token from cookies
const auth = async (req, res, next) => {
  // Retrieve token from cookies
  const token = req.cookies.token;
  console.log("Token in cookie:", token);

  // If token is not found, deny access
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // Verify the token using the secret key
    const decode = jwt.verify(token, "Its_My_Secret_Key");
    console.log("Decoded user ID:", decode.userId);

    // Find the user in the database and exclude the password field
    const user = await User.findById(decode.userId).select("-password");

    // If user doesn't exist, return unauthorized
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach the user object to the request for access in next middleware or route handler
    req.user = user;
    console.log("Authenticated user:", user.userName);

    // Continue to the next middleware or route
    next();
  } catch (err) {
    console.log("JWT verification error:", err.message); // Debug log
    res.status(401).json({ error: "Token is not valid" });
  }
};

// Export the middleware function
module.exports = auth;
