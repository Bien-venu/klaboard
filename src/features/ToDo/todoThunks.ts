/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "@/i18n";
import { showSuccess } from "@/lib/toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTodoService,
  deleteTodoService,
  getTodosService,
  updateTodoService,
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
      showSuccess(i18n.t("messages.taskAddedSuccess"));
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, completed }: { id: number | string; completed: boolean }) => {
    try {
      if (typeof id === "string" && id.startsWith("local-")) {
        showSuccess(i18n.t("messages.taskUpdatedSuccess"));
        return { id, completed };
      }

      const data = await updateTodoService(id as number, { completed });
      showSuccess(i18n.t("messages.taskUpdatedSuccess"));
      return data;
    } catch (error: any) {
      showSuccess(i18n.t("messages.taskUpdatedSuccess"));
      return { id, completed };
    }
  },
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number | string, thunkAPI) => {
    try {
      if (typeof id === "string" && id.startsWith("local-")) {
        showSuccess(i18n.t("messages.taskDeletedSuccess"));
        return thunkAPI.fulfillWithValue({ id } as any);
      }

      const data = await deleteTodoService(id as number);
      showSuccess(i18n.t("messages.taskDeletedSuccess"));
      return data;
    } catch (error: any) {
      showSuccess(i18n.t("messages.taskDeletedSuccess"));
      return thunkAPI.fulfillWithValue({ id } as any);
    }
  },
);
