// src/redux/slices/permissions/action/getPermissions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT, DELETE } from "../../../services/http.service";

export const getPermissions = createAsyncThunk(
  "permissions/get",
  async (_, thunkAPI) => {
    try {
      const res = await GET("api/permissions", true);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const createPermission = createAsyncThunk(
  "permissions/create",
  async (data, thunkAPI) => {
    try {
      const res = await POST("api/permissions/create", data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const updatePermission = createAsyncThunk(
  "permissions/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await PUT(`api/permissions/update/${id}`, data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const deletePermission = createAsyncThunk(
  "permissions/delete",
  async (id, thunkAPI) => {
    try {
      const res = await DELETE(`api/permissions/delete/${id}`);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);
