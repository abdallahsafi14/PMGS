import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE, GET } from "../../../services/http.service"; // assumes you have a shared GET helper

export const fetchSubmissions = createAsyncThunk(
  "submissions/fetch",
  async ({ page = 1, perPage = 5 }, thunkAPI) => {
    try {
      const response = await GET(
        `api/media?page=${page}&per_page=${perPage}`,
        true
      );
      console.log(response);
      return response.data.data; // returns data structure like { data: [], current_page, last_page, ... }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch submissions"
      );
    }
  }
);
export const deleteSubmission = createAsyncThunk(
  "submissions/delete",
  async (submissionId, thunkAPI) => {
    try {
      await DELETE(`api/media/${submissionId}`, true);
      return submissionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
