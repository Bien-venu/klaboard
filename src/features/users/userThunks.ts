/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserService, getUsersService } from "./userService";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id: number, thunkAPI) => {
    try {
      return await getUserService(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      return await getUsersService();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
