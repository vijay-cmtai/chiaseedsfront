// src/features/payment/paymentAPI.js
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/payment`,
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

const createRazorpayOrder = async (orderData) => {
  const response = await api.post("/create-order", orderData);
  return response.data.data;
};

const verifyPayment = async (paymentVerificationData) => {
  const response = await api.post("/verify", paymentVerificationData);
  return response.data.data;
};

const retryShipment = async (orderData) => {
  const response = await api.post("/retry-shipment", orderData);
  return response.data.data;
};

const paymentService = {
  createRazorpayOrder,
  verifyPayment,
  retryShipment,
};

export default paymentService;