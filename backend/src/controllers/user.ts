import { RequestHandler } from "express";
import User from "../models/user"; // Assuming the User model is defined here
import createHttpError from "http-errors";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { name, profilePictureURL } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }
    const newUser = await User.create({ name, profilePictureURL });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    // If no user is found, throw a 404 error
    if (user === null) {
      throw createHttpError(404, "User not found.");
    }

    // Respond with the user data
    res.status(200).json(user);
  } catch (error) {
    // Pass errors to the global error handler
    next(error);
  }
};
