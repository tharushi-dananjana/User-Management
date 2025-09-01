import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from "./Ausers";
import { Link } from "react-router-dom";
import Nav from '../../components/Nav/Nav';
import './Admin.css';
import { GrAdd } from 'react-icons/gr';

// Recharts imports
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// URLs
const USERS_URL = "http://localhost:5000/users";
const DOCTORS_URL = "http://localhost:5000/doctors";

// Colors for the chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(USERS_URL);
      setUsers(res.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Fetch doctors (for availability chart)
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(DOCTORS_URL);
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDoctors();
  }, []);

  // Availability chart data
  const availabilityData = [
    { name: "Available", value: doctors.filter(doc => doc.available === true).length },
    { name: "Unavailable", value: doctors.filter(doc => doc.available === false).length },
  ];

  return (
    <div>
      <Nav />

      <div>
        <h2 className='mh2'>Users Registration Details</h2>
        <table id="users">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Gmail</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, i) => (
                <User key={i} user={user} />
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Availability Chart */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <div style={{ width: 350, height: 300 }}>
          <h3 style={{ textAlign: "center" }}>Doctor Availability</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={availabilityData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {availabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add User Button */}
      <Link to="/Aadduser" className="float">
        <GrAdd className="my-float" />
      </Link>
      <div className="label-container">
        <div className="label-text">Add User</div>
      </div>
    </div>
  );
};

export default AdminHome;
