import React from 'react';
import './UserTable.css';


const UserTable = ({ users }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>City</th>
          <th>State/Country</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.address}</td>
            <td>{user.city}</td>
            <td>{`${user.state}, ${user.country}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;