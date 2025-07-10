// src/main-component/router/PrivateRoute.js (Corrected Code)

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// Component ab 'children' prop lega
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    // Agar user logged in nahi hai, to login page par bhejo
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Agar user logged in hai, to uske children (yani <UserDashboardLayout />) ko render karo
  return children; // <-- YEH HAI SAHI TARIKA, <Outlet /> KI JAGAH
};

export default PrivateRoute;
