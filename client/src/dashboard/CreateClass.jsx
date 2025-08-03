import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/appContext";
import { toast } from "react-toastify";
import gsap from "gsap";

function CreateClass() {
  const registerRef = useRef();
  useEffect(() => {
    gsap.from(registerRef.current, {
      x: 300,
      duration: 1.8,
      ease: "power2.out",
    });
  }, []);
  const { url } = useAuth();
  const [data, setData] = useState({
    className: "",
    subjects: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("className", data.className);
    formData.append("subjects", data.subjects);
    formData.append("image", data.image); // "image" must match multer field name

    try {
      const result = await axios.post(`${url}/api/v1/create-class`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.data.success) {
        toast.success("Class Created successfully!");
        setData({
          className: "",
          subjects: "",
          image: null,
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        err.response?.data?.message || "Teacher registration failed..."
      );
    }
  };

  const commonInputClasses =
    "w-full p-3 rounded-lg shadow-md border border-gray-300 text-black placeholder:text-gray-500 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-2xl border border-gray-200" ref={registerRef}>
        <h1 className="text-3xl font-bold text-center text-[#5335b6] mb-8 font-roboto md:font-pacifico">
          Create Classes
        </h1>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="block mb-1">
              Class Name
            </label>
            <input
              id="name"
              type="text"
              className={commonInputClasses}
              value={data.className}
              onChange={(e) => setData({ ...data, className: e.target.value })}
              placeholder="LKG, UKG"
            />
          </div>

          <div>
            <label htmlFor="subjects" className="block mb-1">
              Subject's
            </label>
            <textarea
              id="subjects"
              className={commonInputClasses}
              value={data.subjects}
              onChange={(e) => setData({ ...data, subjects: e.target.value })}
              placeholder="Bengali, English"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block mb-1">
              Upload Photo
            </label>
            <input
              id="photo"
              type="file"
              name="image"
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5335b6] file:text-white hover:file:bg-blue-600 shadow-md"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
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

export default CreateClass;
