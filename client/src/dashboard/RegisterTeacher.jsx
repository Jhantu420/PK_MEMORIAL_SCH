import React from "react";

function RegisterTeacher() {
  const commonInputClasses =
    "w-full p-3 rounded-lg shadow-md border border-gray-300 text-black placeholder:text-gray-500 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-[#5335b6] mb-8 font-roboto md:font-pacifico">
          Register Teacher
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div>
            <label htmlFor="name" className="block mb-1">Full Name</label>
            <input id="name" type="text" className={commonInputClasses} placeholder="Alice Smith" />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input id="email" type="email" className={commonInputClasses} placeholder="alice@example.com" />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input id="phone" type="text" className={commonInputClasses} placeholder="9876543210" />
          </div>

          <div>
            <label htmlFor="address" className="block mb-1">Address</label>
            <input id="address" type="text" className={commonInputClasses} placeholder="City, State" />
          </div>

          <div>
            <label htmlFor="qualification" className="block mb-1">Qualification</label>
            <input id="qualification" type="text" className={commonInputClasses} placeholder="M.Sc, B.Ed" />
          </div>

          <div>
            <label htmlFor="experience" className="block mb-1">Experience (in years)</label>
            <input id="experience" type="number" className={commonInputClasses} placeholder="5" />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-1">Subject Expertise</label>
            <input id="subject" type="text" className={commonInputClasses} placeholder="Mathematics" />
          </div>

          <div>
            <label htmlFor="photo" className="block mb-1">Upload Photo</label>
            <input
              id="photo"
              type="file"
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5335b6] file:text-white hover:file:bg-blue-600 shadow-md"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full p-3 rounded-lg shadow-md bg-[#5335b6] text-white font-bold text-lg hover:bg-blue-600 transition-all duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterTeacher;
