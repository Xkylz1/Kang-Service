import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import apiEndpoints from '../api/config';

const ServicePage = ({ user }) => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get(`${apiEndpoints.serviceRequest}?userId=${user.id}`);
        setServiceRequests(response.data); // Assuming the response contains the service requests
      } catch (error) {
        console.error('Error fetching service requests:', error);
        Swal.fire('Error', 'Failed to load service requests. Please try again later.', 'error');
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
                <td>{request.description.substring(0, 50)}...</td> {/* Shortened description */}
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServicePage;
