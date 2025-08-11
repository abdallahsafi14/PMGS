// src/redux/slices/permissions/permissionsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from "./action/permissionsActions";

const initialState = {
  permissions: [],
  loading: false,
  error: null,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.loading = false;
        // Store the full permission objects instead of just names
        state.permissions = action.payload.data.data;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload.data);
      })

      .addCase(updatePermission.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.permissions = state.permissions.map((perm) =>
          perm.id === updated.id ? updated : perm
        );
      })

      .addCase(deletePermission.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.permissions = state.permissions.filter((perm) => perm.id !== id);
      });
  },
});

export default permissionsSlice.reducer;
