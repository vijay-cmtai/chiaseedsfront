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

const getMyProfile = async () => {
  const response = await api.get("/profile");
  return response.data.data;
};

const updateMyProfile = async (userData) => {
  const response = await api.patch("/profile", userData);
  return response.data.data;
};

const updateUserAvatar = async (avatarFormData) => {
  const response = await api.patch("/profile/avatar", avatarFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

const getAddresses = async () => {
  const response = await api.get("/address");
  return response.data.data;
};

const addAddress = async (addressData) => {
  const response = await api.post("/address", addressData);
  return response.data.data;
};

const updateAddress = async ({ addressId, addressData }) => {
  const response = await api.patch(`/address/${addressId}`, addressData);
  return response.data.data;
};

const deleteAddress = async (addressId) => {
  const response = await api.delete(`/address/${addressId}`);
  return response.data.data;
};

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

const getCart = async () => {
  const response = await api.get("/cart");
  return response.data.data;
};

const addToCart = async (cartData) => {
  const response = await api.post("/cart", cartData);
  return response.data.data;
};

const removeFromCart = async (cartItemId) => {
  const response = await api.delete(`/cart/${cartItemId}`);
  return response.data.data;
};

const updateCartQuantity = async ({ productId, quantity }) => {
  const response = await api.patch(`/cart/quantity/${productId}`, { quantity });
  return response.data.data;
};

const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data.data;
};

const getMyOrders = async () => {
  const response = await api.get("/orders");
  return response.data.data;
};

const getSingleOrder = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data.data;
};
const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data.data;
};

const getRecentUserOrders = async () => {
  const response = await api.get("/orders/recent");
  return response.data.data;
};

const userService = {
  getMyProfile,
  updateMyProfile,
  updateUserAvatar,
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
  getSingleOrder,
  getDashboardStats,
  getRecentUserOrders,
};
export default userService;
