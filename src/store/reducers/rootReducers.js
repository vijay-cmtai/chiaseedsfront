import { combineReducers } from "redux";
import cartReducer from "./cart";
import wishListReducer from "./wishList";
import compareReducer from "./compare";
import productReducer from "./products";
import authReducer from "../../features/auth/authSlice"; // ✅ New

const rootReducer = combineReducers({
  cartList: cartReducer,
  wishList: wishListReducer,
  compareList: compareReducer,
  data: productReducer,
  auth: authReducer, // ✅ This is what your UI listens to
});

export default rootReducer;
