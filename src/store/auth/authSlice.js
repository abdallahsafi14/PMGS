// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./action/loginActions";
import { registerUser } from "./action/registerAction";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload?.data.data.access_token);
        const data = action.payload?.data?.data;
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: action.payload?.data?.role,
          permissions: data.permissions || [],
          token: action.payload?.data.data.access_token,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

//Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectPermissions = (state) => state.auth.user?.permissions || [];
export const selectRole = (state) => state.auth.user.role;

export default authSlice.reducer;
