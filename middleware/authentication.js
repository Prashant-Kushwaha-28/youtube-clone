const jwt = require("jsonwebtoken");
const User = require("../Modals/user");

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token in cookie:", token);

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decode = jwt.verify(token, "Its_My_Secret_Key");
    console.log("Decoded user ID:", decode.userId);

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    console.log("Authenticated user:", user.userName); // ✅ Corrected log

    next();
  } catch (err) {
    console.log("JWT verification error:", err.message); // helpful debug
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = auth;
