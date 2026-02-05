// src/features/todos/todoService.ts
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export const getTodosService = async () => {
  const response = await axios.get(API_URL);
  return response.data; // { todos, total, skip, limit }
};

export const addTodoService = async (payload: {
  todo: string;
  completed: boolean;
  userId: number;
}) => {
  const response = await axios.post(`${API_URL}/add`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data; // new todo object
};

export const updateTodoService = async (
  id: number,
  payload: { completed: boolean },
) => {
  const response = await axios.put(`${API_URL}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data; // updated todo object
};

export const deleteTodoService = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data; // deleted todo object
};
