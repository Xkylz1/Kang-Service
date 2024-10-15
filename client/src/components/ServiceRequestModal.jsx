import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import apiEndpoints from '../api/config';

const ServiceRequestModal = ({ user, setLoading }) => {
  const [deviceModel, setDeviceModel] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = async () => {
    // Check if the fields are filled
    if (!deviceModel || !issueDescription) {
      Swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    }

    setLoading(true);

    const serviceRequestData = {
      deviceModel,
      description: issueDescription,
      status: 'pending',
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
      // Clear inputs after submission
      setDeviceModel('');
      setIssueDescription('');
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

        // Update local state before submitting
        setDeviceModel(deviceModelInput);
        setIssueDescription(issueDescriptionInput);
        return { deviceModelInput, issueDescriptionInput };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
      }
    });
  };

  return { openModal };
};

export default ServiceRequestModal;
