import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Extract token from cookies

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    // Find user by userId from decoded token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach the user to the request object

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // Handle other generic errors
    return res.status(500).json({ message: "Internal server error" });
  }
};
