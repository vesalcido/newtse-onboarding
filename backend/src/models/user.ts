import { Schema, model, InferSchemaType } from "mongoose";

// Define the User schema
const userSchema = new Schema({
  name: { type: String, required: true },
  profilePictureURL: { type: String }, // Optional field
});

// Infer the TypeScript type for User from the schema
type User = InferSchemaType<typeof userSchema>;

// Export the User model
export default model<User>("User", userSchema);