// src/features/tracking/trackingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trackingService from "./trackingAPI";

export const fetchTrackingStatus = createAsyncThunk(
  "tracking/fetchStatus",
  async (orderId, thunkAPI) => {
    try {
      const data = await trackingService.getOrderStatus(orderId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Tracking failed"
      );
    }
  }
);

const trackingSlice = createSlice({
  name: "tracking",
  initialState: {
    status: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTrackingStatus: (state) => {
      state.status = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrackingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.liveCourierStatus;
      })
      .addCase(fetchTrackingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tracking status";
      });
  },
});

export const { clearTrackingStatus } = trackingSlice.actions;
export default trackingSlice.reducer;
