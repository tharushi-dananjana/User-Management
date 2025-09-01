import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [userGmail, setUserGmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // ✅ create navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/loginH', {
        username: userGmail,
        password: userPassword
      });

      // Assuming your backend sends role or userType in the response
      // e.g., response.data.role === 'admin' or 'doctor'
      if (response.status === 200) {
        alert('Login Successful!');
        const role = response.data.role; // check the role from response

        if (role === 'admin') {
          navigate('/adminHome'); // navigate to admin page
        } else if (role === 'doctor') {
          navigate('/doctorHome'); // navigate to doctor page
        } else {
          setErrorMessage('Unknown role. Cannot navigate.');
        }

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
      <div className="left-side">
        <h1>Welcome to <br /> Ayu Mantra</h1>
      </div>

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
