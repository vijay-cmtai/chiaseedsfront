import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/admin`,
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

const getAdminDashboardStats = async () => {
  const response = await api.get("/dashboard");
  return response.data.data;
};

const getSalesOverview = async () => {
  const response = await api.get("/sales-overview");
  return response.data.data;
};

const getAllProducts = async () => {
  const response = await api.get("/products");
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
  await api.delete(`/products/${productId}`);
  return productId;
};

const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data.data;
};

const updateUser = async (userData) => {
  const { _id, ...updatePayload } = userData;
  const response = await api.put(`/users/${_id}`, updatePayload);
  return response.data.data;
};

const deleteUser = async (userId) => {
  await api.delete(`/users/${userId}`);
  return userId;
};

const getUserDetails = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data.data;
};

const getUserOrders = async (userId) => {
  const response = await api.get(`/users/${userId}/orders`);
  return response.data.data;
};

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

// ✅ Add this shipment creator function
const createShipmentForOrder = async (orderId) => {
  const response = await api.post(`/orders/${orderId}/create-shipment`);
  return response.data.data;
};

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
  createShipmentForOrder, // ✅ now it will be callable
};

export default adminService;
