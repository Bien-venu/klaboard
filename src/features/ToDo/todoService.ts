import api from "@/lib/api";

export const getTodosService = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const addTodoService = async (payload: {
  todo: string;
  completed: boolean;
  userId: number;
}) => {
  const response = await api.post(`/todos/add`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const updateTodoService = async (
  id: number,
  payload: { completed: boolean },
) => {
  const response = await api.put(`/todos/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteTodoService = async (id: number) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
