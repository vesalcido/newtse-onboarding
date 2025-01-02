import { get, handleAPIError, post, put } from "src/api/requests";

import type { APIResult } from "src/api/requests";

/**
 * Defines the "shape" of a User object for frontend components to use.
 */
export interface User {
  _id: string;
  name: string;
}

/**
 * Since User objects are simple, the JSON structure matches the User interface exactly.
 */
export type UserJSON = User;

/**
 * Converts a User from JSON (if necessary).
 * Since `User` and `UserJSON` are identical, this function just returns the input.
 *
 * @param user The JSON representation of the user
 * @returns The User object
 */
function parseUser(user: UserJSON): User {
  return user; // No transformation needed
}

/**
 * Expected inputs when creating a new User object.
 */
export interface CreateUserRequest {
  name: string;
}

/**
 * Expected inputs when updating an existing User object.
 */
export interface UpdateUserRequest {
  _id: string;
  name: string;
}

/**
 * Creates a new User by sending a POST request to the backend.
 */
export async function createUser(user: CreateUserRequest): Promise<APIResult<User>> {
  try {
    const response = await post("/api/user", user);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Retrieves a User by ID.
 */
export async function getUser(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/user/${id}`);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Retrieves all Users.
 */
export async function getAllUsers(): Promise<APIResult<User[]>> {
  try {
    const response = await get("/api/users");
    const json = (await response.json()) as UserJSON[];
    const users = json.map(parseUser);
    return { success: true, data: users };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Updates an existing User.
 */
export async function updateUser(user: UpdateUserRequest): Promise<APIResult<User>> {
  try {
    const response = await put(`/api/user/${user._id}`, user);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}
