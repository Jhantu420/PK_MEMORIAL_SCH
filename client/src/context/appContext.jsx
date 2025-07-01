import { createContext, useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [isAuthenticate, setAuthenticate] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ CORRECT


  const url = "http://localhost:3000"; //"https://pk-memorial-server.onrender.com"

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${url}/api/v1/getAdmin`, {
        withCredentials: true,
      });
      console.log("Auth result", result.data); // Add this
      setUser(result.data);
      setAuthenticate(true);
    } catch (error) {
      console.log("error form check auth catch block", error);
      setAuthenticate(false);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    checkAuth();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const result = await axios.get(`${url}/api/v1/logout`, {
        withCredentials: true,
      });
      console.log(result);
      setAuthenticate(false);
      setUser(null); // or [] if you're defaulting to an array
      toast.success("Logged out successfully");
      navigate("/login"); // or wherever you want
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <AppContext.Provider
      value={{
        url,
        isAuthenticate,
        setAuthenticate,
        logout,
        loading,
        user,
        checkAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => useContext(AppContext);
