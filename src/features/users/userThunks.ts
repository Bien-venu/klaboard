/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/users/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserService } from "./userService";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id: number, thunkAPI) => {
    try {
      const data = await getUserService(id);
      return data; // single user object
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
