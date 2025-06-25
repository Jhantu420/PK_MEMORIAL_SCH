import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/appContext";
import { useEffect } from "react"; 

const ProtectedRoute = () => {
  const { isAuthenticate} = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if ( !isAuthenticate) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticate, navigate]);
 
  return isAuthenticate ? <Outlet /> : null;
};
export default ProtectedRoute;
