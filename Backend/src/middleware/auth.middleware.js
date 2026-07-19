const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  try {
    let token;
    // console.log("Authorization Header:", req.headers.authorization);
    // Check Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Extract Token
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find User
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      // Attach User to Request
      req.user = user;

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token missing.",
      });
    }
  } catch (error) {
    console.error("JWT Error:", error);

    return res.status(401).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = protect;
