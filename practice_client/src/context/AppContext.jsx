import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticate, setAuthenticate] = useState(false);
  const checkAuth = useCallback(async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/v1/getAdmin`, {
        withCredentials: true,
      });
      if (result.status === 200) {
        setAuthenticate(true);
      }
      // console.log("Result getting from context", result.status);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setAuthenticate(false)
        alert(error.response.data.message);
        navigate("/login");
      }
    }
  });
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AppContext.Provider value={{ setAuthenticate, isAuthenticate }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAuth = () => useContext(AppContext);
