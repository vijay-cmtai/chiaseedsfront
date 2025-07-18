// src/features/auth/authSlice.js
// --- FULL UPDATED CODE ---

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authAPI";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoginSuccess: false,
  isRegisterSuccess: false,
  isLoading: false,
  isAuthenticated: user ? true : false,
  isOtpVerifySuccess: false,
  message: "",
  isForgotPasswordLoading: false,
  isForgotPasswordSuccess: false,
  isResetSuccess: false,
};

// --- Async Thunk Functions ---

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify OTP - Isme se localStorage ka logic hata diya gaya hai
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, thunkAPI) => {
    try {
      // Ab ye sirf API call karega aur response return karega
      const response = await authService.verifyOtp(otpData);
      return response;
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error)      {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (emailData, thunkAPI) => {
    try {
      return await authService.forgotPassword(emailData);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, thunkAPI) => {
    try {
      return await authService.resetPassword(resetData);
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// --- The Slice ---

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoginSuccess = false;
      state.isRegisterSuccess = false;
      state.isForgotPasswordSuccess = false;
      state.isResetSuccess = false;
      state.isOtpVerifySuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegisterSuccess = true;
        state.message = action.payload.message || "Registration successful. Please verify OTP.";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      
      // --- YAHAN ZAROORI BADLAV KIYA GAYA HAI ---
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOtpVerifySuccess = true; // Sirf success flag set karein
        state.isAuthenticated = false; // Isse false rakhein, user abhi logged in nahi hai
        state.user = null; // User object ko set na karein
        state.message = action.payload.message || "Account verified. Please log in.";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isAuthenticated = false; // Error par bhi false rakhein
      })
      // --- END OF CHANGES ---

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoginSuccess = true;
        state.isAuthenticated = true; // Sirf login par hi isAuthenticated true hoga
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isForgotPasswordLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isForgotPasswordLoading = false;
        state.isForgotPasswordSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isForgotPasswordLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isResetSuccess = true;
        state.message = action.payload.message || "Password reset successfully.";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isOtpVerifySuccess = false;
        state.isLoginSuccess = false;
        state.isRegisterSuccess = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
