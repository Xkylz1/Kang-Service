import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert

const Sidebar = ({ onLogout }) => {
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
      // Call the onLogout function to perform logout
      onLogout();
    }
  };

  return (
    <Nav className="d-flex flex-column bg-dark p-3 col-2">
      <div>
        <h5 className='text-light mb-3 mt-3'>Admin Dashboard</h5>
        <hr className='text-light' /> {/* Horizontal line */}
        <Nav.Link className='px-0 text-light fs-6 fw-light' href="#dashboard">Technician Assignment</Nav.Link>
        <Nav.Link className='px-0 text-light fs-6 fw-light' href="#account-management">Account Management</Nav.Link>
        <Nav.Link className='px-0 text-light fs-6 fw-light' href="#help-center">Help Center</Nav.Link>
      </div>
      <Button variant="outline-danger" className="mt-4" onClick={handleLogout}>
        Logout
      </Button>
    </Nav>
  );
};

export default Sidebar;
