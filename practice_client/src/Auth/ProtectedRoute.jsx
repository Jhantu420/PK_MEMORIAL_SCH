import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import { useEffect, useState } from "react";
export const ProtectedRoute = () => {
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticate) {
      navigate("/login", { replace: true });
    }
  },[navigate, isAuthenticate]);
  return <Outlet />;
};
