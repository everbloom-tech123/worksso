import express from "express";
import { protectRoute, protectRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin-only route
router.get(
  "/admin/dashboard",
  protectRoute,
  protectRole(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome to the admin dashboard!" });
  }
);

export default router;
