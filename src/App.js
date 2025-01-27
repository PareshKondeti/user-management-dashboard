import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const MOCKAPI_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch users from the API
  useEffect(() => {
    axios
      .get(MOCKAPI_URL)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Adding a new user
  const handleAddUser = (newUser) => {
    axios
      .post(MOCKAPI_URL, newUser)
      .then((response) => {
        // Updating the local state
        setUsers((prevUsers) => [...prevUsers, { ...newUser, id: response.data.id }]);
      })
      .catch((error) => console.error('Error adding user:', error));
    setIsFormVisible(false);
  };

  // Edit an existing user
  const handleUpdateUser = (updatedUser) => {
    axios
      .put(`${MOCKAPI_URL}/${updatedUser.id}`, updatedUser)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === updatedUser.id ? response.data : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => console.error('Error updating user:', error));
    setEditingUser(null);
    setIsFormVisible(false);
  };

  // Deleting a user
  const handleDeleteUser = (id) => {
    axios
      .delete(`${MOCKAPI_URL}/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <div className="app-container">
      <h1 className="title">User Management Dashboard</h1>
      {!isFormVisible && (
        <>
          <button className="add-btn" onClick={() => setIsFormVisible(true)}>
            Add User
          </button>
          <UserList
            users={users}
            onEdit={(user) => {
              setEditingUser(user);
              setIsFormVisible(true);
            }}
            onDelete={handleDeleteUser}
          />
        </>
      )}
      {isFormVisible && (
        <UserForm
          initialData={editingUser}
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          onCancel={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default App;
