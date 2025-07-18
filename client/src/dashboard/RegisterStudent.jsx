import React from "react";

function RegisterStudent() {
  const commonInputClasses =
    "w-full p-3 rounded-lg shadow-md border border-gray-300 text-black placeholder:text-gray-500 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-5xl p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-[#5335b6] mb-8 font-roboto md:font-pacifico">
          Register Student
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          {/* Student Info */}
          <h2 className="md:col-span-2 text-xl font-semibold text-center text-[#5335b6]">
            Student Information
          </h2>

          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input id="name" type="text" className={commonInputClasses} placeholder="John Doe" />
          </div>


          <div>
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input id="phone" type="text" className={commonInputClasses} placeholder="1234567890" />
          </div>

          <div>
            <label htmlFor="address" className="block mb-1">Address</label>
            <input id="address" type="text" className={commonInputClasses} placeholder="123 Main Street" />
          </div>

          <div>
            <label htmlFor="class" className="block mb-1">Class</label>
            <input id="class" type="text" className={commonInputClasses} placeholder="10th" />
          </div>

          <div>
            <label htmlFor="roll" className="block mb-1">Roll Number</label>
            <input id="roll" type="text" className={commonInputClasses} placeholder="25" />
          </div>

          {/* Parent Info */}
          <h2 className="md:col-span-2 text-xl font-semibold text-center text-[#5335b6] mt-4">
            Parent Information
          </h2>

          <div>
            <label htmlFor="parentName" className="block mb-1">Parent Name</label>
            <input id="parentName" type="text" className={commonInputClasses} placeholder="Jane Doe" />
          </div>


          <div>
            <label htmlFor="parentPhone" className="block mb-1">Parent Phone</label>
            <input id="parentPhone" type="text" className={commonInputClasses} placeholder="9876543210" />
          </div>

          <div>
            <label htmlFor="photo" className="block mb-1">Upload Photo</label>
            <input
              id="photo"
              type="file"
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5335b6] file:text-white hover:file:bg-blue-600 shadow-md cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full p-3 rounded-lg shadow-md bg-[#5335b6] text-white font-bold text-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterStudent;
