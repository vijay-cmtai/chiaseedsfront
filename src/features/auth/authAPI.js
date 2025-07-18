// src/features/auth/authAPI.js
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/auth/`;

// ... (register, login, verifyOtp functions waise hi rahenge) ...

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);
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

const verifyOtp = async (otpData) => {
  const response = await axios.post(API_URL + "verify-otp", otpData);
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
  return { success: true, message: "Logout successful" };
};

// --- YAHAN NAYE FUNCTIONS ADD KIYE GAYE HAIN ---

/**
 * Sends a password reset request
 * @param {object} emailData - { email: 'user@example.com' }
 */
const forgotPassword = async (emailData) => {
  const response = await axios.post(API_URL + "forgot-password", emailData);
  return response.data;
};

/**
 * Resets the password using a token
 * @param {object} resetData - { token: 'some-token', password: 'new-password' }
 */
const resetPassword = async (resetData) => {
  const { token, password } = resetData;
  const response = await axios.post(API_URL + `reset-password/${token}`, {
    password,
  });
  return response.data;
};
// --- END OF NEW FUNCTIONS ---

const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

const authService = {
  register,
  login,
  logout,
  verifyOtp,
  forgotPassword, // Export karein
  resetPassword, // Export karein
  getCurrentUser,
  isAuthenticated,
};

export default authService;
