import { AuthService } from "../services/authService.js";

// controllers are responsible for handling incoming requests and returning responses but services are responsible for performing the actual business logic

// register function performs user registration
export const register = async (req, res) => {
    try {
        await AuthService.registerUser(req.body); // AuthService.registerUser takes the user data from the request body and registers the user in the database
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ error: error.message });
    }
};

// login function performs user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const authData = await AuthService.loginUser(email, password);
        res.status(200).json({
            message: `User logged in successfully as ${authData.role}`,
            ...authData,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(401).json({ error: error.message });
    }
};

// refreshToken function refreshes the user's access token because the access token expires after a certain time
// access token is used to authenticate and authorize the user for accessing protected routes
export const refreshToken = async (req, res) => {
    try {
        const tokens = await AuthService.refreshUserToken(
            req.body.refreshToken
        );
        res.json(tokens);
    } catch (error) {
        res.status(401).json({ error: "Invalid refresh token" });
    }
};
