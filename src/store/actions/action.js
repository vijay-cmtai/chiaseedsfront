// src/store/actions/action.js

import * as types from "./type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// ... (all your existing action creators like addToCart, etc.)
export const fetchProductsBegin = () => ({ type: types.FETCH_PRODUCTS_BEGIN });
export const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});
export const addToCart = (product, qty) => (dispatch) => {
  toast.success("Item Added to Cart");
  dispatch({ type: types.ADD_TO_CART, product, qty });
};
export const removeFromCart = (product_id) => (dispatch) => {
  toast.error("Item Removed from Cart");
  dispatch({ type: types.REMOVE_FROM_CART, product_id });
};
export const incrementQuantity = (product_id) => (dispatch) => {
  dispatch({ type: types.INCREMENT_QUANTITY, product_id });
};
export const decrementQuantity = (product_id) => (dispatch) => {
  dispatch({ type: types.DECREMENT_QUANTITY, product_id });
};
export const addToWishList = (product) => (dispatch) => {
  dispatch({ type: types.ADD_TO_WISHLIST, product });
};
export const removeFromWishList = (id) => (dispatch) => {
  toast.error("Item removed from WishList");
  dispatch({ type: types.REMOVE_FROM_WISHLIST, id });
};
export const addToCompareList = (product) => (dispatch) => {
  dispatch({ type: types.ADD_TO_COMPARE, product });
};
export const removeFromCompareList = (product) => (dispatch) => {
  dispatch({ type: types.REMOVE_FROM_COMPARE_LIST, product });
};

// =======================================================
// === ADD THESE NEW AUTHENTICATION ACTION CREATORS ======
// =======================================================

/**
 * Dispatches a success action when the user logs in.
 * @param {object} user - The user object (e.g., { email, role })
 */
export const loginSuccess = (user) => (dispatch) => {
  toast.success(`Welcome ${user.role}! Login successful.`);
  dispatch({
    type: types.LOGIN_SUCCESS,
    payload: user,
  });
};

/**
 * Dispatches a logout action.
 */
export const logout = () => (dispatch) => {
  toast.info("You have been logged out.");
  dispatch({
    type: types.LOGOUT,
  });
};
