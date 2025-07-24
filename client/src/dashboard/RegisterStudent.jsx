import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/appContext";
import gsap from "gsap";

function RegisterStudent() {
  const registerRef = useRef();
  useEffect(() => {
    gsap.from(registerRef.current, {
      x: 300,
      opacity: 0,
      duration: 1.8,
      ease: "power2.out",
    });
  }, []);
  const { url } = useAuth();
  const [classList, setClassList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    rollNo: "",
    classId: "",
    image: null,
    parentName: "",
    parentPh: "",
  });

  const commonInputClasses =
    "w-full p-3 rounded-lg shadow-md border border-gray-300 text-black placeholder:text-gray-500 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/get-class`);
      if (res.data.success) {
        setClassList(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load classes");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("address", formData.address);
    form.append("rollNo", formData.rollNo);
    form.append("classId", formData.classId);
    form.append("parentName", formData.parentName);
    form.append("parentPh", formData.parentPh);
    form.append("image", formData.image);
    // console.log("form data before submitiong", formData);
    try {
      const res = await axios.post(`${url}/api/v1/register-student`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Student registered successfully!");
        setFormData({
          name: "",
          phone: "",
          address: "",
          rollNo: "",
          classId: "",
          image: null,
          parentName: "",
          parentPh: "",
        });
      } else {
        toast.error(res.data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-5xl p-8 bg-white rounded-xl shadow-2xl border border-gray-200" ref={registerRef}>
        <h1 className="text-3xl font-bold text-center text-[#5335b6] mb-8 font-roboto md:font-pacifico">
          Register Student
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black"
        >
          {/* Student Info */}
          <h2 className="md:col-span-2 text-xl font-semibold text-center text-[#5335b6]">
            Student Information
          </h2>

          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={commonInputClasses}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className={commonInputClasses}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="1234567890"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className={commonInputClasses}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="123 Main Street"
              required
            />
          </div>

          <div>
            <label htmlFor="classId" className="block mb-1">
              Class
            </label>
            <select
              id="classId"
              name="classId"
              className={commonInputClasses}
              value={formData.classId}
              onChange={(e) =>
                setFormData({ ...formData, classId: e.target.value })
              }
              required
            >
              <option value="">Select Class</option>
              {classList.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rollNo" className="block mb-1">
              Roll Number
            </label>
            <input
              id="rollNo"
              name="rollNo"
              type="text"
              className={commonInputClasses}
              value={formData.rollNo}
              onChange={(e) =>
                setFormData({ ...formData, rollNo: e.target.value })
              }
              placeholder="25"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block mb-1">
              Upload Photo
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5335b6] file:text-white hover:file:bg-[#a488ff] shadow-md cursor-pointer"
            />
          </div>

          {/* Parent Info */}
          <h2 className="md:col-span-2 text-xl font-semibold text-center text-[#5335b6] mt-4">
            Parent Information
          </h2>

          <div>
            <label htmlFor="parentName" className="block mb-1">
              Parent Name
            </label>
            <input
              id="parentName"
              name="parentName"
              type="text"
              className={commonInputClasses}
              value={formData.parentName}
              onChange={(e) =>
                setFormData({ ...formData, parentName: e.target.value })
              }
              placeholder="Jane Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="parentPh" className="block mb-1">
              Parent Phone
            </label>
            <input
              id="parentPh"
              name="parentPh"
              type="text"
              className={commonInputClasses}
              value={formData.parentPh}
              onChange={(e) =>
                setFormData({ ...formData, parentPh: e.target.value })
              }
              placeholder="9876543210"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full p-3 rounded-lg shadow-md bg-[#5335b6] text-white font-bold text-lg hover:bg-[#a488ff] transition-all duration-300 cursor-pointer"
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
