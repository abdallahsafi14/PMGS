import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  deleteComment,
  fetchComments,
  getCommentById,
  updateComment,
} from "./action/commentsActions";

const initialState = {
  comments: [],
  currentComment: null,
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 1,
  perPage: 10,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.currentPage = action.payload.current_page - 1;
        state.totalPages = action.payload.last_page;
        state.perPage = action.payload.per_page;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCommentById.fulfilled, (state, action) => {
        state.currentComment = action.payload;
        state.loading = false;
      })

      .addCase(createComment.fulfilled, (state, action) => {
        // Fix: Access the correct data array structure
        if (state.comments.data) {
          state.comments.data.unshift(action.payload);
        } else {
          // Fallback if comments is just an array
          state.comments.unshift(action.payload);
        }
      })

      .addCase(updateComment.fulfilled, (state, action) => {
        console.log("Update payload:", action.payload); // Debug log
        console.log("Current state.comments:", state.comments); // Debug log

        // Fix: Update the correct data array structure
        if (state.comments.data) {
          state.comments.data = state.comments.data.map((comm) => {
            console.log("Comparing:", comm.id, "vs", action.payload.id); // Debug log
            return comm.id === action.payload.id ? action.payload : comm;
          });
        } else {
          // Fallback if comments is just an array
          state.comments = state.comments.map((comm) =>
            comm.id === action.payload.id ? action.payload : comm
          );
        }

        console.log("Updated state.comments:", state.comments); // Debug log
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        const id = action.payload;

        if (Array.isArray(state.comments?.data)) {
          state.comments.data = state.comments.data.filter(
            (comm) => comm.id !== id
          );
        }

        if (state.currentComment?.id === id) {
          state.currentComment = null;
        }
      });
  },
});

export default commentsSlice.reducer;

export const selectComments = (state) => state.comments;
export const selectCommentById = (state) => state.comments.currentComment;
