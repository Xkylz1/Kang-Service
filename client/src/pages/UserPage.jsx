// src/pages/UserPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage = ({ user }) => { // Accept user as a prop
  const [deviceModel, setDeviceModel] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);
    setError('');

    const serviceRequestData = {
      deviceModel,
      description: issueDescription, // Rename to match API structure
      status: 'pending', // Set initial status, assuming it's pending
      userId: user.id, // Assuming the user object has an id
      technicianId: null, // Default value; adjust based on your logic
    };

    try {
      const response = await axios.post('https://kang-service-yu4p.onrender.com/api/v1/serviceRequests', serviceRequestData);
      console.log('Service request submitted:', response.data);
      // Optionally navigate or display a success message
      navigate('/'); // Redirect to another page on success
    } catch (err) {
      console.error('Error submitting service request:', err);
      setError('Failed to submit service request. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="deviceModel" className="form-label">Device Model</label>
          <input
            type="text"
            id="deviceModel"
            className="form-control"
            value={deviceModel}
            onChange={(e) => setDeviceModel(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="issueDescription" className="form-label">Issue Description</label>
          <textarea
            id="issueDescription"
            className="form-control"
            rows="4"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default UserPage;
