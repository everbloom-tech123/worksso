import { useState, useEffect } from "react";
import { categoryStore } from "../store/categoryStore";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const [formData, setFormData] = useState({ name: "", logo: null });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await categoryStore.getState().fetchCategories();
        if (!response || !Array.isArray(response))
          throw new Error("Invalid response format");
        setCategories(response);
      } catch (error) {
        setError("Failed to fetch categories.");
        toast.error("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, logo: reader.result });
      setLogoPreview(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingCategory) {
        await categoryStore
          .getState()
          .updateCategory(editingCategory._id, formData);
        toast.success("Category updated successfully!");
      } else {
        await categoryStore.getState().createCategory(formData);
        toast.success("Category created successfully!");
      }
      setFormData({ name: "", logo: null });
      setLogoPreview(null);
      setEditingCategory(null);
      const response = await categoryStore.getState().fetchCategories();
      setCategories(response);
    } catch (error) {
      toast.error("Failed to submit category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);
      try {
        await categoryStore.getState().deleteCategory(id);
        setCategories(categories.filter((category) => category._id !== id));
        toast.success("Category deleted successfully!");
      } catch (error) {
        console.error("Delete Error:", error.response?.data || error);
        toast.error(
          error.response?.data?.message || "Failed to delete category."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, logo: category.logo });
    setLogoPreview(category.logo);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Category Form (Now at the Top) */}
      <div className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">
          {editingCategory ? "Edit Category" : "Add New Category"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full p-2 border rounded"
            />
            {logoPreview && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold">Logo Preview:</h3>
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-24 h-24 mt-2 border rounded"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-400"
            }`}
            disabled={loading}
          >
            {loading
              ? editingCategory
                ? "Updating..."
                : "Submitting..."
              : editingCategory
              ? "Update Category"
              : "Create Category"}
          </button>
        </form>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Categories</h2>
      </div>

      {/* Category Grid (6 per row) */}
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="p-4 text-center bg-white rounded-lg shadow-lg"
            >
              <img
                src={category.logo}
                alt={category.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div className="flex justify-center mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="px-3 py-1 text-white bg-yellow-500 rounded-md hover:bg-yellow-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
