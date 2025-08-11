import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, GETWithParams } from "../../../services/http.service";

export const fetchActivityLogs = createAsyncThunk(
  "projects/fetch",
  async ({ page, perPage: per_page }, thunkAPI) => {
    try {
      const response = await GETWithParams(
        `api/activity-logs`,
        { page, per_page },
        true
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
