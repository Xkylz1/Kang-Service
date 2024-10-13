import React from 'react';
import { Table, Button } from 'react-bootstrap';

const UserTable = ({ users, handleEditUser, handleDeleteUser }) => (
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
            <Button variant="warning" onClick={() => handleEditUser(user)}>Edit</Button>
            <Button variant="danger" className="ms-2" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default UserTable;
