import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

export const Sidebar = forwardRef(({ isOpen }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 h-full w-64 bg-[#734af6] text-white z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-4 hover:text-yellow-400 cursor-pointer">
            Dashboard
          </li>
          <li className="mb-4 hover:text-yellow-400 cursor-pointer">
            <Link to="/register-student">Students</Link>
          </li>
          <li className="mb-4 hover:text-yellow-400 cursor-pointer">
            Teachers
          </li>
        </ul>
      </div>
    </div>
  );
});
