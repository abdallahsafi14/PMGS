import { createSlice } from "@reduxjs/toolkit";
import { fetchSubmissions } from "./action/submissionActions";
import { deleteSubmission } from "./action/submissionActions";

const initialState = {
  data: [],
  currentPage: 1,
  totalPages: 1,
  perPage: 5,
  loading: false,
  error: null,
};

const submissionSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        const { data, current_page, last_page, per_page } = action.payload;
        state.data = data;
        state.currentPage = current_page;
        state.totalPages = last_page;
        state.perPage = per_page;
        state.loading = false;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(deleteSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectSubmissions = (state) => ({
  submissions: state.submissions,
  currentPage: state.submissions.currentPage,
  totalPages: state.submissions.totalPages,
  perPage: state.submissions.perPage,
  loading: state.submissions.loading,
  error: state.submissions.error,
});

export default submissionSlice.reducer;
