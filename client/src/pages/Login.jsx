import { useState } from "react";
import { toast} from "react-toastify"; // Import toast for notifications
import { useAuth } from "../context/appContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { url,isAuthenticate, setAuthenticate } = useAuth();
  // State for phone number and password input fields
  const [data, setData] = useState({
    ph: "",
    password: "",
  });
console.log("checking is isAuthenticate or not",isAuthenticate)
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      //   console.log("After filling the form", data);
      const response = await axios.post(`${url}/api/v1/loginAdmin`, data, {
        withCredentials: true,
      });
      // console.log("After comming response", response);
      if (response.data.message === "Login Successfull") {
        toast.success("Login successfull.............");
        setData({
          ph: "",
          password: "",
        });
        setAuthenticate(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error("Login faild. Please try again");
      }
    }
  };

  return (
    // Main container with flexbox for centering and responsive padding
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-inter">
      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {" "}
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Number Input */}
          <div>
            <label
              htmlFor="ph"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text" // Use text type to allow for various phone number formats
              value={data.ph}
              onChange={(e) => setData({ ...data, ph: e.target.value })}
              placeholder="e.g., 1234567890"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              required // HTML5 built-in validation
              aria-label="Phone Number"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              required // HTML5 built-in validation
              aria-label="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#6A64F1] hover:bg-[#574c8d] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Optional: Add a link for password reset or signup */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Forgot your password?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
