import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, DELETE } from "../../../services/http.service";

// Fetch all comments for a project
export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async (projectId, thunkAPI) => {
    try {
      const response = await GET(`api/projects/${projectId}/comments`, true);
      console.log("comments:", response.data.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get a single comment
export const getCommentById = createAsyncThunk(
  "comments/getById",
  async ({ projectId, commentId }, thunkAPI) => {
    try {
      const response = await GET(
        `api/projects/${projectId}/comments/${commentId}`,
        true
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a new comment
export const createComment = createAsyncThunk(
  "comments/create",
  async ({ projectId, content }, thunkAPI) => {
    try {
      const response = await POST(
        `api/projects/${projectId}/comments`,
        { content },
        true
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a comment
export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ projectId, commentId, content }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("_method", "PUT");

      const response = await POST(
        `api/projects/${projectId}/comments/${commentId}`,
        formData,
        true
      );

      console.log("Update response:", response); // Debug log
      console.log("Response data:", response.data); // Debug log
      console.log("Response data.data:", response.data.data); // Debug log

      return response.data.data;
    } catch (error) {
      console.error("Update error:", error); // Debug log
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async ({ projectId, commentId }, thunkAPI) => {
    try {
      await DELETE(`api/projects/${projectId}/comments/${commentId}`, true);
      return commentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
