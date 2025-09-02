import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Nav from "../../components/Nav/Nav";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// API URLs
const DOCTORS_URL = "http://localhost:5000/doctors";
const USERS_URL = "http://localhost:5000/users";

const COLORS = ["#28a745", "#dc3545"];

const AdminHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(DOCTORS_URL);
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(USERS_URL);
      setUsers(res.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchUsers();
  }, []);

  // Doctor chart data
  const doctorStatusData = [
    { name: "Available", value: doctors.filter((doc) => doc.available === true).length },
    { name: "Unavailable", value: doctors.filter((doc) => doc.available === false).length },
  ];

  // User chart data
  const userStatusData = [
    { name: "Active", value: users.filter((u) => u.isActive === true).length },
    { name: "Inactive", value: users.filter((u) => u.isActive === false).length },
  ];

  const activeUsers = userStatusData[0].value;
  const inactiveUsers = userStatusData[1].value;
  const activeDoctors = doctorStatusData[0].value;
  const inactiveDoctors = doctorStatusData[1].value;

  // ✅ PDF download function for doctors
  const downloadDoctorPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Doctor Details Report", 14, 22);
    doc.setFontSize(12);

    const tableColumn = ["Name", "Phone", "Email", "Specialization", "Experience", "Available"];
    const tableRows = [];

    doctors.forEach((d) => {
      const doctorData = [
        d.doctorName || d.name || "",
        d.phone || "",
        d.doctorEmail || d.email || "",
        d.specialization || "",
        d.experience || "",
        d.available ? "Yes" : "No",
      ];
      tableRows.push(doctorData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
    });

    doc.save("Doctor_Report.pdf");
  };

  return (
    <div>
      <Nav />

      <h1 style={{ textAlign: "center", marginTop: "20px", color: "#333" }}>
        Admin Dashboard
      </h1>

      {/* Download PDF button */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button
          onClick={downloadDoctorPDF}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Download Doctor Report (PDF)
        </button>
      </div>

      {/* Dashboard Cards */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "50px", marginTop: "50px" }}>
        {/* Total Users */}
        <div style={{ flex: "1 1 200px", maxWidth: "260px", background: "#f8f9fa", padding: "15px", borderRadius: "10px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>{users.length}</p>
          <p style={{ color: "#28a745" }}>Active: {activeUsers}</p>
          <p style={{ color: "#dc3545" }}>Inactive: {inactiveUsers}</p>
        </div>

        {/* Total Doctors */}
        <div style={{ flex: "1 1 200px", maxWidth: "260px", background: "#f8f9fa", padding: "15px", borderRadius: "10px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h3>Total Doctors</h3>
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>{doctors.length}</p>
          <p style={{ color: "#28a745" }}>Active: {activeDoctors}</p>
          <p style={{ color: "#dc3545" }}>Inactive: {inactiveDoctors}</p>
        </div>

        {/* Total patient */}
        <div style={{ flex: "1 1 200px", maxWidth: "260px", background: "#f8f9fa", padding: "15px", borderRadius: "10px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h3>Total Patient</h3>
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>{users.length}</p>
          <p style={{ color: "#28a745" }}>Active: {activeUsers}</p>
          <p style={{ color: "#dc3545" }}>Inactive: {inactiveUsers}</p>
        </div>
      </div>

      {/* Pie Charts */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "50px", marginTop: "40px" }}>
        <div style={{ flex: "1 1 280px", maxWidth: "300px", background: "#b6b3b3ff", padding: "15px", borderRadius: "10px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h3>Doctor Status</h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={doctorStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {doctorStatusData.map((entry, index) => (
                    <Cell key={`doc-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ flex: "1 1 280px", maxWidth: "300px", background: "#b6b3b3ff", padding: "15px", borderRadius: "10px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h3>User Status</h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={userStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {userStatusData.map((entry, index) => (
                    <Cell key={`user-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
