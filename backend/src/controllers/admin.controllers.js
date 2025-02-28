import User from "../models/user.model.js";

/**
 * @desc Admin Dashboard
 * @route GET /api/admin/dashboard
 * @access Admin Only
 */
export const adminDashboard = (req, res) => {
  res.status(200).json({ message: "Welcome Admin! This is the dashboard." });
};

/**
 * @desc Get All Users
 * @route GET /api/admin/users
 * @access Admin Only
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Get all users, exclude passwords
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc Delete a User
 * @route DELETE /api/admin/user/:id
 * @access Admin Only
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
