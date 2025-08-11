// src/store/projects/projectsActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET,
  POST,
  DELETE,
  GETWithParams,
} from "../../../services/http.service";

// export const fetchProjects = createAsyncThunk(
//   "projects/fetch",
//   async (thunkAPI) => {
//     try {
//       const response = await GET(`api/projects`, true);
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
export const fetchProjects = createAsyncThunk(
  "projects/fetch",
  async (params, thunkAPI) => {
    try {
      // const params = { page, per_page };
      const response = await GETWithParams(`api/projects`, params, true);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProjectDetails = createAsyncThunk(
  "projects/details",
  async (id, thunkAPI) => {
    try {
      const response = await GET(`api/projects/${id}`, true);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData, thunkAPI) => {
    try {
      const response = await POST("api/projects", projectData, true);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await POST(`api/projects/${id}`, data, true); // assumes method override via _method
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, thunkAPI) => {
    try {
      await DELETE(`api/projects/${id}`, true);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
