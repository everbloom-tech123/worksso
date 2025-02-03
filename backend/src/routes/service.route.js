import express from "express";
const router = express.Router();

import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controllers.js";
import { get } from "mongoose";

router.post("/createService", createService);
router.get("/all", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
