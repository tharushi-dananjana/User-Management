// AaddUser.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import './Admin.css'; // optional: add your CSS for styling

function AaddUser() {
  const navigate = useNavigate();

  // State for form inputs
  const [inputs, setInputs] = useState({
    userName: '',
    userPhone: '',
    userGmail: '',
    userPassword: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Send user details to backend
  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users", {
        userName: String(inputs.userName),
        userPhone: String(inputs.userPhone),
        userGmail: String(inputs.userGmail),
        userPassword: String(inputs.userPassword),
        UserAgree: "false", // static false for now
      });
      return response.data;
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => alert("User added successfully!"))
      .then(() => navigate('/adminHome'));
  };

  return (
    <div>
      <Nav />
      <h2 className='Uh2'>User Registration Form</h2>
      <div className='container'>
        <form className='Ufom' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="userName">Name:</label>
            <input
              className='input'
              type="text"
              id="userName"
              name="userName"
              value={inputs.userName}
              required
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor="userPhone">Phone:</label>
            <input
              className='input'
              type="text"
              id="userPhone"
              name="userPhone"
              value={inputs.userPhone}
              required
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor="userGmail">Email:</label>
            <input
              className='input'
              type="email"
              id="userGmail"
              name="userGmail"
              value={inputs.userGmail}
              required
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor="userPassword">Password:</label>
            <input
              className='input'
              type="password"
              id="userPassword"
              name="userPassword"
              value={inputs.userPassword}
              required
              onChange={handleChange}
            />
          </div>

          <div className='btnn'>
            <button type="submit" className='btnsub'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AaddUser;
