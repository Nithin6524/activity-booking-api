import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;