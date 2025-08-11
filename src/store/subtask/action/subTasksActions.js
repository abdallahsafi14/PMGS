// src/store/tasks/action/tasksActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DELETE,
  GET,
  GETWithParams,
  POST,
} from "../../../services/http.service";

export const getSubTasks = createAsyncThunk(
  "subTasks/getAll",
  async ({ taskId, page, perPage: per_page }, thunkAPI) => {
    try {
      console.log(
        "taskId:",
        taskId,
        "\n",
        "page:",
        page,
        "\n",
        "per_page:",
        per_page,
        "\n"
      );
      const params = { page, per_page };
      const res = await GETWithParams(
        `api/tasks/${taskId}/subtasks`,
        params,
        true
      );
      console.log(res.data.data.per_page);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const getSubTaskById = createAsyncThunk(
  "subTasks/getById",
  async ({ subtaskId, taskId }, thunkAPI) => {
    try {
      const res = await GET(`api/tasks/${taskId}/subtasks/${subtaskId}`, true);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const createSubTask = createAsyncThunk(
  "subTasks/create",
  async ({ taskId, formData }, thunkAPI) => {
    try {
      const res = await POST(`api/tasks/${taskId}/subtasks`, formData, true);
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const updateSubTask = createAsyncThunk(
  "subTasks/update",
  async ({ taskId, subtaskId, formData }, thunkAPI) => {
    try {
      const res = await POST(
        `api/tasks/${taskId}/subtasks/${subtaskId}`,
        formData,
        true
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const deleteSubTask = createAsyncThunk(
  "subTasks/delete",
  async ({ subtaskId, taskId }, thunkAPI) => {
    try {
      await DELETE(`api/tasks/${taskId}/subtasks/${subtaskId}`, true);
      return { id: subtaskId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const submitWork = createAsyncThunk(
  "subTasks/submit",
  async ({ subtaskId, taskId, formData }, thunkAPI) => {
    try {
      const res = await POST(
        `api/tasks/${taskId}/subtasks/${subtaskId}/submit`,
        formData, // ✅ send actual form data
        true,
        { "Content-Type": "multipart/form-data" } // ✅ required for file upload
      );
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const approveSubmission = createAsyncThunk(
  "subTasks/approve",
  async ({ subtaskId, taskId }, thunkAPI) => {
    try {
      const res = await POST(
        `api/tasks/${taskId}/subtasks/${subtaskId}/approve`,
        true
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const rejectSubmission = createAsyncThunk(
  "subTasks/reject",
  async ({ subtaskId, taskId }, thunkAPI) => {
    try {
      const res = await POST(
        `api/tasks/${taskId}/subtasks/${subtaskId}/reject`,
        true
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);
