// src/features/auth/authAPI.js
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // Ensure this is defined in .env
const API_URL = `${BACKEND_URL}/api/v1/auth/`;

/**
 * Registers a new user
 */
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

/**
 * Logs in a user and saves user data to localStorage
 */
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);
    console.log("✅ Login API Response:", response.data);

    // Check if data structure is correct
    const user = response.data.data || response.data.user;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } else {
      throw new Error("Invalid login response structure");
    }
  } catch (error) {
    console.error("❌ Login API Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Verifies OTP
 */
const verifyOtp = async (otpData) => {
  const response = await axios.post(API_URL + "verify-otp", otpData);
  return response.data;
};

/**
 * Logs out the user
 */
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
  verifyOtp,
};

export default authService;
