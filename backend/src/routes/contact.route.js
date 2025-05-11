// In contact.route.js
import express from "express";
import {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  deleteContactMessage,
} from "../controllers/contact.controllers.js";

const router = express.Router();

router.post("/createContact", createContactMessage);
router.get("/contact", getAllContactMessages);
router.get("/:id", getContactMessageById);
router.delete("/:id", deleteContactMessage);

export default router; // Make sure this is a default export
