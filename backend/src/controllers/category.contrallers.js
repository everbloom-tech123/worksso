import Category from "../models/category.model.js";
import cloudinary from "../lib/cloudinary.js";

// CREATE: Add a new category
export const createCategory = async (req, res) => {
  try {
    const { name, logo } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    let uploadedLogo = "";

    if (logo) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(logo, {
          folder: "categories",
          resource_type: "image",
        });
        uploadedLogo = uploadResponse.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        return res
          .status(500)
          .json({ message: "Failed to upload logo to Cloudinary." });
      }
    }

    const newCategory = new Category({ name, logo: uploadedLogo });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error in createCategory controller:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create category. Please try again." });
  }
};

// READ: Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error in getCategories controller:", error.message);
    res
      .status(500)
      .json({ message: "Failed to retrieve categories. Please try again." });
  }
};

// READ: Get a category by ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error in getCategoryById controller:", error.message);
    res
      .status(500)
      .json({ message: "Failed to retrieve the category. Please try again." });
  }
};

// UPDATE: Update a category by ID
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, logo } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    category.name = name || category.name;

    // Handle logo update if a new logo is provided
    if (logo) {
      // If the category has a logo, delete the old one from Cloudinary
      if (category.logo) {
        const publicId = category.logo.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      try {
        const uploadResponse = await cloudinary.uploader.upload(logo, {
          folder: "categories",
          resource_type: "image",
        });
        category.logo = uploadResponse.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        return res
          .status(500)
          .json({ message: "Failed to upload new logo to Cloudinary." });
      }
    }

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error("Error in updateCategory controller:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update category. Please try again." });
  }
};

// DELETE: Delete a category by ID
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Delete the category's logo from Cloudinary
    if (category.logo) {
      const publicId = category.logo.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`categories/${publicId}`);
    }

    await category.deleteOne(); // Fixed: use deleteOne instead of remove()
    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error("Error in deleteCategory controller:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete category. Please try again." });
  }
};
