// trackingAPI.js
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"}/api/v1/track`,
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

// ✅ This was already present
const getOrderStatus = async (orderId) => {
  const response = await api.get(`/${orderId}`);
  return response.data.data;
};

// ✅ Add this NEW function to retry shipment (connects to backend's retryShipment controller)
const createShipmentForOrder = async (orderId) => {
  const response = await api.post(`/retry-shipment`, { orderId });
  return response.data.data;
};

const trackingService = {
  getOrderStatus,
  createShipmentForOrder, // ✅ Add this line
};

export default trackingService;
