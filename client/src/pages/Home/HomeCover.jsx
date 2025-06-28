import React from "react";
import School_Img from "../../assets/School.png";
import { useNavigate } from "react-router-dom";
function HomeCover() {
  const navigate = useNavigate();
  const handleClick = () => {

    navigate("/about");
  };
  return (
    <div
      className="w-[100vw] h-screen relative flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${School_Img})` }}
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#100f0fc3] z-0"></div>

      {/* Text content */}
      <div className="relative z-10 text-center px-6 max-w-[90%] md:max-w-[80%]">
        <h1 className="font-pacifico font-bold text-orange-400 text-[10vw] sm:text-6xl md:text-7xl drop-shadow-[0_2px_10px_rgba(255,165,0,0.8)]">
          Our Kids Our Pride
        </h1>
        <p className="font-pacifico text-white text-[4vw] sm:text-xl md:text-2xl mt-3 leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(252,192,0,0.8)]">
          "Every child is a unique star, destined to shine. Nurture their
          dreams, empower their minds, and watch them illuminate the world with
          their brilliance."
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 mt-6 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={handleClick}
          className="group relative w-[70vw] max-w-xs sm:w-48 py-3 rounded-full border-2 border-[#6A64F1] text-orange-400 text-lg font-pacifico overflow-hidden transition-colors duration-500 hover:text-white cursor-pointer"
        >
          <span className="absolute left-0 bottom-0 h-full w-0 rounded-full bg-gradient-to-r from-[#6A64F1] to-[#1f1a77] transition-all duration-500 group-hover:w-full z-[-1]" />
          Learn More...
        </button>

        <button className="group relative w-[70vw] max-w-xs sm:w-48 py-3 rounded-full border-2 border-[#6A64F1] text-orange-400 text-lg font-pacifico overflow-hidden transition-colors duration-500 hover:text-white cursor-pointer">
          <span className="absolute left-0 bottom-0 h-full w-0 rounded-full bg-gradient-to-r from-[#6A64F1] to-[#1f1a77]transition-all duration-500 group-hover:w-full z-[-1]" />
          Get in Touch
        </button>
      </div>
    </div>
  );
}

export default HomeCover;
