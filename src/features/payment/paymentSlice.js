import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "./paymentAPI";
import { logout } from "../auth/authSlice";

// Slice ki initial state.
const initialState = {
  razorpayOrder: null, // Yahan Razorpay ka order data store hoga.
  finalOrder: null, // Payment verify hone ke baad final order yahan aayega.
  status: "idle", // API call ka status (idle, loading, succeeded, failed)
  message: "", // Error message store karne ke liye
};

// Async thunk: Razorpay order banane ke liye.
export const createRazorpayOrder = createAsyncThunk(
  "payment/createOrder",
  async (orderData, thunkAPI) => {
    try {
      // paymentService se function call karein.
      return await paymentService.createRazorpayOrder(orderData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      // Agar user authorized nahi hai, to logout kar dein.
      if (error.response?.status === 401) thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk: Payment ko verify karne ke liye.
export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (paymentData, thunkAPI) => {
    try {
      return await paymentService.verifyPayment(paymentData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status === 401) thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // Payment state ko reset karne ke liye.
    resetPaymentStatus: (state) => {
      state.status = "idle";
      state.message = "";
      state.razorpayOrder = null;
      state.finalOrder = null;
    },
  },
  // Async thunks ke actions ko yahan handle karein.
  extraReducers: (builder) => {
    builder
      // createRazorpayOrder states
      .addCase(createRazorpayOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        // action.payload ab bilkul sahi order object hai.
        state.razorpayOrder = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      // verifyPayment states
      .addCase(verifyPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.finalOrder = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { resetPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
