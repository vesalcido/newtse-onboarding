import express from "express";
import { createUser, getUser } from "../controllers/user";
import { createUser as validateCreateUser } from "../validators/user";

const router = express.Router();

// Route to create a new user
router.post("/api/user", validateCreateUser, createUser);

// Route to retrieve a user by ID
router.get("/api/user/:id", getUser);

export default router;
