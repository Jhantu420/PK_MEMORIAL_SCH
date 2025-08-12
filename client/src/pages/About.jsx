import React, { useRef } from "react";
import AboutSch from "../assets/about_sch.png";
import ChartComponent from "../dashboard/Chart";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAuth } from "../context/appContext";

function About() {
  const h1Ref = useRef();
  const pRef = useRef();
  const imgRef = useRef();
  const cardRefs = useRef([]);
  const { teacherList } = useAuth();

  useGSAP(() => {
    gsap.from(h1Ref.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(pRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(imgRef.current, {
      x: -1000,
      opacity: 0,
      duration: 3,
      ease: "power2.out",
    });
  });

  return (
    <div className="w-screen min-h-screen">
      {/* About Section */}
      <div className="w-full relative flex flex-col lg:flex-row items-center px-4 py-8 gap-6">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center px-4 gap-10">
          <h1
            className="font-roboto md:font-pacifico font-bold text-yellow-500 text-5xl sm:text-6xl md:text-9xl drop-shadow-lg"
            ref={h1Ref}
          >
            About Us
          </h1>
          <p
            className="font-roboto md:font-pacifico text-blue-700 text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-md max-w-2xl leading-relaxed"
            ref={pRef}
          >
            PK Memorial is an English medium school located in Dakshin Bhatora,
            in the district of Howrah, West Bengal. Our main aim is to encourage
            and ensure village students grow up in a convenient and advanced
            educational environment.
          </p>
        </div>

        {/* Image Section */}
        <div
          className="w-full lg:w-1/2 flex justify-center items-center"
          ref={imgRef}
        >
          <img
            src={AboutSch}
            alt="About School"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-2xl"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ChartComponent />
      </div>
      <div className="p-6 sm:p-10 md:p-14 flex flex-col gap-12 sm:gap-16">
        <h1 className="font-roboto md:font-pacifico font-bold text-yellow-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg text-center">
          Our Teachers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {teacherList.map((t, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseEnter={() =>
                gsap.to(cardRefs.current[index], {
                  scale: 1.05,
                  boxShadow: "0px 12px 24px rgba(0,0,0,0.25)",
                  duration: 0.5,
                  ease: "power2.out",
                })
              }
              onMouseLeave={() =>
                gsap.to(cardRefs.current[index], {
                  scale: 1,
                  boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                  duration: 0.5,
                  ease: "power2.out",
                })
              }
              className="bg-gradient-to-br from-[#734af6] to-[#5d35d1] border border-[#734af6] rounded-2xl shadow-lg p-6 transition-all cursor-pointer flex flex-col items-center text-center"
            >
              <img
                src={t.imageUrl}
                alt={t.name}
                className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-md mb-4"
              />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t.name}
              </h2>
              <p className="text-sm text-gray-200 mb-4">{t.subject}</p>

              <div className="text-sm sm:text-base md:text-lg text-white font-roboto leading-relaxed space-y-2">
                <p>
                  <strong className="text-yellow-300">Email:</strong> {t.email}
                </p>
                <p>
                  <strong className="text-yellow-300">Phone:</strong> {t.phone}
                </p>
                <p>
                  <strong className="text-yellow-300">Experience:</strong>{" "}
                  {t.experience} years
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
