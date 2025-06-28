import React from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-[#734af6] text-white py-8 ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="flex items-center gap-2">
            <MdPhone className="text-xl" />
            +91 98765 43210
          </p>
          <p className="flex items-center gap-2 mt-1">
            <MdEmail className="text-xl" />
            example@gmail.com
          </p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect with Us</h3>
          <div className="flex gap-6 mt-2">
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>
        </div>

        {/* About / Extra Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-sm leading-relaxed">
            We are committed to providing excellent support and communication. Reach out to us on any platform.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} YourCompanyName. All rights reserved.
      </div>
    </footer>
  );
};

