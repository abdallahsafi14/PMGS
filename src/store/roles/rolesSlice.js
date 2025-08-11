// src/redux/slices/roles/rolesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  assignRoleToUser,
} from "./action/rolesActions";

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.data.data;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload.data.data);
      })

      .addCase(updateRole.fulfilled, (state, action) => {
        const updated = action.payload.data.data;
        state.roles = state.roles.map((role) =>
          role.id === updated.id ? updated : role
        );
      })

      .addCase(deleteRole.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.roles = state.roles.filter((role) => role.id !== id);
      })
      .addCase(assignRoleToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignRoleToUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(assignRoleToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error assigning role to user";
      });
  },
});

export default rolesSlice.reducer;
