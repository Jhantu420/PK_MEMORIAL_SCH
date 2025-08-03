import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { toast } from "react-toastify";
import { useAuth } from "../context/appContext";
import axios from "axios";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Classes = () => {
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const { url } = useAuth();
  const [classesData, setClassData] = useState([]);

  // Fetch classes from API
  const fetchClass = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/get-class`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setClassData(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch classes.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unexpected fetch error.");
    }
  };

  // Reset cardRefs when new data is loaded
  useEffect(() => {
    cardRefs.current = [];
  }, [classesData]);

  // Fetch class data on mount
  useEffect(() => {
    fetchClass();
  }, []);

  // GSAP animation for header and cards
  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      {
        y: 50,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
            // markers: true, // Uncomment to debug
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    });
  }, [classesData]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-4">
      <main className="w-full max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section
          ref={headerRef}
          className="text-center mb-12 p-6 bg-[#6A64F1] rounded-xl shadow-sm border border-gray-200"
        >
          <h2 className="text-6xl font-extrabold text-yellow-500 mb-4">
            Our Academic Classes
          </h2>
          <p className="text-xl text-yellow-300 max-w-3xl mx-auto leading-relaxed">
            A simplified overview of the classes offered, designed to be clear
            and easy to navigate for all users.
          </p>
        </section>

        {/* Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {classesData.map((classItem, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)} // Attach ref here
              className="bg-white rounded-xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition duration-300 ease-in-out flex flex-col"
            >
              <div className="relative w-full h-90vhflex items-center justify-center overflow-hidden rounded-t-xl">
                <img
                  src={classItem.imageUrl}
                  alt={classItem.className}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {classItem.className}
                </h3>
                <div className="text-gray-700 text-base mb-6 flex-grow">
                  <p className="text-indigo-700 font-bold text-lg">
                    <span className="text-gray-800 font-semibold">
                      Subject:
                    </span>{" "}
                    {classItem.subjects}
                  </p>
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md cursor-pointer">
                  Apply now...
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Classes;
