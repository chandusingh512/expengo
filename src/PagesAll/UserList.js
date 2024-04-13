import React from 'react';
import UserTable from './UserTable';

const users = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    country: 'USA'
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 25,
    address: '456 Elm St',
    city: 'Othertown',
    state: 'NY',
    country: 'USA'
  },
 
  
  // Add more users as needed
];

const UserList = () => {
  return (
    <div className="user-list">
      <h1>User List</h1>
      <UserTable users={users} />
    </div>
  );
};

export default UserList;