import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/appContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { url, setAuthenticate, checkAuth, fetchNotification, fetchStudents } =
    useAuth();

  const [data, setData] = useState({
    ph: "9681693120",
    password: "password",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/v1/loginAdmin`, data, {
        withCredentials: true,
      });
      // console.log("After comming response", response.data);
      if (response.data.message === "Login Successfull") {
        toast.success("Login successfull.............");
        setData({
          ph: "",
          password: "",
        });
        setAuthenticate(true);
        await checkAuth();
        await fetchNotification();
        fetchStudents();
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {" "}
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="ph"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              value={data.ph}
              onChange={(e) => setData({ ...data, ph: e.target.value })}
              placeholder="e.g., 1234567890"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              required
              aria-label="Phone Number"
            />
          </div>

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
              required
              aria-label="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6A64F1] hover:bg-[#574c8d] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Login
          </button>
        </form>

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
