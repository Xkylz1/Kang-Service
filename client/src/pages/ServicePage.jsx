import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import apiEndpoints from "../api/config";
import ServiceRequestModal from "../components/ServiceRequestModal"; // Assuming you have this component

const ServicePage = ({ user, setUser }) => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { openModal } = ServiceRequestModal({ user, setLoading });

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
      Swal.fire("Logged out", "You have been logged out successfully.", "success");
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
        // console.error("Error fetching service requests:", error);
        // Swal.fire(
        //   "Error",
        //   "Failed to load service requests. Please try again later.",
        //   "error"
        // );
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
        
        {/* Button to submit a new service request */}
        <button className="btn btn-primary mb-3" onClick={openModal} >
          Tambahkan Service Request
        </button>

        {serviceRequests.length === 0 ? (
          <p>No service requests submitted yet.</p>
        ) : (
          <div className="row">
            {serviceRequests.map((request) => (
              <div key={request.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body" style={{ minHeight: '150px' }}>
                    <h5 className="card-title">{request.deviceModel}</h5>
                    <p className="card-text">{request.description}</p>
                    <p className="card-text"><strong>Status:</strong> {request.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;