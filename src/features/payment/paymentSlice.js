// src/features/payment/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "./paymentAPI";
import { logout } from "../auth/authSlice";

const initialState = {
  razorpayOrder: null,
  finalOrder: null,
  status: "idle",
  message: "",
};

export const createRazorpayOrder = createAsyncThunk(
  "payment/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      return await paymentService.createRazorpayOrder(orderData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status === 401) rejectWithValue.dispatch(logout());
      return rejectWithValue(message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (paymentData, { rejectWithValue }) => {
    try {
      return await paymentService.verifyPayment(paymentData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status === 401) rejectWithValue.dispatch(logout());
      return rejectWithValue(message);
    }
  }
);

export const retryShipment = createAsyncThunk(
  "payment/retryShipment",
  async (orderData, { rejectWithValue }) => {
    try {
      return await paymentService.retryShipment(orderData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status === 401) rejectWithValue.dispatch(logout());
      return rejectWithValue(message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentStatus: (state) => {
      state.status = "idle";
      state.message = "";
      state.razorpayOrder = null;
      state.finalOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRazorpayOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.razorpayOrder = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
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
      })
      .addCase(retryShipment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(retryShipment.fulfilled, (state) => {
        state.status = "succeeded";
        state.message = "Shipment created successfully";
      })
      .addCase(retryShipment.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { resetPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
