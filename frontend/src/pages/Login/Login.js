// pages/Login/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [userGmail, setUserGmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/loginH", {
        email: userGmail,   // ✅ match backend field for email
        password: userPassword
      });

      if (response.status === 200) {
        const { role, token } = response.data;

        // ✅ Store token if you want to protect routes
        localStorage.setItem("authToken", token);

        if (role === "admin") {
          alert("Admin Login Successful!");
          navigate("/adminHome"); // ✅ Go to Admin Dashboard
        } else {
          setErrorMessage("Only admins can log in here.");
        }
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <h1>Welcome to <br /> Ayu Mantra</h1>
      </div>

      <div className="right-side">
        <div className='form-container'>
          <div className='ful'>
            <div className="row">
              <div className="column">
                <h2 className='r-h1'>Admin Login</h2><br />
                <h4 className='r-subheading'>
                  Please log in with your admin credentials.
                </h4>
                <br /><br /><br />
                <form onSubmit={handleSubmit}>
                  <label className="fmhd" htmlFor="userGmail">Admin Email:</label><br />
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
                  Don&apos;t have an account? <Link to="/reg">Register</Link> now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
