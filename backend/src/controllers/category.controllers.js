import Category from "../models/category.model.js";

/**  Create a new category */
export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory)
      return res.status(400).json({ message: "Category already exists" });

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error in createCategory:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**  Get all categories */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error in getAllCategories:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**  Update a category */
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error in updateCategory:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**  Delete a category */
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCategory:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
