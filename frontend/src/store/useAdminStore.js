import { create } from "zustand";
import { axiosInstance } from "../lib/axios"; // import your axiosInstance

// Create a store using Zustand
export const useAdminStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,

  // Action to fetch users
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/users");
      set({ users: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
