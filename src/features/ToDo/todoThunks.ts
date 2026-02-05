/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTodosService,
  addTodoService,
  updateTodoService,
  deleteTodoService,
} from "./todoService";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const data = await getTodosService();
      return data.todos;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

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
