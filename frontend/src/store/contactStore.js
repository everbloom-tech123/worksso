import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const contactStore = create((set) => ({
  contacts: [],
  isFetchingContacts: false,
  isCreatingContact: false,
  isUpdatingContact: false,
  isDeletingContact: false,
  error: null,

  fetchContacts: async () => {
    set({ isFetchingContacts: true, error: null });
    try {
      const res = await axiosInstance.get("/contact/contacts");
      set({ contacts: res.data.contacts || [] });
    } catch (error) {
      console.error("Error in fetchContacts:", error);
      set({ error: "Failed to fetch contacts" });
      toast.error("Failed to fetch contacts");
    } finally {
      set({ isFetchingContacts: false });
    }
  },

  // Fetch all contacts with pagination
  fetchAllContacts: async (page = 1, limit = 10) => {
    set({ isFetchingContacts: true, error: null });
    try {
      const res = await axiosInstance.get(
        `/contact/contacts?page=${page}&limit=${limit}`
      );
      console.log("Fetched Contacts:", res.data.contacts);
      set({ contacts: res.data.contacts || [] });
    } catch (error) {
      console.error("Error in fetchAllContacts:", error);
      set({ error: "Failed to fetch contacts" });
      toast.error("Failed to fetch contacts");
    } finally {
      set({ isFetchingContacts: false });
    }
  },

  // Create a new contact
  createContact: async (contactData) => {
    set({ isCreatingContact: true, error: null });
    try {
      const res = await axiosInstance.post(
        "/contact/createContact",
        contactData
      );
      console.log("Created Contact:", res.data.contact);
      set((state) => ({
        contacts: [res.data.contact, ...state.contacts],
      }));
      toast.success("Contact created successfully");
      return res.data.contact;
    } catch (error) {
      console.error("Error in createContact:", error);
      set({ error: "Failed to create contact" });
      toast.error("Failed to create contact");
      return null;
    }
  },

  //delete a contact
  deleteContact: async (contactId) => {
    set({ isDeletingContact: true, error: null });
    try {
      const res = await axiosInstance.delete(`/contact/delete/${contactId}`);
      console.log("Deleted Contact:", res.data.contact);
      set((state) => ({
        contacts: state.contacts.filter((contact) => contact._id !== contactId),
      }));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error in deleteContact:", error);
      set({ error: "Failed to delete contact" });
      toast.error("Failed to delete contact");
    } finally {
      set({ isDeletingContact: false });
    }
  },
}));
