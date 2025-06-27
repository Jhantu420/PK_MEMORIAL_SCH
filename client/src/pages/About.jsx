import React from "react";
import AboutSch from "../assets/about_sch.png";
import EarthScene from "../canvas/EarthScene";
function About() {
  return (
    <div className="w-[100vw] h-[100vh]  ">
      <div className="w-[100vw] h-[80vh] bg-black">
        <EarthScene />
      </div>
      <div className="w-[100vw] h-[80vh]  flex ">
        <span className="w-[100vw] h-[90vh] absolute bg-blue-50 z-[-1]"></span>
        <div className="w-[100vw] h-[70vh] flex flex-col items-center p-5 gap-2">
          <h1 className="font-bold font-pacifico text-[9vw] text-shadow-lg text-yellow-500">
            About Us
          </h1>
          <p className="font-pacifico text-[2vw] text-[#265dd3] text-shadow-md">
            {" "}
            PK Memorial is an English medium school located in Dakshin Bhatora ,
            in the district of Howrah West Bengal. Our main aim is to encourage
            and ensure village student's to learn and grew up in a convenient
            and advance educational environment.
          </p>
        </div>
        <div className="w-[130%] h-[100%] flex items-center justify-center ">
          <img
            src={AboutSch}
            alt="AboutSch"
            className="w-[90%] h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
