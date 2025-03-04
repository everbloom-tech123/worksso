import express from "express";
const router = express.Router();

import {
  createService,
  getAllServices,
  getServiceByUserId,
  updateService,
  deleteService,
  getServiceByCategoryID,
} from "../controllers/service.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

// Create a new service
router.post("/createService", protectRoute, createService);

// Get all services
router.get("/services", getAllServices);

// Get a single service by its ID
router.get("/user", protectRoute, getServiceByUserId);

// Update a service by ID
router.put("/:id", protectRoute, updateService);

// Delete a service by ID
router.delete("/:id", protectRoute, deleteService);

// Get services by category ID
router.get("/category/:id", getServiceByCategoryID);

export default router;
