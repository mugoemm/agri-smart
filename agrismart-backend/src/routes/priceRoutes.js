import { Router } from "express";
import { getPriceInsights } from "../controllers/priceController.js";

const router = Router();

// Public route
router.get("/", getPriceInsights);

export default router;
