import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
// Import ToastContainer
import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "./context/appContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* AppContextProvider and ToastContainer are siblings here */}
    <AppContextProvider>
      <App />
      <ToastContainer/>
    </AppContextProvider>
  </BrowserRouter>
);
