import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UserFormModal = ({ showModal, setShowModal, formData, handleInputChange, handleSubmit, editingUser }) => (
  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>{editingUser ? 'Edit User' : 'Create User'}</Modal.Title>
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
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="role">
  <Form.Label>Role</Form.Label>
  <Form.Control
    as="select"
    name="role"
    value={formData.role}
    onChange={handleInputChange}
  >
    <option value="">Select role</option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
    <option value="technician">Technician</option>
  </Form.Control>
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
        {editingUser ? 'Update User' : 'Create User'}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default UserFormModal;
