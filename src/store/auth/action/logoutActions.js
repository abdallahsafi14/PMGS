// src/redux/slices/auth/action/logoutAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST } from "../../../services/http.service";

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await POST("api/logout", {}, true);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
