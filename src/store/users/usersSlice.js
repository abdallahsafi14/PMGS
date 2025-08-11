// src/store/users/usersSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  fetchUsers,
  getUserById,
  updateUser,
} from "./action/usersActions";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.data.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state?.users?.unshift(action.payload?.data);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.user = state.user.map((user) =>
          user.id === updated.id ? updated : user
        );
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.tasks = state.tasks.filter((task) => task.id !== deletedId);
      });
  },
});

export const selectUsers = (state) => state.users.users;

export default usersSlice.reducer;
