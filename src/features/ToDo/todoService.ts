import api from "@/lib/api";

const API_URL = "https://dummyjson.com/todos";

export const getTodosService = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

export const addTodoService = async (payload: {
  todo: string;
  completed: boolean;
  userId: number;
}) => {
  const response = await api.post(`${API_URL}/add`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const updateTodoService = async (
  id: number,
  payload: { completed: boolean },
) => {
  const response = await api.put(`${API_URL}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteTodoService = async (id: number) => {
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
};
