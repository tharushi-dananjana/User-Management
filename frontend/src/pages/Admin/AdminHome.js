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
import Nav from "../../components/Nav/Comnav/Nav";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import AdminProfile from "./AdminProfile";

// API URLs
const DOCTORS_URL = "http://localhost:5000/doctors";
const USERS_URL = "http://localhost:5000/users";

const COLORS = ["#28a745", "#dc3545"];

const AdminHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(DOCTORS_URL);
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

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

  const doctorStatusData = [
    { name: "Available", value: doctors.filter((doc) => doc.available).length },
    { name: "Unavailable", value: doctors.filter((doc) => !doc.available).length },
  ];

  const userStatusData = [
    { name: "Active", value: users.filter((u) => u.isActive).length },
    { name: "Inactive", value: users.filter((u) => !u.isActive).length },
  ];

  const activeUsers = userStatusData[0].value;
  const inactiveUsers = userStatusData[1].value;
  const activeDoctors = doctorStatusData[0].value;
  const inactiveDoctors = doctorStatusData[1].value;

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
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="px-6 py-6" style={{ marginLeft: "245px" }}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={downloadDoctorPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Download Doctor Report (PDF)
          </button>
          <button
            onClick={() => setShowProfile(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            View Profile
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-green-600">Active: {activeUsers}</p>
            <p className="text-red-600">Inactive: {inactiveUsers}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total Doctors</h3>
            <p className="text-2xl font-bold">{doctors.length}</p>
            <p className="text-green-600">Active: {activeDoctors}</p>
            <p className="text-red-600">Inactive: {inactiveDoctors}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total Patients</h3>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-green-600">Active: {activeUsers}</p>
            <p className="text-red-600">Inactive: {inactiveUsers}</p>
          </div>
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Doctor Status</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={doctorStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {doctorStatusData.map((entry, index) => (
                      <Cell
                        key={`doc-cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">User Status</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={userStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {userStatusData.map((entry, index) => (
                      <Cell
                        key={`user-cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Profile Modal */}
        {showProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 font-bold text-xl"
                onClick={() => setShowProfile(false)}
              >
                ×
              </button>
              <AdminProfile />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
