import React from "react";

function RegisterStudent() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg shadow-lg w-1/2">
        <h1 className="text-2xl font-bold text-center text-white font-roboto md:font-pacifico  md:text-2xl p-2">
          Register Student
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 w-full h-full p-5">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="text"
            placeholder="Enter Your Email"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="text"
            placeholder="Enter Your Phone"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="text"
            placeholder="Enter Your Address"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="text"
            placeholder="Enter Your Class"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="text"
            placeholder="Enter Your Section"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="text"
            placeholder="Enter Your Roll Number"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="text"
            placeholder="Enter Your Parent Name"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="text"
            placeholder="Enter Your Parent Email"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="text"
            placeholder="Enter Your Parent Phone"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-black text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <input
            type="file"
            placeholder="Upload photo"
            className="w-full p-2 rounded-lg shadow-lg border-2 border-gray-300 text-white text-lg placeholder:text-gray-200 placeholder:text-lg  placeholder:text-center placeholder:font-roboto md:font-pacifico"
          />
          <button
            type="submit"
            className="w-full p-2 rounded-lg shadow-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-all duration-300 font-bold text-lg font-roboto md:font-pacifico hover:shadow-lg hover:shadow-blue-500/50 hover:text-white hover:font-bold hover:text-xl "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterStudent;
