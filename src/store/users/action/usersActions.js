// src/store/users/action/usersActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE, GET, POST } from "../../../services/http.service";

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await GET("api/users", true);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "users/getById",
  async (id, thunkAPI) => {
    try {
      const res = await GET(`api/users/${id}`, true);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/create",
  async (formData, thunkAPI) => {
    try {
      const res = await POST(`api/users`, formData, true);
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (id, formData, thunkAPI) => {
    try {
      const res = await POST(`api/users/${id}`, formData, true);
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      const res = await DELETE(`api/users/${id}`, true);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);
