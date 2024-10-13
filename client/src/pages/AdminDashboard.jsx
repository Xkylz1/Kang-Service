import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Modal, Button, Table, Form, Pagination, Nav } from "react-bootstrap"; // Import react-bootstrap components

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingUser, setEditingUser] = useState(null); // For edit functionality
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    setFormData({ name: "", email: "", role: "", password: "" }); // Reset form
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.username, role: user.role, password: "" });
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
      setFormData({ name: "", email: "", role: "", password: "" });
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
      {/* Sidebar */}
      <Nav className="flex-column bg-light p-3" style={{ width: "250px", height: "100vh" }}>
        <h5>Admin Dashboard</h5>
        <Nav.Link href="#dashboard">Technician Assignment</Nav.Link>
        <Nav.Link href="#account-management">Account Management</Nav.Link>
        <Nav.Link href="#help-center">Help Center</Nav.Link>
        <Button variant="outline-danger" className="mt-4">Logout</Button>
      </Nav>

      {/* Main Content */}
      <div className="container-fluid p-4">
        <h2>User Management System</h2>

        <Button variant="primary" className="mb-3" onClick={handleCreateUser}>
          {editingUser ? "Edit User" : "Create User"}
        </Button>

        {/* Users Table */}
        <Table striped bordered hover>
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
                  <Button variant="warning" onClick={() => handleEditUser(user)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>

        {/* Modal for Create/Edit User */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingUser ? "Edit User" : "Create User"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter role"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {editingUser ? "Update User" : "Create User"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdminDashboard;
