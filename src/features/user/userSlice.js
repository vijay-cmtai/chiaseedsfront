// features/user/userSlice.js (FINAL CORRECTED CODE)

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userAPI";
import { logout } from "../auth/authSlice";

const initialState = {
  profile: null,
  addresses: [],
  wishlist: [],
  cart: [],
  orders: [],
  currentOrder: null,
  stats: {},
  recentOrders: [],
  status: "idle",
  message: "",
};

const createApiThunk = (name, apiCall) => {
  return createAsyncThunk(`user/${name}`, async (arg, thunkAPI) => {
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

export const getMyProfile = createApiThunk("getMyProfile", userService.getMyProfile);
export const updateMyProfile = createApiThunk("updateMyProfile", userService.updateMyProfile);
export const updateUserAvatar = createApiThunk("updateUserAvatar", userService.updateUserAvatar);
export const getAddresses = createApiThunk("getAddresses", userService.getAddresses);
export const addAddress = createApiThunk("addAddress", userService.addAddress);
export const updateAddress = createApiThunk("updateAddress", userService.updateAddress);
export const deleteAddress = createApiThunk("deleteAddress", userService.deleteAddress);
export const getWishlist = createApiThunk("getWishlist", userService.getWishlist);
export const addToWishlist = createApiThunk("addToWishlist", userService.addToWishlist);
export const removeFromWishlist = createApiThunk("removeFromWishlist", userService.removeFromWishlist);
export const getCart = createApiThunk("getCart", userService.getCart);
export const addToCart = createApiThunk("addToCart", userService.addToCart);
export const removeFromCart = createApiThunk("removeFromCart", userService.removeFromCart);
export const updateCartQuantity = createApiThunk("updateCartQuantity", userService.updateCartQuantity);
export const createOrder = createApiThunk("createOrder", userService.createOrder);
export const getMyOrders = createApiThunk("getMyOrders", userService.getMyOrders);
export const getSingleOrder = createApiThunk("getSingleOrder", userService.getSingleOrder);
export const getDashboardStats = createApiThunk("getDashboardStats", userService.getDashboardStats);
export const getRecentUserOrders = createApiThunk("getRecentUserOrders", userService.getRecentUserOrders);

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
    // FIX: PaymentPage के लिए clearCart एक्शन यहाँ जोड़ा गया है
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.cart = action.payload.cart;
        state.wishlist = action.payload.wishlist;
        state.addresses = action.payload.addresses;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        if (state.profile) state.profile.name = action.payload.name;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        if (state.profile) state.profile.avatar = action.payload.avatar;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter((item) => item._id !== action.meta.arg);
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const cartItemIdToRemove = action.meta.arg;
        state.cart = state.cart.filter((item) => item._id !== cartItemIdToRemove);
        state.status = "succeeded";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
        const cartItemIdToRemove = action.meta.arg;
        state.cart = state.cart.filter((item) => item._id !== cartItemIdToRemove);
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.cart = [];
        state.currentOrder = action.payload;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(getRecentUserOrders.fulfilled, (state, action) => {
        state.recentOrders = action.payload;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addMatcher(
        (action) => action.type.endsWith("/pending") && !action.type.startsWith("user/removeFromCart"),
        (state) => {
          state.status = "loading";
          state.message = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") && !action.type.startsWith("user/removeFromCart"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected") && !action.type.startsWith("user/removeFromCart"),
        (state, action) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export const { resetUserStatus, clearCurrentOrder, clearCart } = userSlice.actions;
export default userSlice.reducer;
