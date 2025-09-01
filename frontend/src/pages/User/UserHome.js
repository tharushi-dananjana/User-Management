import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from "./User";
import Nav from '../../components/Nav/Nav';
import './UserHome.css';
import { GrAdd } from 'react-icons/gr';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then(res => res.data);
};

const UserHome = () => {
  const [users, setUsers] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // search state

  const getUsers = () => {
    fetchHandler().then(data => setUsers(data.users || []));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        setUsers(prev => prev.filter(user => user._id !== id));
        setSuccessMessage('User deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error(err);
        alert('Failed to delete user.');
      }
    }
  };

  // Filter users by search term (case-insensitive)
  const filteredUsers = users.filter(user =>
    (user.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.userPhone?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.userGmail?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Nav />
      <h2 className='mh2'>Users Registration Details</h2>
      {successMessage && <div className="success-popup">{successMessage}</div>}

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table id="users">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, i) => (
            <User
              key={i}
              user={user}
              onUpdate={(user) => {
                setSelectedUser(user);
                setShowUpdatePopup(true);
              }}
              onDelete={(id) => handleDelete(id)}
            />
          ))}
        </tbody>
      </table>

      {/* Add User Button */}
      <div className="float" onClick={() => setShowAddPopup(true)}>
        <GrAdd className="my-float" />
      </div>
      <div className="label-container">
        <div className="label-text">Add User</div>
      </div>

      {/* Add User Popup */}
      {showAddPopup && (
        <AddUser
          onClose={() => setShowAddPopup(false)}
          onUserAdded={() => {
            getUsers();
            setSuccessMessage('User added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
          }}
        />
      )}

      {/* Update User Popup */}
      {showUpdatePopup && selectedUser && (
        <UpdateUser
          user={selectedUser}
          onClose={() => setShowUpdatePopup(false)}
          onUserUpdated={() => {
            getUsers();
            setSuccessMessage('User updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
          }}
        />
      )}
    </div>
  );
};

export default UserHome;
