// src/store/projects/projectsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectDetails,
} from "./action/projectsActions";

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 1,
  perPage: 10,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload.data;
        state.currentPage = action.payload.current_page - 1;
        state.totalPages = action.payload.last_page;
        state.perPage = action.payload.per_page;
        state.loading = false;
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        state.loading = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((proj) =>
          proj.id === action.payload.id ? action.payload : proj
        );
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const id = action.payload;
        state.projects = state.projects.filter((proj) => proj.id !== id);
        if (state.currentProject?.id === id) {
          state.currentProject = null;
        }
      });
  },
});

export default projectsSlice.reducer;

export const selectProjects = (state) => state.projects.projects;
export const selectProjectDetails = (state) => state.projects.currentProject;
