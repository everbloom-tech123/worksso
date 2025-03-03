import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const categoryStore = create((set) => ({
  categories: [],
  isFetchingCategories: false,
  isCreatingCategory: false,
  isUpdatingCategory: false,
  isDeletingCategory: false,

  fetchCategories: async () => {
    set({ isFetchingCategories: true });
    try {
      const res = await axiosInstance.get("/category/getCategory");
      set({ categories: res.data });
      return res.data; // <-- Return the data to the caller
    } catch (error) {
      console.error("Error in fetchCategories:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Failed to fetch categories"
      );
      return []; // <-- Return an empty array to prevent undefined errors
    } finally {
      set({ isFetchingCategories: false });
    }
  },

  createCategory: async (data) => {
    set({ isCreatingCategory: true });
    try {
      const res = await axiosInstance.post("/category/createCategory", data);
      set((state) => ({ categories: [...state.categories, res.data] }));
      toast.success("Category created successfully");
    } catch (error) {
      console.error("Error in createCategory:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to create category");
    } finally {
      set({ isCreatingCategory: false });
    }
  },

  updateCategory: async (id, data) => {
    set({ isUpdatingCategory: true });
    try {
      const res = await axiosInstance.put(`/category/${id}`, data);
      set((state) => {
        const updatedCategories = state.categories.map((category) =>
          category._id === id ? res.data : category
        );
        return { categories: updatedCategories };
      });
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Error in updateCategory:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update category");
    } finally {
      set({ isUpdatingCategory: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isDeletingCategory: true });
    try {
      await axiosInstance.delete(`/category/${id}`);
      set((state) => ({
        categories: state.categories.filter((category) => category._id !== id),
      }));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error in deleteCategory:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to delete category");
    } finally {
      set({ isDeletingCategory: false });
    }
  },
}));
