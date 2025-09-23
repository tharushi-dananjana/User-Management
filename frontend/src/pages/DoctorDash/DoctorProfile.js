import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Nav/DocNav/DNav";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    doctorName: "",
    doctorPhone: "",
    doctorEmail: "",
    doctorPassword: "",
    specialization: "",
    experienceYears: 0,
    available: true,
  });

  const navigate = useNavigate();
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!doctorId) {
          alert("No doctor is logged in!");
          setLoading(false);
          return;
        }
        const response = await axios.get(`http://localhost:5000/doctors/${doctorId}`);
        const data = response.data.doctor;
        setDoctor(data);
        setForm({
          doctorName: data.doctorName,
          doctorPhone: data.doctorPhone,
          doctorEmail: data.doctorEmail,
          doctorPassword: data.doctorPassword,
          specialization: data.specialization,
          experienceYears: data.experienceYears,
          available: data.available,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch doctor profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/doctors/${doctorId}`, form);
      setDoctor(res.data.doctor);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading doctor profile...</p>;
  if (!doctor) return <p className="text-center mt-10 text-red-600">No doctor found.</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10" style={{ marginLeft: "245px", maxWidth: '600px' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Doctor Profile</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/doctor/appointments")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition duration-200"
            >
              My Appointments
            </button>
            <FaBell className="text-gray-600 hover:text-gray-800 text-2xl cursor-pointer" title="Notifications" />
          </div>
        </div>

        {/* Profile View */}
        {!editing ? (
          <div className="bg-white rounded-lg shadow p-6 space-y-3">
            <p><span className="font-semibold">Name:</span> {doctor.doctorName}</p>
            <p><span className="font-semibold">Phone:</span> {doctor.doctorPhone}</p>
            <p><span className="font-semibold">Email:</span> {doctor.doctorEmail}</p>
            <p><span className="font-semibold">Password:</span> {doctor.doctorPassword}</p>
            <p><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
            <p><span className="font-semibold">Experience:</span> {doctor.experienceYears} {doctor.experienceYears > 1 ? "years" : "year"}</p>
            <p><span className="font-semibold">Available:</span> {doctor.available ? "Yes" : "No"}</p>
            <button
              onClick={() => setEditing(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow mt-3 transition duration-200"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="bg-white rounded-lg shadow p-6 space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Name:</label>
              <input
                type="text"
                name="doctorName"
                value={form.doctorName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Phone:</label>
              <input
                type="text"
                name="doctorPhone"
                value={form.doctorPhone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                name="doctorEmail"
                value={form.doctorEmail}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Password:</label>
              <input
                type="text"
                name="doctorPassword"
                value={form.doctorPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Specialization:</label>
              <input
                type="text"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Experience (years):</label>
              <input
                type="number"
                name="experienceYears"
                value={form.experienceYears}
                onChange={handleChange}
                required
                min="0"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label className="font-medium text-gray-700">Available</label>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded shadow transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
