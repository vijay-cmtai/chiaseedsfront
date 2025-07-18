import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/auth/`;

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData); // Fixed typo
    const user = response.data.data?.user || response.data.user;
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
  try {
    const response = await axios.post(API_URL + "verify-otp", otpData);
    const data = response.data;
    if (data && data.data && data.data.user) {
      localStorage.setItem("user", JSON.stringify(data.data.user));
      return data;
    } else {
      throw new Error("Invalid OTP verification response structure");
    }
  } catch (error) {
    console.error("❌ OTP Verification API Error:", error.response?.data || error.message);
    throw error;
  }
};

const logout = async () => {
  localStorage.removeItem("user");
  return { success: true, message: "Logout successful" };
};

const forgotPassword = async (emailData) => {
  const response = await axios.post(API_URL + "forgot-password", emailData);
  return response.data;
};

const resetPassword = async (resetData) => {
  const { resetToken, password } = resetData;
  if (!resetToken) {
    throw new Error("Reset token is missing. Cannot reset password.");
  }
  const response = await axios.post(API_URL + `reset-password/${resetToken}`, { password });
  return response.data;
};

const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
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
  forgotPassword,
  resetPassword,
  getCurrentUser,
  isAuthenticated,
};

export default authService;
