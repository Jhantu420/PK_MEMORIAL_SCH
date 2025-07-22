import React, { useRef } from "react";
import AboutSch from "../assets/about_sch.png";
import ChartComponent from "../dashboard/Chart";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const teachers = [
  {
    name: "Mr. Arjun Singh",
    subject: "Mathematics",
    email: "arjun.singh@example.com",
    phone: "+91 9876543210",
    experience: 8,
    photoUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Ms. Priya Sharma",
    subject: "Science",
    email: "priya.sharma@example.com",
    phone: "+91 9123456780",
    experience: 6,
    photoUrl: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Mr. Ramesh Mehta",
    subject: "History",
    email: "ramesh.mehta@example.com",
    phone: "+91 9012345678",
    experience: 10,
    photoUrl: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Ms. Neha Kapoor",
    subject: "English",
    email: "neha.kapoor@example.com",
    phone: "+91 9988776655",
    experience: 5,
    photoUrl: "https://i.pravatar.cc/150?img=20",
  },
  {
    name: "Mr. Anil Verma",
    subject: "Physics",
    email: "anil.verma@example.com",
    phone: "+91 9876501234",
    experience: 7,
    photoUrl: "https://i.pravatar.cc/150?img=30",
  },
  {
    name: "Ms. Kavita Desai",
    subject: "Computer Science",
    email: "kavita.desai@example.com",
    phone: "+91 9811223344",
    experience: 9,
    photoUrl: "https://i.pravatar.cc/150?img=25",
  },
];
function About() {
  const h1Ref = useRef();
  const pRef = useRef();
  const imgRef = useRef();

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
      // delay:1,
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
      <div className="p-14 flex flex-col gap-16" ref={imgRef}>
        <h1 className="font-roboto md:font-pacifico font-bold text-yellow-500 text-5xl sm:text-6xl md:text-7xl drop-shadow-lg text-center">Our Teachers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className=" bg-[#734af6] border-2 border-[#734af6] rounded-xl shadow-md p-4 transition hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={teacher.photoUrl}
                  alt={teacher.name}
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border "
                />
                <div>
                  <h2 className="text-lg font-semibold text-[#734af6]">{teacher.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {teacher.subject}
                  </p>
                </div>
              </div>
              <div className="mt-3 text-sm md:text-xl text-white font-roboto">
                <p>
                  <strong>Email:</strong> {teacher.email}
                </p>
                <p>
                  <strong>Phone:</strong> {teacher.phone}
                </p>
                <p>
                  <strong>Experience:</strong> {teacher.experience} years
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
