import { Router } from "express";
import {
  createListing,
  getListings,
  getListing,
  deleteListing,
  updateListing
} from "../controllers/listingController.js";

import { protect, farmerOnly } from "../middleware/authMiddleware.js";

const router = Router();

// Public
router.get("/", getListings);
router.get("/:id", getListing);

// Protected (farmers only)
router.post("/", protect, farmerOnly, createListing);
router.put("/:id", protect, farmerOnly, updateListing);
router.delete("/:id", protect, farmerOnly, deleteListing);

export default router;
