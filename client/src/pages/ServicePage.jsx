import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import apiEndpoints from "../api/config";

const ServicePage = ({ user,setUser }) => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    });

    if (result.isConfirmed) {
      setUser(null); // Clear user data
      localStorage.removeItem("user"); // Remove user from localStorage
      navigate("/"); // Redirect to login page
      Swal.fire(
        "Logged out",
        "You have been logged out successfully.",
        "success"
      );
    }
  };

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get(
          `${apiEndpoints.serviceRequest}/user/${user.id}` // Fetching by userId
        );
        setServiceRequests(response.data); // Set the fetched service requests in state
      } catch (error) {
        console.error("Error fetching service requests:", error);
        Swal.fire(
          "Error",
          "Failed to load service requests. Please try again later.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchServiceRequests();
  }, [user.id]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar handleLogout={handleLogout} />

      <div className="container mt-5">
        <h1>Your Submitted Service Requests</h1>
        {serviceRequests.length === 0 ? (
          <p>No service requests submitted yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Device Model</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.deviceModel}</td>
                  <td>{request.description}</td>
                  {/* Shortened description */}
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
