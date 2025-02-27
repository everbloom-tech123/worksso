import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All field are required " });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid Credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // Destructure the fields from req.body inside the function where req is available
    const { profilePic, name, location, phone, bio } = req.body;
    const userId = req.user._id; // Assuming req.user is populated by authentication middleware

    let updatedFields = {};

    if (profilePic) {
      try {
        // Upload the profile picture to Cloudinary (example with max size of 10MB)
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
          max_file_size: 5 * 1024 * 1024, // 10MB limit
          resource_type: "image", // Ensure it's an image
        });

        updatedFields.profilePic = uploadResponse.secure_url;
      } catch (error) {
        console.log("Error uploading to Cloudinary:", error);
        return res
          .status(400)
          .json({ message: "File upload failed or exceeded size limit." });
      }
    }

    // Update other fields if provided
    if (name) updatedFields.name = name;
    if (location) updatedFields.location = location;
    if (phone) updatedFields.phone = phone;
    if (bio) updatedFields.bio = bio;

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Find and update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
