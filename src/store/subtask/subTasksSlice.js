import { createSlice } from "@reduxjs/toolkit";
import {
  approveSubmission,
  createSubTask,
  deleteSubTask,
  getSubTaskById,
  getSubTasks,
  rejectSubmission,
  submitWork,
  updateSubTask,
} from "./action/subTasksActions";

const initialState = {
  subTasks: [],
  selectedSubTask: null,
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 1,
  perPage: 10,
};

const subTasksSlice = createSlice({
  name: "subTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.subTasks = action.payload.data.data;
        state.currentPage = action.payload.data.current_page - 1;
        state.totalPages = action.payload.data.last_page;
        state.perPage = action.payload.data.per_page;
      })
      .addCase(getSubTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSubTaskById.fulfilled, (state, action) => {
        state.selectedSubTask = action.payload.data;
      })

      .addCase(createSubTask.fulfilled, (state, action) => {
        state.subTasks.unshift(action.payload.data);
      })

      .addCase(updateSubTask.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.subTasks = state.subTasks.map((s) =>
          s.id === updated.id ? updated : s
        );
      })

      .addCase(deleteSubTask.fulfilled, (state, action) => {
        const deletedId = action.meta.arg.subtaskId;
        state.subTasks = state.subTasks.filter((s) => s.id !== deletedId);
      })

      .addCase(submitWork.fulfilled, (state, action) => {
        const submittedId = action.meta.arg.subtaskId;
        state.subTasks = state.subTasks.map((s) =>
          s.id === submittedId ? { ...s, status: "submitted" } : s
        );
      })

      .addCase(approveSubmission.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.subTasks = state.subTasks.map((s) =>
          s.id === updated.id ? updated : s
        );
      })

      .addCase(rejectSubmission.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.subTasks = state.subTasks.map((s) =>
          s.id === updated.id ? updated : s
        );
      });
  },
});

export const selectSubTasks = (state) => state.subTasks.subTasks;
export const selectSubTask = (state) => state.subTasks.selectedSubTask;
export default subTasksSlice.reducer;
