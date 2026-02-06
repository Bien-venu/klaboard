import api from "@/lib/api";

export const getUsersService = async () => {
  const response = await api.get("/users?skip=0&limit=30");
  return response.data;
};

export const getUserService = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
