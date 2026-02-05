import api from "@/lib/api";

export const getUserService = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data; 
};
