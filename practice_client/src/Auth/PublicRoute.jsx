import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import { useEffect } from "react";

export const PublicRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticate } = useAuth();

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticate, navigate]);
  return isAuthenticate ? null : <Outlet />;
};
