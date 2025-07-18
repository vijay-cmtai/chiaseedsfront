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
  message: "",
  isForgotPasswordLoading: false,
  isForgotPasswordSuccess: false,
  // === 1. NAYA STATE ADD KIYA GAYA HAI ===
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
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, thunkAPI) => {
    try {
      return await authService.verifyOtp(otpData);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
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
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
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
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// === 2. RESET PASSWORD KE LIYE NAYA ASYNC THUNK ADD KIYA GAYA HAI ===
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, thunkAPI) => {
    try {
      // resetData = { token, password }
      return await authService.resetPassword(resetData);
    } catch (error)      {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
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
      // === 3. NAYE STATE KO RESET KAREIN ===
      state.isResetSuccess = false; 
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ... Register, Verify OTP, Login, Forgot Password, Logout cases ...
      .addCase(register.pending, (state) => { state.isLoading = true; })
      .addCase(register.fulfilled, (state, action) => { state.isLoading = false; state.isRegisterSuccess = true; state.message = action.payload.message || "Registration successful. Please verify OTP."; })
      .addCase(register.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; state.user = null; })
      
      .addCase(verifyOtp.pending, (state) => { state.isLoading = true; })
      .addCase(verifyOtp.fulfilled, (state, action) => { state.isLoading = false; state.isLoginSuccess = true; state.isAuthenticated = true; state.user = action.payload; })
      .addCase(verifyOtp.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; })
      
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action) => { state.isLoading = false; state.isLoginSuccess = true; state.isAuthenticated = true; state.user = action.payload; })
      .addCase(login.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; state.user = null; state.isAuthenticated = false; })
      
      .addCase(forgotPassword.pending, (state) => { state.isForgotPasswordLoading = true; })
      .addCase(forgotPassword.fulfilled, (state, action) => { state.isForgotPasswordLoading = false; state.isForgotPasswordSuccess = true; state.message = action.payload.message; })
      .addCase(forgotPassword.rejected, (state, action) => { state.isForgotPasswordLoading = false; state.isError = true; state.message = action.payload; })
      
      .addCase(logout.fulfilled, (state) => { state.user = null; state.isAuthenticated = false; })

      // === 4. RESET PASSWORD KE LIYE NAYE REDUCERS ADD KIYE GAYE HAIN ===
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
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
