// src/features/admin/adminSlice.js (Corrected Code)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminAPI.js";
import { logout } from "../auth/authSlice.js";

const initialState = {
  stats: {},
  salesOverview: [],
  products: [],
  users: [],
  orders: [],
  recentOrders: [],
  selectedUser: null,
  selectedUserOrders: [],
  status: "idle",
  message: "",
};

const createApiThunk = (name, apiCall) => {
  return createAsyncThunk(`admin/${name}`, async (arg, thunkAPI) => {
    try {
      return await apiCall(arg);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || `Failed: ${name}`;
      if (error.response?.status === 401) {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  });
};

export const getAdminDashboardStats = createApiThunk(
  "getAdminDashboardStats",
  adminService.getAdminDashboardStats
);
export const getSalesOverview = createApiThunk(
  "getSalesOverview",
  adminService.getSalesOverview
);
export const getAllProducts = createApiThunk(
  "getAllProducts",
  adminService.getAllProducts
);
export const createProduct = createApiThunk(
  "createProduct",
  adminService.createProduct
);
export const updateProduct = createApiThunk(
  "updateProduct",
  adminService.updateProduct
);
export const deleteProduct = createApiThunk(
  "deleteProduct",
  adminService.deleteProduct
);
export const getAllUsers = createApiThunk(
  "getAllUsers",
  adminService.getAllUsers
);
export const updateUser = createApiThunk("updateUser", adminService.updateUser);
export const deleteUser = createApiThunk("deleteUser", adminService.deleteUser);
export const getUserDetails = createApiThunk(
  "getUserDetails",
  adminService.getUserDetails
);
export const getUserOrders = createApiThunk(
  "getUserOrders",
  adminService.getUserOrders
);
export const getAllAdminOrders = createApiThunk(
  "getAllAdminOrders",
  adminService.getAllAdminOrders
);
export const getRecentAdminOrders = createApiThunk(
  "getRecentAdminOrders",
  adminService.getRecentAdminOrders
);
export const updateOrderStatus = createApiThunk(
  "updateOrderStatus",
  adminService.updateOrderStatus
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminStatus: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(getSalesOverview.fulfilled, (state, action) => {
        state.salesOverview = action.payload;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.meta.arg
        );
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.meta.arg);
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.selectedUserOrders = action.payload;
      })
      .addCase(getAllAdminOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getRecentAdminOrders.fulfilled, (state, action) => {
        state.recentOrders = action.payload;
      })
      // === THE CHANGE IS HERE ===
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        // We use .map to create a new array.
        // This is a more robust way to ensure the state is seen as "updated".
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(logout.fulfilled, () => initialState)
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.message = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export const { resetAdminStatus } = adminSlice.actions;
export default adminSlice.reducer;
