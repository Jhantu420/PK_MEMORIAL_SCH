import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/appContext";
import gsap from "gsap";

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useAuth();
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", label: "Student Dashboard" },
    { path: "/dashboard/register-student", label: "Register Students" },
    { path: "/dashboard/register-teachers", label: "Register Teacher" },
    { path: "/dashboard/teacher-dashboard", label: "Teacher Dashboard" },
    { path: "/dashboard/create-class", label: "Create Class" },
    { path: "/dashboard/class-dashboard", label: "Class Dashboard" },
  ];

  // Animate sidebar open
  useEffect(() => {
    if (isSidebarOpen) {
      // Animate sidebar open
      gsap.fromTo(
        sidebarRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.5, ease: "power2.out" }
      );
    } else {
      // Animate sidebar close
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [isSidebarOpen]);

  const handleNavigation = (path) => {
    // Animate sidebar closing
    gsap.to(sidebarRef.current, {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        navigate(path); // Navigate AFTER animation
      },
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar} // this will trigger the close animation now
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-64 bg-[#734af6] text-white z-50"
        style={{ transform: "translateX(-100%)" }} // Initial hidden state
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="block w-full text-left px-4 py-3 rounded-md text-white hover:bg-white hover:text-[#734af6] transition-all duration-200 font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
