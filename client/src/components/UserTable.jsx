import React from 'react';
import { Table, Button } from 'react-bootstrap';

const UserTable = ({ users, handleEditUser, handleDeleteUser }) => (
  <Table striped bordered hover>
    <thead className="table-dark">
    <tr>
      <th className="ps-4">Name</th>
      <th className="ps-4">Username</th>
      <th className="ps-4">Role</th>
      <th className="ps-4">Created At</th>
      <th className="ps-4">Actions</th>
    </tr>
  </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td className="ps-4">{user.name}</td> {/* Add padding to data cells */}
          <td className="ps-4">{user.username}</td>
          <td className="ps-4">{user.role}</td>
          <td className="ps-4">{new Date(user.createdAt).toLocaleString()}</td>
          <td className="text-center"> {/* Keep buttons centered */}
            <Button variant="outline-dark" size="sm" onClick={() => handleEditUser(user)}>Edit</Button>
            <Button variant="dark" size="sm" className="ms-2" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default UserTable;
