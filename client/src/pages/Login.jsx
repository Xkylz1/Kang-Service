import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import apiEndpoints from "../api/config";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const { data } = await axios.post(`${apiEndpoints.login}`, {
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
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-dark p-md-5 p-3 "
      // style={{ height: "100vh", margin: 0 }} // Ensure no margin around the parent
    >
      <div className="row w-100 shadow p-md-5 p-2 rounded bg-secondary-subtle mx-md-5 mx-1 ">
        <div className="col  bg-light rounded-3 m-1 d-none d-md-flex">
          <div className=" align-self-center">
            <div className="d-flex justify-content-center  ">
              <img
                src="images/biji.png"
                style={{ height: "15rem" }}
                alt="owner"
                className=" mt-5"
              />
            </div>
            <div className="p-5 text-center pt-1">
              <h2>Kang Service</h2>
              <p>
                Tempat terpercaya untuk perbaikan smartphone dan komputer Anda.
                Dengan layanan cepat dan profesional, kami siap mengembalikan
                perangkat Anda ke kondisi terbaik.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 p-3 py-5 p-md-5 bg-light rounded-3 m-1">
          <div className="d-flex justify-content-center">
            <img
              style={{ height: "7rem" }}
              src="images/brand-logo.png"
              alt="Brand Logo"
            />
          </div>
          <div className="text-center mt-3">
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
                className="form-control border-0 bg-transparent border-bottom"
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
            <button
              type="submit"
              className="btn btn-dark w-100 rounded-pill mt-3"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {loading && (
              <div className="text-center mt-2">Logging in, please wait...</div>
            )}
          </form>

          {/* Register button to navigate to the register page */}
          <div className="text-center mt-3">
            <p className="fs-6 fw-light mb-1">Don't have an account?</p>
            <button
              className="btn btn-outline-dark px-5 rounded-pill"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
