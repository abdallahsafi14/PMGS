import { createAsyncThunk } from "@reduxjs/toolkit";
import {POST} from "../../../services/http.service";

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
   const dataToSend = {
          ...userData,
          account_verification_channel: 'email'
        }

      
      const response = await POST('customer/auth/register', dataToSend, false);
      
      if (response.status === 422) {
        return rejectWithValue(response.data.message,  "Validation error occurred");
      } else if (response.status !== 200) {
        return rejectWithValue(response.data,  "An error occurred");
      }

      return {
        data: response.data,
        status: response.status
      };

    } catch (error) {
      console.log("Error Response: ", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);