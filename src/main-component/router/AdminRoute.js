// src/main-component/router/AdminRoute.js (Corrected Code)

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// Component ab 'children' prop lega
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    // Agar user logged in nahi hai, to login page par bhejo
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Aapke state structure ke hisab se user role check karein
  const userRole = user?.user?.role || user?.role;

  if (userRole !== "admin") {
    // Agar user admin nahi hai, to use warn karke uske dashboard par bhejo
    toast.error("Access Denied: You are not an Admin.");
    return <Navigate to="/user/dashboard" replace />;
  }

  // Agar user logged in hai aur admin bhi hai, to uske children (yani <AdminLayout />) ko render karo
  return children; // <-- YEH HAI SAHI TARIKA, <Outlet /> KI JAGAH
};

export default AdminRoute;