import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Classes = () => {
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  const classesData = [
    { name: "Nursery", status: "Enrollment Open", subject: "Bengali, English, Math" },
    { name: "LKG", status: "Enrollment Open", subject: "Bengali, English, Math" },
    { name: "UKG", status: "Enrollment Open", subject: "Bengali, English, Math" },
    { id: "G1-A", name: "Grade 1 - Section A", status: "Enrollment Open", subject: "Bengali, English, Math" },
    { id: "G2-A", name: "Grade 2 - Section A", status: "Enrollment Open", subject: "Bengali, English, Math" },
    { id: "G3-A", name: "Grade 3 - Section A", status: "Enrollment Open", subject: "Bengali, English, Math" },
    { id: "G4-A", name: "Grade 4 - Section A", status: "Enrollment Open", subject: "Bengali, English, Math" },
    { id: "G5-A", name: "Grade 5 - Section A", status: "Enrollment Open", subject: "Bengali, English, Math" },
  ];

  useGSAP(() => {
    // Animate header
    gsap.from(headerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Animate each card individually on scroll
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none", // animation plays once llwhen in view
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay:0.5,
          ease: "power3.out",
        });
      }
    });
  }, []);

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
            A simplified overview of the classes offered, designed to be clear and easy to navigate for all users.
          </p>
        </section>

        {/* Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {classesData.map((classItem, index) => (
            <div
              key={classItem.id || classItem.name}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white rounded-xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition duration-300 ease-in-out flex flex-col"
            >
              <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                Class Visual
                {classItem.status && (
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      classItem.status === "Class Full"
                        ? "bg-red-500"
                        : classItem.status === "Few Seats Left"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    } text-white`}
                  >
                    {classItem.status}
                  </span>
                )}
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {classItem.name}
                </h3>
                <div className="text-gray-700 text-base mb-6 flex-grow">
                  <p className="text-indigo-700 font-bold text-lg">
                    <span className="text-gray-800 font-semibold">Subject:</span> {classItem.subject}
                  </p>
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md cursor-pointer">
                  Apply now....
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
