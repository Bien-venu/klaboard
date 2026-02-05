/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/todos/todoThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTodosService,
  addTodoService,
  updateTodoService,
  deleteTodoService,
} from "./todoService";

// Get all todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const data = await getTodosService();
      return data.todos; // return array of todos
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Add new todo
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (
    payload: { todo: string; completed: boolean; userId: number },
    thunkAPI,
  ) => {
    try {
      const data = await addTodoService(payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Update todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, completed }: { id: number; completed: boolean }, thunkAPI) => {
    try {
      const data = await updateTodoService(id, { completed });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Delete todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number, thunkAPI) => {
    try {
      const data = await deleteTodoService(id);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
