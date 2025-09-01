// UpdateUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddUser.css'; // reuse the AddUser popup CSS

const UpdateUser = ({ user, onClose, onUserUpdated }) => {
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs(user); // initialize form with user data
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = () => {
    setInputs((prev) => ({ ...prev, UserAgree: !prev.UserAgree }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${user._id}`, {
        userName: String(inputs.userName),
        userPhone: String(inputs.userPhone),
        userGmail: String(inputs.userGmail),
        userPassword: String(inputs.userPassword),
        UserAgree: Boolean(inputs.UserAgree),
      });
      onUserUpdated(); // refresh user list & show success
      onClose(); // close popup
    } catch (err) {
      console.error(err);
      alert('Failed to update user.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Update User</h3>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="userName"
            value={inputs.userName || ''}
            onChange={handleChange}
            required
          />

          <label>Phone:</label>
          <input
            type="text"
            name="userPhone"
            value={inputs.userPhone || ''}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="userGmail"
            value={inputs.userGmail || ''}
            onChange={handleChange}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="userPassword"
            value={inputs.userPassword || ''}
            onChange={handleChange}
            required
          />

          <label>
            Agree to Terms:
            <input
              type="checkbox"
              name="UserAgree"
              checked={inputs.UserAgree || false}
              onChange={handleCheckbox}
              style={{ marginLeft: '5px' }}
            />
          </label>
          <br /><br />

          <button type="submit">Update User</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
