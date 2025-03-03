import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.contrallers.js";

const router = express.Router();

// Route to create a new category
router.post("/createCategory", createCategory);

// Route to get all categories
router.get("/getCategory", getCategories);

// Route to get a category by ID
router.get("/:id", getCategoryById);

// Route to update a category by ID
router.put("/:id", updateCategory);

// Route to delete a category by ID
router.delete("/:id", deleteCategory);

export default router;
