// src/features/users/userService.ts
import api from "@/lib/api"; // your axios instance

export const getUserService = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data; // returns the user object
};
