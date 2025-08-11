import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST } from "../../../services/http.service";
import { errorToaster } from "../../../helpers/toasterConfiguration";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const dataToSend = {
        ...userData,
        // account_verification_channel: 'email'
      };
      const response = await POST("api/login", dataToSend, false);
      if (response.status === "200" && !response.data.data.access_token) {
        errorToaster(response.data.data.original.message);
      }
      console.log(response);
      return response;
    } catch (error) {
      console.log("object:", error);
      console.log(
        "Error Response: ",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response?.data : error.message
      );
    }
  }
);
