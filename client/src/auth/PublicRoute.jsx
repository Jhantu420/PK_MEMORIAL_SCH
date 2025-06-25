import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/appContext";
import { useEffect } from "react";

const PublicRoute = () => {
  // 1. Call all hooks unconditionally at the top of the component
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();

  // 2. Use useEffect for the navigation logic (side effect)
  useEffect(() => {
    // Only attempt to navigate IF authentication status is known (not loading)
    // AND the user is authenticated.
    if ( isAuthenticate) {
      // If the user is authenticated, redirect them away from public pages
      // like login/signup, to the dashboard.
      // { replace: true } ensures they can't go back to the public page using the browser back button.
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticate,  navigate]); // Dependencies: Re-run effect if these values change




  // If authenticated, we return null because the useEffect above will handle the navigation.
  // If not authenticated, we allow access to the nested public routes via <Outlet />.
  return isAuthenticate ? null : <Outlet />;
};

export default PublicRoute;