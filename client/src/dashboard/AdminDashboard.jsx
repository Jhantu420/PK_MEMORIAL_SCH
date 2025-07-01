import React, { useState, useRef, useEffect } from "react";
import { Sidebar } from "../component/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} ref={sidebarRef} />
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-50 z-50  text-white p-2 rounded-full shadow-lg"
      >
        ☰
      </button>
      <div
        className={`w-full min-h-screen bg-gray-100 p-4 flex flex-col gap-9 font-inter transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Admin Dashboard
        </h1>
        {/* ...rest of your dashboard... */}
      </div>
      <Outlet />
    </div>
  );
}
