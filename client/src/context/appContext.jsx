import { createContext, useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticate, setAuthenticate] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const url = "http://localhost:3000"; //"https://pk-memorial-server.onrender.com"

  const checkAuth = useCallback(async () => {
    try {
      const result = await axios.get(`${url}/api/v1/getAdmin`, {
        withCredentials: true,
      });
      // console.log("Auth result", result.data.data.role); // Add this
      setUser(result.data);
      setAuthenticate(true);
    } catch (error) {
      console.log("error form check auth catch block", error);
      setAuthenticate(false);
    }
  }, [url]);

  useEffect(() => {
    checkAuth();
  }, []);
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen]);

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
        user,
        checkAuth,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => useContext(AppContext);
