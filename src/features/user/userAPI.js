import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/users`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
  }
  return config;
});

// --- Profile & Dashboard ---
const getMyProfile = async () => {
  const response = await api.get("/profile");
  return response.data.data;
};

const updateMyProfile = async (profileData) => {
  const response = await api.put("/profile", profileData);
  return response.data.data;
};

const updateUserAvatar = async (avatarFormData) => {
  const response = await api.patch("/avatar", avatarFormData);
  return response.data.data;
};

const getDashboardStats = async () => {
  const response = await api.get("/dashboard");
  return response.data.data;
};

// --- Address Management ---
const getAddresses = async () => {
  const response = await api.get("/addresses");
  return response.data.data;
};

const addAddress = async (addressData) => {
  const response = await api.post("/addresses", addressData);
  return response.data.data;
};

const updateAddress = async (addressData) => {
  const { _id, ...updatePayload } = addressData;
  const response = await api.put(`/addresses/${_id}`, updatePayload);
  return response.data.data;
};

const deleteAddress = async (addressId) => {
  const response = await api.delete(`/addresses/${addressId}`);
  return response.data.data;
};

// --- Wishlist Management ---
const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data.data;
};

const addToWishlist = async (productId) => {
  const response = await api.post("/wishlist", { productId });
  return response.data.data;
};

const removeFromWishlist = async (productId) => {
  const response = await api.delete(`/wishlist/${productId}`);
  return response.data.data;
};

// === Cart Management ===
const getCart = async () => {
  const response = await api.get("/cart");
  return response.data.data;
};

const addToCart = async ({ productId, quantity }) => {
  const response = await api.post("/cart", { productId, quantity });
  return response.data.data;
};

const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data.data;
};

const updateCartQuantity = async ({ productId, quantity }) => {
  const response = await api.patch(`/cart/${productId}`, { quantity });
  return response.data.data;
};

// --- Order Management ---
const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data.data;
};

const getMyOrders = async () => {
  const response = await api.get("/orders");
  return response.data.data;
};

const getOrderDetail = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data.data;
};

const getRecentUserOrders = async () => {
  const response = await api.get("/orders/recent");
  return response.data.data;
};

// Export all functions as a single service object for clean importing
const userService = {
  getMyProfile,
  updateMyProfile,
  updateUserAvatar,
  getDashboardStats,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  createOrder,
  getMyOrders,
  getOrderDetail,
  getRecentUserOrders,
};

export default userService;
