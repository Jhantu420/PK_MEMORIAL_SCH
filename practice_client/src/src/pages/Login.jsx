import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AppContext";
function Login() {
  const navigate = useNavigate();
  const {setAuthenticate} = useAuth();
  const [data, setData] = useState({
    ph: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:3000/api/v1/loginAdmin`,
        data,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        alert(result.data.message);
        setAuthenticate(true)
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your phone"
          value={data.ph}
          onChange={(e) => setData({ ...data, ph: e.target.value })}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="enter your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />
        <br />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
