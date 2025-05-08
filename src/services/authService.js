import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export class AuthService {
    static async registerUser(userData) {
        const { username, email, password, phone } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            throw new Error(
                existingUser.username === username
                    ? "Username already exists"
                    : "Email already exists"
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            username,
            email,
            phone,
            password: hashedPassword,
            role: "user",
        });

        await user.save();

        // Return user without password
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
        };
    }

    static async loginUser(email, password) {
        // Find user with password included
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT token with role
        const token = this.generateToken(user._id, user.role);

        return {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token,
        };
    }

    static generateToken(userId, role) {
        return jsonwebtoken.sign(
            { id: userId, role: role }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRE || "30d" }
        );
    }

    static verifyToken(token) {
        try {
            return jsonwebtoken.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
}
