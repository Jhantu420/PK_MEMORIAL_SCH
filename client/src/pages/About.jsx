import React from "react";
import AboutSch from "../assets/about_sch.png";


function About() {
  return (
    <div className="w-screen min-h-screen">
      

      {/* About Section */}
      <div className="w-full relative flex flex-col lg:flex-row items-center px-4 py-8 gap-6 bg-blue-50">
        {/* Background Layer */}
        <span className="absolute top-0 left-0 w-full h-full bg-blue-50 z-[-1]" />

        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center px-4 gap-10">
          <h1 className="font-roboto md:font-pacifico font-bold text-yellow-500 text-5xl sm:text-6xl md:text-9xl drop-shadow-lg">
            About Us
          </h1>
          <p className="font-roboto md:font-pacifico text-blue-700 text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-md max-w-2xl leading-relaxed">
            PK Memorial is an English medium school located in Dakshin Bhatora,
            in the district of Howrah, West Bengal. Our main aim is to encourage
            and ensure village students grow up in a convenient and advanced
            educational environment.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={AboutSch}
            alt="About School"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
