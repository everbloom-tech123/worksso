import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const serviceStore = create((set) => ({
  services: [],
  isFetchingServices: false,
  isCreatingService: false,
  isUpdatingService: false,
  isDeletingService: false,

  fetchAllServices: async (page = 1, limit = 10) => {
    set({ isFetchingServices: true });
    try {
      const res = await axiosInstance.get(
        `/service/services?page=${page}&limit=${limit}`
      );
      console.log("Fetched Services:", res.data.services); // Debugging
      set({ services: res.data.services || [] }); // Ensure array is set
    } catch (error) {
      console.log("Error in fetchAllServices:", error);
    } finally {
      set({ isFetchingServices: false });
    }
  },

  fetchServices: async () => {
    set({ isFetchingServices: true });
    try {
      const res = await axiosInstance.get("/service/user"); // No need to pass userId
      console.log("Fetched services:", res.data); // Log the response to check the data
      set({ services: res.data });
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      toast.error("Failed to fetch services");
    } finally {
      set({ isFetchingServices: false });
    }
  },

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
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingService: false });
    }
  },

  deleteService: async (id) => {
    set({ isDeletingService: true });
    try {
      await axiosInstance.delete(`/service/${id}`);
      set((state) => ({
        services: state.services.filter((service) => service.id !== id),
      }));
      toast.success("Service deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isDeletingService: false });
    }
  },
}));
