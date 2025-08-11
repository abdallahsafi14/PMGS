// src/redux/slices/roles/action/getRoles.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT, DELETE } from "../../../services/http.service";

export const getRoles = createAsyncThunk("roles/get", async (_, thunkAPI) => {
  try {
    const res = await GET("api/roles", true);
    console.log("res", res);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createRole = createAsyncThunk(
  "roles/create",
  async (data, thunkAPI) => {
    try {
      const res = await POST("api/roles/create", data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await PUT(`api/roles/update/${id}`, data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "roles/delete",
  async (id, thunkAPI) => {
    try {
      const res = await DELETE(`api/roles/delete/${id}`);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const assignRoleToUser = createAsyncThunk(
  "roles/assign",
  async (data, thunkAPI) => {
    try {
      const res = await POST("api/assign-role", data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);
