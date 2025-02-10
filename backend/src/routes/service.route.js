import express from "express";
const router = express.Router();

import {
  createService,
  getAllServices,
  getServiceByUserId,
  updateService,
  deleteService,
} from "../controllers/service.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

// Create a new service
router.post("/createService", protectRoute, createService); // Use '/services' instead of '/createService'

// Get all services
router.get("/service", getAllServices); // Use '/services' for retrieving all

// Get a single service by its ID
router.get("/user", protectRoute, getServiceByUserId);

// Update a service by ID
router.put("/:id", protectRoute, updateService); // Protect the route for updates

// Delete a service by ID
router.delete("/:id", protectRoute, deleteService); // Protect the route for deletions

export default router;
