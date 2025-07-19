import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/appContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticate, logout, isSidebarOpen, toggleSidebar, user } =
    useAuth();
  const navLink = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Classes", path: "/classes" },
    { name: "Contact", path: "/contact" },
    ...(isAuthenticate && user?.data?.role === "admin"
      ? [{ name: "Dashboard", path: "/dashboard" }]
      : []),
    isAuthenticate
      ? {
          name: "Logout",
          path: "#",
          onClick: () => {
            logout(); // Your logout function
          },
        }
      : { name: "Login", path: "/login" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const showSidebarToggle =
    user?.data?.role === "admin" && location.pathname.startsWith("/dashboard");
  return (
    <>
      <header className="bg-[#734af6] shadow-lg text-white p-4 w-[100vw]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Sidebar toggle (admin + dashboard pages only) */}
            {showSidebarToggle && (
              <GiHamburgerMenu
                style={{
                  fontSize: "25px",
                  color: "white",
                  cursor: isSidebarOpen ? "default" : "pointer",
                  visibility: isSidebarOpen ? "hidden" : "visible",
                }}
                onClick={!isSidebarOpen ? toggleSidebar : undefined}
              />
            )}

            {/* Logo */}
            <h2 className="md:text-3xl text-xl font-bold flex items-center text-yellow-400 font-pacifico ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="md:h-12 md:w-12 h-9 w-9 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332-.477-4.5-1.253"
                />
              </svg>
              PK MEMORIAL
            </h2>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-8 text-lg font-medium">
              {" "}
              {/* Increased space, added font-medium */}
              {navLink.map((item, index) => (
                <li key={index}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="relative block py-2 px-4 text-white group font-pacifico"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out"></span>
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-orange-400 ">
                        {item.name}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="relative block py-2 px-4 text-white group font-pacifico"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out"></span>
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ">
                        {item.name}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                // Close Icon (X) when menu is open
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon when menu is closed
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && ( // Conditionally render if isMenuOpen is true
        <div className="md:hidden bg-gradient-to-br from-blue-600 to-purple-700 p-6 fixed inset-0 z-50 flex flex-col items-center justify-center animate-fade-in">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-white text-opacity-80 hover:text-opacity-100 focus:outline-none transition duration-300"
            aria-label="Close navigation menu"
          >
            <svg
              className="h-10 w-10" // Increased size for better tap target
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <ul className="flex flex-col space-y-8 text-white text-3xl font-semibold">
            {navLink.map((item, index) => (
              <li
                key={index}
                className="relative group overflow-hidden" // For animation effect
              >
                {item.onClick ? (
                  <button
                    onClick={() => {
                      item.onClick();
                      toggleMenu();
                    }}
                    className="block py-2 px-4 transition-all duration-300 transform group-hover:scale-110 group-hover:text-yellow-300"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={toggleMenu}
                    className="block py-2 px-4 transition-all duration-300 transform group-hover:scale-110 group-hover:text-yellow-300"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Underline effect on hover */}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
