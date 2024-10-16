import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import apiEndpoints from "../api/config";

const ServicePage = ({ user, setUser }) => {
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
          `${apiEndpoints.serviceRequest}` // Fetching by userId
        );
        setServiceRequests(response.data); // Set the fetched service requests in state
      } catch (error) {
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

  const handleStatusChange = async (requestId, newStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        // Send API request to update the status
        await axios.put(`${apiEndpoints.serviceRequest}/${requestId}`, {
          status: newStatus,
        });

        // Update the local state with the new status
        setServiceRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, status: newStatus } : request
          )
        );

        Swal.fire("Updated!", "The status has been updated.", "success");
      } catch (error) {
        Swal.fire(
          "Error",
          "Failed to update the status. Please try again later.",
          "error"
        );
      }
    }
  };

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
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.deviceModel}</td>
                  <td>{request.description}</td>
                  {/* <td>{request.status}</td> */}
                  <td>
                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(request.id, e.target.value)
                      }
                      className="form-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
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
