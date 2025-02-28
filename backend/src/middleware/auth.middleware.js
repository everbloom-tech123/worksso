import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to protect routes and check role-based access
export const protectRoute = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Find the user in the database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to protect routes based on roles
export const protectRole = (roles = []) => {
  return (req, res, next) => {
    // Check if the user role matches the required roles
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden - Insufficient permissions" });
    }
    next();
  };
};
