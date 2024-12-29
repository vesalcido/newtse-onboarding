import { body } from "express-validator";

export const createUser = [
  body("name").isString().notEmpty().withMessage("Name is required."),
  body("profilePictureURL").optional().isString().withMessage("Profile picture must be a valid URL."),
];