// src/store/projects/projectsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchActivityLogs } from "./action/activityActions";

const initialState = {
  activityLogs: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 1,
  perPage: 10,
};

const ActivityLogsSlice = createSlice({
  name: "ActivityLogs",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchActivityLogs.fulfilled, (state, action) => {
      state.activityLogs = action.payload.data;
      state.currentPage = action.payload.current_page - 1;
      state.totalPages = action.payload.last_page;
      state.perPage = action.payload.per_page;
      state.loading = false;
    });
  },
});

export default ActivityLogsSlice.reducer;

export const selectActivityLogs = (state) => state.ActivityLogs.activityLogs;
