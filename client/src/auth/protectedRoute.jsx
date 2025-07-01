import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/appContext";
import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = () => {
  const { isAuthenticate, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticate) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticate, navigate, loading]);

  if (loading)
    return <Spinner animation="grow" />;

  return isAuthenticate ? <Outlet /> : null;
};
export default ProtectedRoute;
