import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import UserTable from '../components/UserTable';
import UserFormModal from '../components/UserFormModal';
import PaginationComponent from '../components/PaginationComponent';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingUser, setEditingUser] = useState(null); // For edit functionality
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false); // Modal for create/edit form

  // Fetch users data
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  // Function to fetch users with pagination
  const fetchUsers = async () => {
    const limit = 10; // Limit the number of users per page
    const response = await fetch(`https://kang-service-yu4p.onrender.com/api/v1/users?page=${currentPage}&limit=${limit}`);
    const result = await response.json();
  
    if (result.isSuccess) {
      setUsers(result.data.users); // Users for the current page
  
      const totalUsers = result.data.totalUsers; // Total users in the database
      setTotalPages(Math.ceil(totalUsers / limit)); // Calculate total pages
    }
  };
  
  

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open the modal for create or edit
  const handleCreateUser = () => {
    setEditingUser(null); // Clear edit mode
    setFormData({ name: "", username: "", role: "", password: "" }); // Reset form
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, username: user.username, role: user.role, password: "" });
    setShowModal(true); // Open modal for editing
  };

  // Handle creating or updating user
  const handleSubmit = async () => {
    const url = editingUser
      ? `https://kang-service-yu4p.onrender.com/api/v1/users/${editingUser.id}`
      : "https://kang-service-yu4p.onrender.com/api/v1/users";
    const method = editingUser ? "PATCH" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      fetchUsers();
      setShowModal(false);
      setFormData({ name: "", username: "", role: "", password: "" });
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    const response = await fetch(
      `https://kang-service-yu4p.onrender.com/api/v1/users/${userId}`,
      { method: "DELETE" }
    );
    if (response.ok) {
      fetchUsers();
    }
  };

  // Pagination controls
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <h2>User Management System</h2>
        <Button variant="primary" className="mb-3" onClick={handleCreateUser}>
          {editingUser ? 'Edit User' : 'Create User'}
        </Button>
        <UserTable users={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} />
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        <UserFormModal
          showModal={showModal}
          setShowModal={setShowModal}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          editingUser={editingUser}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
