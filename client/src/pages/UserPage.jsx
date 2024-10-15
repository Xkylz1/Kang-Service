import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LandingContent from '../components/LandingContent';
import ServiceRequestModal from '../components/ServiceRequestModal';
import apiEndpoints from '../api/config';

const HomePage = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    });

    if (result.isConfirmed) {
      setUser(null); // Clear user data
      localStorage.removeItem('user'); // Remove user from localStorage
      navigate('/'); // Redirect to login page
      Swal.fire('Logged out', 'You have been logged out successfully.', 'success');
    }
  };

  const { openModal } = ServiceRequestModal({ user, setLoading });

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <LandingContent openModal={openModal} />
    </div>
  );
};

export default HomePage;
