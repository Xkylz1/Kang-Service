import React from 'react';

const LandingContent = ({ openModal }) => {
  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to Kang Service</h1>
      <p>Your trusted service for electronic repairs.</p>
      <button className="btn btn-primary" onClick={openModal}>
        Submit Service Request
      </button>
    </div>
  );
};

export default LandingContent;
