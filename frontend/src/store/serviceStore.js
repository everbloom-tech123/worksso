import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const serviceStore = create((set) => ({
  services: [],
  isFetchingServices: false,
  isCreatingService: false,
  isUpdatingService: false,
  isDeletingService: false,
  error: null,

  fetchServices: async () => {
    set({ isFetchingServices: true, error: null });
    try {
      const res = await axiosInstance.get("/service/services");
      set({ services: res.data.services || [] });
    } catch (error) {
      console.error("Error in fetchServices:", error);
      set({ error: "Failed to fetch services" });
      toast.error("Failed to fetch services");
    } finally {
      set({ isFetchingServices: false });
    }
  },

  // Fetch all services with pagination
  fetchAllServices: async (page = 1, limit = 10) => {
    set({ isFetchingServices: true, error: null });
    try {
      const res = await axiosInstance.get(
        `/service/services?page=${page}&limit=${limit}`
      );
      console.log("Fetched Services:", res.data.services);
      set({ services: res.data.services || [] });
    } catch (error) {
      console.error("Error in fetchAllServices:", error);
      set({ error: "Failed to fetch services" });
      toast.error("Failed to fetch services");
    } finally {
      set({ isFetchingServices: false });
    }
  },

  // Fetch services by category
  fetchServicesByCategory: async (categoryId) => {
    set({ isFetchingServices: true, error: null });

    try {
      console.log(
        "Sending request to backend:",
        `/service/category/${categoryId}`
      );

      const res = await axiosInstance.get(`/service/category/${categoryId}`);
      console.log("Received response:", res.data);

      set({ services: res.data.services || [], total: res.data.total || 0 });
      return res.data; // Ensure we return the data
    } catch (error) {
      console.error("Error in fetchServicesByCategory:", error);
      set({ error: "Failed to fetch services by category" });
      toast.error("Failed to fetch services by category");
      return { services: [] }; // Return empty array to prevent errors
    } finally {
      set({ isFetchingServices: false });
    }
  },

  // Create a new service
  createService: async (data) => {
    set({ isCreatingService: true });
    try {
      console.log("Sending data to backend:", data);
      const res = await axiosInstance.post("/service/createService", data);
      console.log("Response from backend:", res.data);
      set((state) => ({ services: [...state.services, res.data] }));
      toast.success("Service created successfully");
    } catch (error) {
      console.error("Error in createService:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to create service");
    } finally {
      set({ isCreatingService: false });
    }
  },

  // Update an existing service
  updateService: async (id, data) => {
    set({ isUpdatingService: true });
    try {
      const res = await axiosInstance.put(`/service/${id}`, data);
      set((state) => ({
        services: state.services.map((service) =>
          service.id === id ? res.data : service
        ),
      }));
      toast.success("Service updated successfully");
    } catch (error) {
      console.error("Error in updateService:", error);
      toast.error(error.response?.data?.message || "Failed to update service");
    } finally {
      set({ isUpdatingService: false });
    }
  },

  // Delete a service
  deleteService: async (id) => {
    set({ isDeletingService: true });
    try {
      await axiosInstance.delete(`/service/${id}`);
      set((state) => ({
        services: state.services.filter((service) => service.id !== id),
      }));
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Error in deleteService:", error);
      toast.error(error.response?.data?.message || "Failed to delete service");
    } finally {
      set({ isDeletingService: false });
    }
  },
}));
