import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import apiEndpoints from '../api/config';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const ServiceRequestModal = ({ user, setLoading }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation to get the current route

  const handleSubmit = async (deviceModel, issueDescription) => {
    // Check if the fields are filled
    if (!deviceModel || !issueDescription) {
      Swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    }

    setLoading(true);

    const serviceRequestData = {
      deviceModel,
      description: issueDescription,
      status: 'In Queue',
      userId: user.id,
      technicianId: null,
    };

    try {
      const response = await axios.post(apiEndpoints.serviceRequest, serviceRequestData);
      console.log('Service request submitted:', response.data);
      Swal.fire('Success', 'Service request submitted successfully!', 'success');
    } catch (err) {
      console.error('Error submitting service request:', err);
      Swal.fire('Error', 'Failed to submit service request. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    Swal.fire({
      title: 'Submit Service Request',
      html: `
        <input type="text" id="deviceModel" class="swal2-input" placeholder="Device Model" />
        <textarea id="issueDescription" class="swal2-textarea" placeholder="Issue Description"></textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const deviceModelInput = Swal.getPopup().querySelector('#deviceModel').value;
        const issueDescriptionInput = Swal.getPopup().querySelector('#issueDescription').value;

        return { deviceModelInput, issueDescriptionInput };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { deviceModelInput, issueDescriptionInput } = result.value;
        handleSubmit(deviceModelInput, issueDescriptionInput);

        // If the current route is already '/service', refresh the page
        if (location.pathname === '/service') {
          window.location.reload();
        } else {
          navigate('/service'); // Navigate to '/service' if not already there
        }
      }
    });
  };

  return { openModal };
};

export default ServiceRequestModal;
