// src/features/admin/adminAPI.js

import axios from "axios";

// Backend URL ko environment variable se lein, ya local fallback use karein
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// Admin-specific API instance banayein
const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/admin`,
  withCredentials: true,
});

// Interceptor: Har request ke saath authentication token bhejne ke liye
api.interceptors.request.use((config) => {
  // Local storage se user data nikalein
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    // Agar user aur accessToken hai, to Authorization header set karein
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
  }
  return config;
});

// --- Dashboard & Stats ---
const getAdminDashboardStats = async () => {
  const response = await api.get("/dashboard");
  return response.data.data;
};

const getSalesOverview = async () => {
  const response = await api.get("/sales-overview");
  return response.data.data;
};

// --- Product Management ---
const getAllProducts = async () => {
  const response = await api.get("/products");
  console.log("This is all product", response.data.data);
  return response.data.data;
};

const createProduct = async (productFormData) => {
  const response = await api.post("/products", productFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

const updateProduct = async (productData) => {
  const { _id, ...updatePayload } = productData;
  const response = await api.put(`/products/${_id}`, updatePayload);
  return response.data.data;
};

const deleteProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data.data;
};

// --- User Management ---
const getAllUsers = async () => {
  const response = await api.get("/users");
  console.log("this is users", response.data.data);
  return response.data.data;
};

const updateUser = async (userData) => {
  const { _id, ...updatePayload } = userData;
  const response = await api.put(`/users/${_id}`, updatePayload);
  return response.data.data;
};

const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data.data; // Backend se confirmation ya updated list expect kar rahe hain
};

const getUserDetails = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data.data;
};

const getUserOrders = async (userId) => {
  const response = await api.get(`/users/${userId}/orders`);
  return response.data.data;
};

// --- Order Management ---
const getAllAdminOrders = async () => {
  const response = await api.get("/orders/all");
  return response.data.data;
};

const getRecentAdminOrders = async () => {
  const response = await api.get("/orders/recent");
  return response.data.data;
};

const updateOrderStatus = async ({ orderId, status }) => {
  const response = await api.patch(`/orders/${orderId}/status`, { status });
  return response.data.data;
};

// Sabhi functions ko ek service object me export karein
const adminService = {
  getAdminDashboardStats,
  getSalesOverview,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserDetails,
  getUserOrders,
  getAllAdminOrders,
  getRecentAdminOrders,
  updateOrderStatus,
};

export default adminService;
