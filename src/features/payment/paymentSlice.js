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
  async (orderData, thunkAPI) => {
    try {
      return await paymentService.createRazorpayOrder(orderData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status === 401) thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      });
  },
});

export const { resetPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
