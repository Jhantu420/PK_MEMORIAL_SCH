import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { toast } from "react-toastify";
import { useAuth } from "../context/appContext";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

gsap.registerPlugin(ScrollTrigger);

const Classes = () => {
  const cardRefs = useRef([]);
  const { url,fetchNotification } = useAuth();
  const [classesData, setClassData] = useState([]);
  const [data, setData] = useState({
    name: "",
    ph: "",
    className: "",
  });

  const handleSubmit = async (e, selectedClassName) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/v1/apply-class`,
        {
          name: data.name,
          ph: data.ph,
          className: selectedClassName, 
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Class application submitted!");
        setData({ name: "", ph: "", className: "" });
        fetchNotification()
      } else {
        toast.error(response.data.message || "Failed to submit.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unexpected error.");
    }
  };

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

  useEffect(() => {
    cardRefs.current = [];
  }, [classesData]);

  useEffect(() => {
    fetchClass();
  }, []);

  useGSAP(() => {
    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
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
        <section className="text-center mb-12 p-6 bg-[#6A64F1] rounded-xl shadow-sm border border-gray-200">
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
              ref={(el) => (cardRefs.current[index] = el)}
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
                <Popup
                  trigger={
                    <button
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          className: classItem.className,
                        }))
                      }
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md cursor-pointer"
                    >
                      Apply now...
                    </button>
                  }
                  modal
                  nested
                  contentStyle={{
                    width: "400px",
                    maxWidth: "90%",
                    borderRadius: "10px",
                  }}
                >
                  {(close) => (
                    <div className="p-4 bg-white rounded shadow-lg">
                      <h2 className="text-lg font-bold mb-3 text-center">
                        Apply for Class{" "}
                        <span className="text-yellow-400">
                          {classItem.className}
                        </span>
                      </h2>
                      <form onSubmit={(e) => handleSubmit(e, classItem.className)}>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                          className="w-full border px-3 py-2 rounded mb-3"
                          required
                        />
                        <input
                          type="number"
                          placeholder="Enter your phone number"
                          value={data.ph}
                          onChange={(e) =>
                            setData({ ...data, ph: e.target.value })
                          }
                          className="w-full border px-3 py-2 rounded mb-3"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Classes;
