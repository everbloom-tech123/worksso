import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const serviceStore = create((set) => ({
  services: [],
  isFetchingServices: false,
  isCreatingService: false,
  isUpdatingService: false,
  isDeletingService: false,

  fetchServices: async () => {
    set({ isFetchingServices: true });
    try {
      const res = await axiosInstance.get("/service");
      set({ services: res.data });
    } catch (error) {
      console.log("Error in fetchServices:", error);
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
