
import Booking from "../models/bookingModel.js";
import Activity from "../models/activityModel.js";

// Book an activity
export const bookActivity = async (req, res) => {
    try {
        const { activityId } = req.body;
        
        // Check if activity exists
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }
        
        // Create booking
        const booking = new Booking({
            activity: activityId,
            user: req.user.id,
        });
        
        await booking.save();
        
        res.status(201).json({ message: "Activity booked successfully", booking });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(400).json({ error: error.message });
    }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate("activity")
            .sort({ createdAt: -1 });
            
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};
