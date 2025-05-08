import express from "express";
import {
    bookActivity,
    getUserBookings,
} from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { validateBooking } from "../middleware/validation.js";

const router = express.Router();

// Protected routes - require authentication
router.use(verifyToken);

// Book an activity
router.post("/", validateBooking, bookActivity);

// Get user's bookings
router.get("/my-bookings", getUserBookings);

export default router;
