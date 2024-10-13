import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://kang-service-yu4p.onrender.com", {
        username,
        password,
      });

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update the user state in the parent (App) component
      setUser(data.user);

      // Show success message and navigate based on the role
      Swal.fire({
        icon: "success",
        title: "Login Successful",
      }).then(() => {
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Login</h2>
    <form onSubmit={handleLogin} className="shadow p-4 rounded">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username:</label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  </div>
  
  );
}

export default Login;
