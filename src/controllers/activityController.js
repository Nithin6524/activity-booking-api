import Activity from "../models/activityModel.js";

// Get all activities
export const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ error: "Failed to fetch activities" });
    }
};

// Create a new activity (admin only)
export const createActivity = async (req, res) => {
    try {
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json(activity);
    } catch (error) {
        console.error("Error creating activity:", error);
        res.status(400).json({ error: error.message });
    }
};
