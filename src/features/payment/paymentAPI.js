import axios from "axios";

// Environment variable se backend URL lein, agar nahi hai to localhost fallback karega.
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// Axios ka ek instance banayein jo hamesha sahi base URL par call karega.
const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/payment`,
  withCredentials: true, // Cookies ko bhejne aur receive karne ke liye zaroori
});

// Har request bhejne se pehle, ye interceptor user ka token header me add karega.
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

/**
 * Backend se Razorpay order create karne ke liye API call karta hai.
 * @param {object} orderData - Address ID aur amount.
 * @returns {object} - Sirf zaroori order details (orderId, amount, currency, etc.).
 */
const createRazorpayOrder = async (orderData) => {
  const response = await api.post("/create-order", orderData);
  // Hum response.data.data return kar rahe hain taaki Redux me seedha order object jaaye.
  return response.data.data;
};

/**
 * Payment ko verify karne ke liye API call karta hai.
 * @param {object} paymentVerificationData - Razorpay ke payment IDs aur signature.
 * @returns {object} - Final confirmed order details.
 */
const verifyPayment = async (paymentVerificationData) => {
  const response = await api.post("/verify", paymentVerificationData);
  // Yahan bhi, hum sirf zaroori data hi aage bhej rahe hain.
  return response.data.data;
};

// Sabhi functions ko ek 'paymentService' object me export karein.
const paymentService = {
  createRazorpayOrder,
  verifyPayment,
};

export default paymentService;
