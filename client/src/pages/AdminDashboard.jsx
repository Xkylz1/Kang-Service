import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingUser, setEditingUser] = useState(null); // For edit functionality
  const [formData, setFormData] = useState({ name: '', email: '', role: '', password: '' }); // Include password field

  // Fetch users data
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  // Function to fetch users with pagination
  const fetchUsers = async () => {
    const response = await fetch(`https://kang-service-yu4p.onrender.com/api/v1/users?page=${currentPage}&limit=10`);
    const result = await response.json();
    if (result.isSuccess) {
      setUsers(result.data.users); // Access nested 'data.users'
      // Assuming the API doesn't return total pages directly
      setTotalPages(5); // Assuming 5 pages for now, adjust as per the real response
    }
  };

  // Handle form change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create a new user
  const handleCreateUser = async () => {
    const response = await fetch('https://kang-service-yu4p.onrender.com/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      fetchUsers(); // Refresh the list after creating a user
      setFormData({ name: '', email: '', role: '', password: '' }); // Reset form
    }
  };

  // Update an existing user
  const handleUpdateUser = async () => {
    const response = await fetch(`https://kang-service-yu4p.onrender.com/api/v1/users/${editingUser.id}`, {
      method: 'PATCH', // Changed from PUT to PATCH
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  
    if (response.ok) {
      fetchUsers(); // Refresh the user list after update
      setEditingUser(null); // Exit edit mode
      setFormData({ name: '', email: '', role: '', password: '' }); // Reset form
    } else {
      console.error("Failed to update the user");
    }
  };
  

  // Delete a user
  const handleDeleteUser = async (userId) => {
    const response = await fetch(`https://kang-service-yu4p.onrender.com/api/v1/users/${userId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchUsers(); // Refresh the list after deletion
    }
  };

  // Handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Prepare form for edit
  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.username, role: user.role, password: '' }); // Password left blank on edit for security
  };

  return (
    <div className="container">
      <h2>User Management System</h2>

      {/* Create / Edit Form */}
      <div>
        <h3>{editingUser ? 'Edit User' : 'Create User'}</h3>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Username"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={editingUser ? handleUpdateUser : handleCreateUser}
          >
            {editingUser ? 'Update' : 'Create'}
          </button>
        </form>
      </div>

      {/* User List */}
      <div>
        <h3>User List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
