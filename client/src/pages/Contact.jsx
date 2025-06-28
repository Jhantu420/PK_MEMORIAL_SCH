import React from "react";
import EarthScene from "../canvas/EarthScene";

function Contact() {
  return (
    <div className="min-h-screen relative">
      {/* Grid Layout for Earth and Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 px-4 sm:px-6 lg:px-10 py-8">
        
        {/* Earth Scene */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[90vh] lg:h-[100vh] bg-black rounded-2xl overflow-hidden">
          <EarthScene />
        </div>

        {/* Contact Form Overlay */}
        <div className="relative flex items-center justify-center p-4 sm:p-10">
          <div className="bg-[#734af6] backdrop-blur-md rounded-xl shadow-lg w-full max-w-lg p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Get in Touch</h2>

            <form action="https://formbold.com/s/FORM_ID" method="POST" className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your full name"
                  className="w-full bg-white/10 placeholder-white text-white border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#6A64F1] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-white/10 placeholder-white text-white border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#6A64F1] focus:outline-none"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  placeholder="Subject"
                  className="w-full bg-white/10 placeholder-white text-white border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#6A64F1] focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  required
                  placeholder="Type your message..."
                  className="w-full bg-white/10 placeholder-white text-white border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#6A64F1] focus:outline-none"
                />
              </div>

              {/* Submit Button */}
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
