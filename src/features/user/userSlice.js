import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userAPI.js"; // Make sure this path is correct
import { logout } from "../auth/authSlice";

// Define the initial state for this slice
const initialState = {
  profile: null,
  stats: {},
  wishlist: [],
  addresses: [],
  orders: [],
  cart: [],
  currentOrder: null,
  status: "idle",
  message: "",
};

// Helper function to create async thunks
const createApiThunk = (name, apiCall) => {
  return createAsyncThunk(`user/${name}`, async (arg, thunkAPI) => {
    try {
      return await apiCall(arg);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        `Failed to perform action: ${name}`;
      if (error.response?.status === 401) {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  });
};

// --- Create all async thunks using the helper ---
export const getMyProfile = createApiThunk(
  "getMyProfile",
  userService.getMyProfile
);
export const updateMyProfile = createApiThunk(
  "updateMyProfile",
  userService.updateMyProfile
);
export const updateUserAvatar = createApiThunk(
  "updateUserAvatar",
  userService.updateUserAvatar
);
export const getDashboardStats = createApiThunk(
  "getDashboardStats",
  userService.getDashboardStats
);
export const getMyOrders = createApiThunk(
  "getMyOrders",
  userService.getMyOrders
);
export const getOrderDetail = createApiThunk(
  "getOrderDetail",
  userService.getOrderDetail
);
export const getRecentUserOrders = createApiThunk(
  "getRecentUserOrders",
  userService.getRecentUserOrders
);
export const getWishlist = createApiThunk(
  "getWishlist",
  userService.getWishlist
);
export const addToWishlist = createApiThunk(
  "addToWishlist",
  userService.addToWishlist
);
export const removeFromWishlist = createApiThunk(
  "removeFromWishlist",
  userService.removeFromWishlist
);
export const getCart = createApiThunk("getCart", userService.getCart);
export const addToCart = createApiThunk("addToCart", userService.addToCart);
export const removeFromCart = createApiThunk(
  "removeFromCart",
  userService.removeFromCart
);
export const updateCartQuantity = createApiThunk(
  "updateCartQuantity",
  userService.updateCartQuantity
);
export const getAddresses = createApiThunk(
  "getAddresses",
  userService.getAddresses
);
export const addAddress = createApiThunk("addAddress", userService.addAddress);
export const updateAddress = createApiThunk(
  "updateAddress",
  userService.updateAddress
);
export const deleteAddress = createApiThunk(
  "deleteAddress",
  userService.deleteAddress
);
export const createOrder = createApiThunk(
  "createOrder",
  userService.createOrder
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserStatus: (state) => {
      state.status = "idle";
      state.message = "";
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    const handleSucceeded = (state) => {
      state.status = "succeeded";
    };

    builder
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        handleSucceeded(state);
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.addresses = action.payload.addresses || [];
        state.wishlist = action.payload.wishlist || [];
        state.cart = action.payload.cart || [];
        handleSucceeded(state);
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        handleSucceeded(state);
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        handleSucceeded(state);
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        handleSucceeded(state);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        const removedProductId = action.meta.arg;
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== removedProductId
        );
        handleSucceeded(state);
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        handleSucceeded(state);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        handleSucceeded(state);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        handleSucceeded(state);
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        handleSucceeded(state);
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        handleSucceeded(state);
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        handleSucceeded(state);
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        handleSucceeded(state);
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        handleSucceeded(state);
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        handleSucceeded(state);
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        handleSucceeded(state);
      })
      .addCase(getRecentUserOrders.fulfilled, (state, action) => {
        state.recentOrders = action.payload;
        handleSucceeded(state);
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = []; // Clear the cart on successful order
        state.currentOrder = action.payload;
        state.message = "Order placed successfully!";
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
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export const { resetUserStatus, clearCurrentOrder } = userSlice.actions;

export default userSlice.reducer;
