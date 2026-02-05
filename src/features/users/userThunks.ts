/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserService } from "./userService";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id: number, thunkAPI) => {
    try {
      const data = await getUserService(id);
      return data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
