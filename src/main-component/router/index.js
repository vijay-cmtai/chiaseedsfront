// src/main-component/router/index.js (Updated Code)

import React from "react";
import { Routes, Route } from "react-router-dom";

// === ROUTE WRAPPERS ===
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// === PAGE IMPORTS ===
import Homepage from "../HomePage";
import AboutPage from "../AboutPage";
import ShopPage from "../ShopPage";
import ProductDetailsPage from "../ProductDetailsPage";
import CartPage from "../CartPage";
import WishlistPage from "../WishlistPage";
import ErrorPage from "../ErrorPage";
import ContactPage from "../ContactPage";
import LoginPage from "../LoginPage";
import SignUpPage from "../SignUpPage";
import Blog from "../BlogPage";
// --- YAHAN BLOGSINGLEPAGE KA IMPORT ADD KAREIN ---
import BlogSinglePage from "../BlogDetails"; // Maan rahe hain ki file ka naam BlogSinglePage.js hai
import ForgotPassword from "../ForgotPassword";
import AdminLayout from "../../Layout/AdminLayout";
import UserDashboardLayout from "../../Layout/UserDashboardLayout";
// ... baaki saare imports waise hi rahenge
import UserDashboardPage from "../../pages/user/UserDashboardPage";
import MyOrdersPage from "../../pages/user/MyOrdersPage";
import ProfilePage from "../../pages/user/ProfilePage";
import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import ManageProductsPage from "../../pages/admin/ManageProductsPage";
import ManageOrdersPage from "../../pages/admin/ManageOrdersPage";
import ManageUsersPage from "../../pages/admin/ManageUsersPage";
import Addresspage from "../../pages/user/AddressPage";
import WishlistPages from "../../pages/user/WishlistPages";
import OrderDetailPage from "../../pages/user/OrderDetailPage";
import AddEditProductPage from "../../pages/admin/AddEditProductPage";
import OtpVerificationPage from "../OtpVerificationPage";
import Privacypolicy from "../PrivacyPolicy";
import TermsAndConditions from "../TermsAndCondition";
import OrderConfirmationPage from "../../pages/OrderConfirmationPage";

const AllRoute = () => {
  return (
    <Routes>
      {/* ScrollToTop component page navigation par scroll ko handle karega */}

      {/* --- Public Routes --- */}
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product-single/:id" element={<ProductDetailsPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/404" element={<ErrorPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/verify-otp" element={<OtpVerificationPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/blog" element={<Blog />} />

      {/* --- YAHAN NAYA ROUTE ADD KIYA GAYA HAI --- */}
      <Route path="/blog-single/:id" element={<BlogSinglePage />} />

      <Route path="/termandcond" element={<TermsAndConditions />} />
      <Route path="privacypolicy" element={<Privacypolicy />} />
      <Route
        path="/order-confirmation/:orderId"
        element={<OrderConfirmationPage />}
      />

      {/* --- User Protected Routes --- */}
      <Route
        path="/user/*"
        element={
          <PrivateRoute>
            <UserDashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboardPage />} />
        <Route path="orders" element={<MyOrdersPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="address" element={<Addresspage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPages />} />
        <Route path="orders/:orderId" element={<OrderDetailPage />} />
      </Route>

      {/* --- Admin Protected Routes --- */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="products" element={<ManageProductsPage />} />
        <Route path="orders" element={<ManageOrdersPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="products/add" element={<AddEditProductPage />} />
        <Route
          path="products/edit/:productId"
          element={<AddEditProductPage />}
        />
      </Route>
    </Routes>
  );
};

export default AllRoute;
