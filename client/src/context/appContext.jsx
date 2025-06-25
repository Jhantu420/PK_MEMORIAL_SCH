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

  const url = "https://pk-memorial.onrender.com";

  const checkAuth = useCallback(async () => {
    try {
      const result = await axios.get(`${url}/api/v1/getAdmin`, {
        withCredentials: true,
      });
      //   console.log("Result form check auth", result.data)

      console.log("Result form check auth", result.data)

      setUser(result.data);
      setAuthenticate(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      navigate("/login");
    }
  });
  useEffect(() => {
    checkAuth();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const result = await axios.get(`${url}/api/v1/logout`, {
        withCredentials: true,
      });
      console.log(result)
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
      value={{ url, isAuthenticate, setAuthenticate, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => useContext(AppContext);

// import { createContext, useCallback, useContext, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "react-toastify";
// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const [user, setUser] = useState([]);
//   const navigate = useNavigate();
//   const [isAuthenticate, setAuthenticate] = useState(false);

//   const url = "https://pk-memorial.onrender.com";

//   const checkAuth = useCallback(async () => {
//     try {
//       const result = await axios.get(`${url}/api/v1/getAdmin`, {
//         withCredentials: true,
//       });
//       //   console.log("Result form check auth", result.data)
//       setUser(result.data);
//       setAuthenticate(true);
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//       navigate("/");
//     }
//   });
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   return (
//     <AppContext.Provider value={{ url, isAuthenticate, setAuthenticate }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AppContext);
