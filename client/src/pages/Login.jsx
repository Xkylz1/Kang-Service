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
      const { data } = await axios.post(
        "https://kang-service-yu4p.onrender.com/api/login",
        {
          username,
          password,
        }
      );

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
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="row w-100 shadow p-5 rounded mx-5 bg-secondary-subtle">
        <div className="col"></div>
        <div className="col-md-4 p-5 bg-light rounded-3">
          <div className="text-center">
            <h3>Welcome Back!</h3>
            <p>Please enter your details</p>
          </div>

          <form onSubmit={handleLogin} className="mt-5">
            <div className="mb-3">
              <label htmlFor="username" className="form-label d-none">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="form-control border-0 bg-transparent border-bottom" // Remove borders and set transparent background
                style={{ borderBottom: "2px solid #007bff" }} // Bootstrap primary color for underline
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label d-none">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control form-control border-0 bg-transparent border-bottom"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100 rounded-pill mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
