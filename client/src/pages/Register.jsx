import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import apiEndpoints from "../api/config";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await axios.post(`${apiEndpoints.register}`, {
        name,
        username,
        password,
        role: "user", // Default role is user
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
      }).then(() => {
        // After successful registration, navigate to the login page
        navigate("/");

        // Optionally, reset the form
        setName("");
        setUsername("");
        setPassword("");
      });
    } catch (error) {
      // Check for duplicate username error
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Username already exists"
      ) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Username is already taken. Please choose another.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.response?.data?.message || "Something went wrong!",
        });
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-dark p-5"
      style={{ height: "100vh", margin: 0 }} // Full page height and no margin
    >
      <div className="row w-100 shadow p-5 rounded bg-secondary-subtle mx-5">
        <div className="col-lg-4 col-md-6 p-5 bg-light rounded-3 mx-auto">
          {/* Centered column */}
          <div className="text-center">
            <h3>Register</h3>
            <p>Create your account</p>
          </div>
          <form onSubmit={handleRegister} className="mt-5">
            <div className="mb-3">
              <label htmlFor="name" className="form-label d-none">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control border-0 bg-transparent border-bottom"
                style={{ borderBottom: "2px solid #007bff" }} // Bootstrap primary color for underline
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
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
              {loading ? "Registering..." : "Register"}
            </button>
            {loading && (
              <div className="text-center mt-2">
                Registering, please wait...
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
