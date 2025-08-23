import React from "react";
import EarthScene from "../canvas/EarthScene";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "../context/appContext";
function Contact() {
  const { url, fetchNotification } = useAuth();
  const [data, setData] = useState({
    name: "",
    ph: "",
    msg: "",
  });
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${url}/api/v1/get-in-touch`, data, {
        withCredentials: true,
      });

      setData({
        name: "",
        ph: "",
        msg: "",
      });
      if (result) {
        toast.success(result.data.message);
        fetchNotification();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in form submition");
    }
  };
  return (
    <div className=" relative">
      {/* Grid Layout for Earth and Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10   ">
        {/* Earth Scene */}
      <div className="relative h-[250px] sm:h-[400px] lg:h-full bg-black overflow-hidden rounded-b-2xl">
  <EarthScene />
</div>

        {/* Contact Form Overlay */}
        <div className="relative flex items-center justify-center p-4 sm:p-10">
          <div className="backdrop-blur-md rounded-xl shadow-2xl w-xl p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              Get in Touch
            </h2>

            <form onSubmit={handleContactSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#6A64F1] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Phone No
                </label>
                <input
                  type="number"
                  name="ph"
                  value={data.ph}
                  onChange={(e) => setData({ ...data, ph: e.target.value })}
                  required
                  placeholder="Your phone no"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#6A64F1] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={data.msg}
                  onChange={(e) => setData({ ...data, msg: e.target.value })}
                  rows="4"
                  required
                  placeholder="Type your message..."
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#6A64F1] focus:outline-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#5927fb] text-white font-semibold py-3 rounded-md hover:bg-[#9a81ed] transition cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
