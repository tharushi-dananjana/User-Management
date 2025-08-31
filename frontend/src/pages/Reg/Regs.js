import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Reg.css';
import '../../components/Nav/Nav'

function UserHome() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    userName: '',
    userPhone: '',
    userGmail: '',
    userPassword: '',
  });

  const [checked, setChecked] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Send input details to database
  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/users", {
        userName: String(inputs.userName),
        userPhone: String(inputs.userPhone),
        userGmail: String(inputs.userGmail),
        userPassword: String(inputs.userPassword),
        UserAgree: String(checked)
      });
      return res.data;
    } catch (err) {
      console.error(err);
      alert("Failed to register. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checked) {
      alert("You must agree to the terms!");
      return;
    }
    console.log(inputs, checked);
    await sendRequest();
    alert("Registered Successfully!");
    navigate('/adduserH'); // navigate to user dashboard or next page
  };

  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <h2>Create Account</h2>
        <p className='subtitle'>Welcome to Our Family! Please enter your details.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={inputs.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userPhone">Phone</label>
            <input
              type="text"
              id="userPhone"
              name="userPhone"
              value={inputs.userPhone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userGmail">Email</label>
            <input
              type="email"
              id="userGmail"
              name="userGmail"
              value={inputs.userGmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              value={inputs.userPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="UserAgree"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor="UserAgree">I agree to the Terms & Conditions</label>
          </div>

          <button type="submit" className="submit-btn">Register</button>

          <p className="login-text">
            Already have an account? <Link to="/loginH">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserHome;
