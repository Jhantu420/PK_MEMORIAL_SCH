import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/appContext";
import { toast } from "react-toastify";
import gsap from "gsap";

function RegisterTeacher() {
  const registerRef = useRef();
  useEffect(() => {
    gsap.from(registerRef.current, {
      x: 300,
      opacity: 0,
      duration: 1.8,
      ease: "power2.out",
    });
  },[]);
  const { url } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    experience: "",
    subject: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("qualification", formData.qualification);
    data.append("experience", formData.experience);
    data.append("subject", formData.subject);
    data.append("image", formData.image); // must match multer field name

    try {
      const res = await axios.post(`${url}/api/v1/register-teacher`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success("Teacher created successfully!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
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
          Register Teacher
        </h1>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="block mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={commonInputClasses}
              placeholder="Alice Smith"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={commonInputClasses}
              placeholder="alice@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              className={commonInputClasses}
              placeholder="9876543210"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              className={commonInputClasses}
              placeholder="City, State"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="qualification" className="block mb-1">
              Qualification
            </label>
            <input
              id="qualification"
              type="text"
              className={commonInputClasses}
              placeholder="M.Sc, B.Ed"
              value={formData.qualification}
              onChange={(e) =>
                setFormData({ ...formData, qualification: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="experience" className="block mb-1">
              Experience (in years)
            </label>
            <input
              id="experience"
              type="number"
              className={commonInputClasses}
              placeholder="5"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-1">
              Subject Expertise
            </label>
            <input
              id="subject"
              type="text"
              className={commonInputClasses}
              placeholder="Mathematics"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="image" className="block mb-1">
              Upload image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5335b6] file:text-white hover:file:bg-blue-600 shadow-md"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
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
