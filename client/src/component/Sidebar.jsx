// Sidebar.js
import { Link } from "react-router-dom";
import { useAuth } from "../context/appContext";

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useAuth();

  return (
    <>
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#734af6] text-white z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <ul>
            <li className="mb-4 hover:text-yellow-400 cursor-pointer">
              <Link to="/dashboard" onClick={toggleSidebar}>
                Dashboard
              </Link>
            </li>
            <li className="mb-4 hover:text-yellow-400 cursor-pointer">
              <Link to="/dashboard/register-student" onClick={toggleSidebar}>
                Students
              </Link>
            </li>
            <li className="mb-4 hover:text-yellow-400 cursor-pointer">
              <Link to="/dashboard/register-teachers" onClick={toggleSidebar}>
                Teachers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
