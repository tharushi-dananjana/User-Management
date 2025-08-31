import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [userGmail, setUserGmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/loginH', {
        username: userGmail,
        password: userPassword
      });

      if (response.status === 200) {
        alert('Login Successful!');
        window.location.href = '/maiHome';
      } else {
        alert('Invalid Email or Password. Try Again!');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-page">
      {/* Left Side Welcome Text */}
      <div className="left-side">
        <h1>Welcome to <br /> Ayu Mantra</h1>
      </div>

      {/* Right Side Form */}
      <div className="right-side">
        <div className='form-container'>
          <div className='ful'>
            <div className="row">
              <div className="column">
                <h2 className='r-h1'>Login</h2><br />
                <h4 className='r-subheading'>
                  Welcome to Our Family! Please enter your details.
                </h4>
                <br /><br /><br />
                <form onSubmit={handleSubmit}>
                  <label className="fmhd" htmlFor="userGmail">Email:</label><br />
                  <input
                    className='input'
                    type="email"
                    id="userGmail"
                    value={userGmail}
                    onChange={(e) => setUserGmail(e.target.value)}
                    required
                  /><br /><br />

                  <label className="fmhd" htmlFor="userPassword">Password:</label><br />
                  <input
                    className='input'
                    type="password"
                    id="userPassword"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                  /><br /><br />
                  <div className='rgbtn'>
                    <button type="submit" className='regbtn'>Login</button>
                  </div>
                </form>
                <br />
                {errorMessage && <p className="error">{errorMessage}</p>}
                <p>
                  Don't have an account? <Link to="/reg">Register</Link> now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
