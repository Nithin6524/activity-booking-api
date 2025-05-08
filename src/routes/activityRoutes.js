import express from "express";
import {
    getAllActivities,
    createActivity,
} from "../controllers/activityController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route - Get all activities
router.get("/", getAllActivities);

// Admin only route - Create activity
router.post("/", verifyToken, requireRole("admin"), createActivity);

export default router;
