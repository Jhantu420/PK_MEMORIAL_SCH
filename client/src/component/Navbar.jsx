import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/appContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotificationsOutline, IoTrashOutline } from "react-icons/io5";
import gsap from "gsap";
import axios from "axios";

function Navbar() {
  const dropdownRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const {
    isAuthenticate,
    logout,
    isSidebarOpen,
    toggleSidebar,
    user,
    url,
    notifications,
    fetchNotification,
  } = useAuth();

  /** -------------------------
   *  Notification Handlers
   *  -------------------------
   */
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${url}/api/v1/get-in-touch/${id}`, {
        withCredentials: true,
      });
      fetchNotification();
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const markAsRead = async () => {
    try {
      await axios.post(
        `${url}/api/v1/get-in-touch-read`,
        {},
        { withCredentials: true }
      );
      fetchNotification();
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const toggleDropdown = async () => {
    if (!dropdownOpen) await markAsRead();
    setDropdownOpen((prev) => !prev);
  };

  /** -------------------------
   *  GSAP Animation for Dropdown
   *  -------------------------
   */
  useEffect(() => {
    if (dropdownOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [dropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".notification-button") // prevent closing when clicking the icon
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /** -------------------------
   *  Navigation Links
   *  -------------------------
   */
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Classes", path: "/classes" },
    {
      name: "Gallery",
      subLinks: [
        { name: "Image Gallery", path: "/image-gallery" },
        { name: "Video Gallery", path: "/video-gallery" },
      ],
    },
    { name: "Contact", path: "/contact" },
    ...(isAuthenticate && user?.data?.role === "admin"
      ? [{ name: "Dashboard", path: "/dashboard" }]
      : []),
    isAuthenticate
      ? { name: "Logout", onClick: logout }
      : { name: "Login", path: "/login" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const showSidebarToggle =
    user?.data?.role === "admin" && location.pathname.startsWith("/dashboard");

  return (
    <>
      <header className="bg-[#734af6] shadow-lg text-white p-4 w-full">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side - Logo & Sidebar Toggle */}
          <div className="flex items-center space-x-4">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 
                     5S4.168 5.477 3 6.253v13C4.168 18.477 
                     5.754 18 7.5 18s3.332.477 4.5 
                     1.253m0-13C13.168 5.477 14.754 
                     5 16.5 5c1.746 0 3.332.477 
                     4.5 1.253v13C19.832 18.477 
                     18.246 18 16.5 18c-1.746 0-3.332-.477-4.5-1.253"
                />
              </svg>
              PK MEMORIAL
            </h2>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 text-lg font-medium">
              {navLinks.map((item, index) => (
                <li key={index} className="relative group">
                  {item.subLinks ? (
                    <>
                      <span className="relative block py-2 px-4 cursor-pointer group font-pacifico">
                        {item.name}
                        <span
                          className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-400 
                         group-hover:w-full group-hover:left-0 
                         transition-all duration-300 ease-in-out"
                        />
                      </span>

                      {/* Dropdown Menu */}
                      <ul className="absolute left-0 top-full mt-2 bg-white text-black shadow-lg rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 min-w-[180px] z-50">
                        {item.subLinks.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={sub.path}
                              className="block px-4 py-2 hover:bg-yellow-400 hover:text-white rounded-md"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="relative block py-2 px-4 group font-pacifico"
                    >
                      {item.name}
                      <span
                        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-400 
                       group-hover:w-full group-hover:left-0 
                       transition-all duration-300 ease-in-out"
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="relative block py-2 px-4 group font-pacifico"
                    >
                      {item.name}
                      <span
                        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-400 
                       group-hover:w-full group-hover:left-0 
                       transition-all duration-300 ease-in-out"
                      />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Notifications */}
          <div className="relative">
            {user ? (
              <button
                className="relative p-2 rounded-full hover:bg-purple-500 transition notification-button"
                onClick={toggleDropdown}
              >
                <IoNotificationsOutline size={28} />
                {notifications.some((n) => !n.isRead) && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                    {notifications.filter((n) => !n.isRead).length}
                  </span>
                )}
              </button>
            ) : null}

            {/* Dropdown */}
            <div
              ref={dropdownRef}
              className={`absolute right-0 mt-2 w-[750px] p-10 shadow-lg rounded-lg overflow-hidden z-50 
                         bg-[#ffffff] transition-all duration-200 ${
                           dropdownOpen
                             ? "opacity-100 scale-100"
                             : "opacity-0 scale-95 pointer-events-none"
                         }`}
            >
              {notifications.length === 0 ? (
                <p className="p-4 text-center text-gray-300">
                  No notifications
                </p>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n._id}
                      className="hover:bg-[#5c37d7] transition-colors duration-150 
                                 flex items-center justify-between p-2 gap-4 border-b border-gray-200 text-black hover:text-white rounded-xl"
                    >
                      <div className="flex-1">{n.name}</div>
                      <div className="flex-1">{n.ph}</div>
                      <div className="flex-1 whitespace-normal break-words max-w-[250px]">
                        {n.msg}
                      </div>
                      <button
                        className="text-red-700 hover:text-red-500 cursor-pointer"
                        onClick={() => deleteNotification(n._id)}
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white cursor-pointer" onClick={toggleMenu}>
              {isMenuOpen ? (
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
                <svg
                  className="h-8 w-8 cursor-pointer"
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
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-br from-blue-600 to-purple-700 p-6 fixed inset-0 z-50 flex flex-col items-center justify-center">
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-white text-opacity-80 hover:text-opacity-100"
          >
            <svg
              className="h-10 w-10"
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

          <ul className="flex flex-col space-y-8 text-white text-3xl font-semibold">
            {navLinks.map((item, index) => (
              <li key={index} className="relative group">
                {item.subLinks ? (
                  <details>
                    <summary className="cursor-pointer py-2 px-4 group-hover:text-yellow-300">
                      {item.name}
                    </summary>
                    <ul className="pl-6 mt-2 space-y-3 text-2xl">
                      {item.subLinks.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={sub.path}
                            onClick={toggleMenu}
                            className="block hover:text-yellow-300"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : item.onClick ? (
                  <button
                    onClick={() => {
                      item.onClick();
                      toggleMenu();
                    }}
                    className="block py-2 px-4 transition-transform group-hover:scale-110 group-hover:text-yellow-300"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={toggleMenu}
                    className="block py-2 px-4 transition-transform group-hover:scale-110 group-hover:text-yellow-300"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
