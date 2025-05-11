import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data || null });
    } catch (error) {
      console.error("Error in checkAuth:", error.response?.data || error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      if (res?.data) {
        set({ authUser: res.data });
        toast.success("Account created successfully");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      if (res?.data) {
        set({ authUser: res.data });
        toast.success("Logged in successfully");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  verifyEmail: async (code) => {
    try {
      const res = await axiosInstance.post("/auth/verify-email", { code });
      if (res?.data?.user) {
        set({ authUser: res.data.user });
        toast.success(res.data.message || "Email verified successfully");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid verification code");
    }
  },

  forgotPassword: async (email) => {
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email");
    }
  },

  resetPassword: async (data) => {
    try {
      await axiosInstance.post(`/auth/reset-password/${data.token}`, data);
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid token");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      if (res?.data) {
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error in updateProfile:", error);
      toast.error(error.response?.data?.message || "Unexpected error occurred");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
