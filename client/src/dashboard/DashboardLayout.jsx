import { Sidebar } from "../component/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/appContext";
import { useEffect, useRef } from "react";
import StudentDashboard from "./StudentDashboard";

export default function DashboardLayout() {
  const sidebarRef = useRef(null);
  const { isSidebarOpen, closeSidebar } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, closeSidebar]);

  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <div ref={sidebarRef} className="z-50">
        <Sidebar />
      </div>

      <main
        className={`flex-1 p-4 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "opacity-40 md:opacity-100" : "opacity-100"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
