 import express from "express";
 import {
     register,
     login,
     refreshToken,
 } from "../controllers/authController.js";
 import {
     validateRegistration,
     validateLogin,
 } from "../middleware/validation.js";

 const router = express.Router();

 // POST /api/auth/register - Register a new user
 router.post("/register", validateRegistration, register);

 // POST /api/auth/login - Login a user
 router.post("/login", validateLogin, login);

 // POST /api/auth/refresh - Refresh access token
 router.post("/refresh", refreshToken);

 export default router;