// src/store/tasks/action/tasksActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DELETE,
  GET,
  GETWithParams,
  POST,
} from "../../../services/http.service";

export const getTasks = createAsyncThunk(
  "tasks/getAll",
  async ({ projectId, page = 1, perPage = 10, ...filters }, thunkAPI) => {
    try {
      const params = {
        page,
        per_page: perPage,
        ...filters,
      };
      const res = await GETWithParams(
        `api/projects/${projectId}/tasks`,
        params,
        true
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const getTaskById = createAsyncThunk(
  "tasks/getById",
  async ({ projectId, taskId }, thunkAPI) => {
    try {
      const res = await GET(`api/projects/${projectId}/tasks/${taskId}`, true);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async ({ projectId, formData }, thunkAPI) => {
    try {
      const res = await POST(`api/projects/${projectId}/tasks`, formData, true);
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ projectId, taskId, formData }, thunkAPI) => {
    try {
      const res = await POST(
        `api/projects/${projectId}/tasks/${taskId}`,
        formData,
        true
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async ({ projectId, taskId }, thunkAPI) => {
    try {
      await DELETE(`api/projects/${projectId}/tasks/${taskId}`, true);
      return { id: taskId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);
