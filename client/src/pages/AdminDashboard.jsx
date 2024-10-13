import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert
import Sidebar from '../components/Sidebar';
import UserTable from '../components/UserTable';
import UserFormModal from '../components/UserFormModal';
import PaginationComponent from '../components/PaginationComponent';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Fetch users data
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    const limit = 10;
    const response = await fetch(`https://kang-service-yu4p.onrender.com/api/v1/users?page=${currentPage}&limit=${limit}`);
    const result = await response.json();
  
    if (result.isSuccess) {
      setUsers(result.data.users);
      const totalUsers = result.data.totalUsers;
      setTotalPages(Math.ceil(totalUsers / limit));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({ name: "", username: "", role: "", password: "" });
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, username: user.username, role: user.role, password: "" });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    const confirmationText = editingUser
      ? "You are about to update this user's information."
      : "You are about to create a new user.";

    // Show the confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: confirmationText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: editingUser ? 'Yes, update it!' : 'Yes, create it!',
    });

    // If the user confirmed, proceed with the submit action
    if (result.isConfirmed) {
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
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmationResult = await Swal.fire({
      title: 'Are you sure?',
      text: "You are about to delete this user.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmationResult.isConfirmed) {
      const response = await fetch(`https://kang-service-yu4p.onrender.com/api/v1/users/${userId}`, { method: "DELETE" });
      if (response.ok) {
        fetchUsers();
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <h2>User Management System</h2>
        <Button variant="dark" className="mb-3" onClick={handleCreateUser}>
          {'Create User'}
        </Button>
        <UserTable users={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} />
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        <UserFormModal
          showModal={showModal}
          setShowModal={setShowModal}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}  // Pass the handleSubmit function
          editingUser={editingUser}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
