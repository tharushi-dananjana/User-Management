// AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';

const AddUser = ({ onClose, onUserAdded }) => {
  const [inputs, setInputs] = useState({
    userName: '',
    userPhone: '',
    userGmail: '',
    userPassword: '',
    UserAgree: false,
  });

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
      await axios.post('http://localhost:5000/users', {
        userName: String(inputs.userName),
        userPhone: String(inputs.userPhone),
        userGmail: String(inputs.userGmail),
        userPassword: String(inputs.userPassword),
        UserAgree: Boolean(inputs.UserAgree),
      });

      // Reset inputs
      setInputs({
        userName: '',
        userPhone: '',
        userGmail: '',
        userPassword: '',
        UserAgree: false,
      });

      onUserAdded(); // refresh user list and show success
      onClose(); // close popup
    } catch (err) {
      console.error(err);
      alert('Failed to add user.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Add User</h3>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="userName"
            value={inputs.userName}
            onChange={handleChange}
            required
          />

          <label>Phone:</label>
          <input
            type="text"
            name="userPhone"
            value={inputs.userPhone}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="userGmail"
            value={inputs.userGmail}
            onChange={handleChange}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="userPassword"
            value={inputs.userPassword}
            onChange={handleChange}
            required
          />

          <label>
            Agree to Terms:
            <input
              type="checkbox"
              name="UserAgree"
              checked={inputs.UserAgree}
              onChange={handleCheckbox}
              style={{ marginLeft: '5px' }}
            />
          </label>
          <br /><br />

          <button type="submit">Register User</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
