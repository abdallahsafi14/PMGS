// src/store/tasks/tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "./action/tasksActions";

const initialState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 1,
  perPage: 10,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPage = action.payload.data.current_page - 1;
        state.totalPages = action.payload.data.last_page;
        state.perPage = action.payload.data.per_page;
        state.tasks = action.payload.data.data;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getTaskById.fulfilled, (state, action) => {
        state.selectedTask = action.payload.data;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state?.tasks?.unshift(action.payload?.data);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.tasks = state.tasks.map((task) =>
          task.id === updated.id ? updated : task
        );
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.tasks = state.tasks.filter((task) => task.id !== deletedId);
      });
  },
});

export const selectTasks = (state) => state.tasks.tasks;
export const selectTask = (state) => state.tasks.selectedTask;
export default tasksSlice.reducer;
