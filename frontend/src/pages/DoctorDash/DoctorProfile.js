import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Nav/DNav"; // ✅ Import Sidebar
import "./DoctorProfile.css";

const DoctorProfile = () => {
  const { id } = useParams(); // get doctorId from URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/doctors/${id}`);
        setDoctor(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch doctor profile.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  if (loading) return <p>Loading doctor profile...</p>;
  if (error) return <p>{error}</p>;
  if (!doctor) return <p>No doctor found.</p>;

  return (
    <div className="doctor-page" style={{ display: "flex" }}>
      {/* ✅ Render the sidebar */}
      <Sidebar />

      <div className="doctor-profile-card" style={{ marginLeft: "250px", padding: "20px" }}>
        <h1>Doctor Profile</h1>
        <p><strong>Name:</strong> {doctor.doctorName}</p>
        <p><strong>Phone:</strong> {doctor.doctorPhone}</p>
        <p><strong>Email:</strong> {doctor.doctorEmail}</p>     
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Experience:</strong> {doctor.experienceYears} {doctor.experienceYears > 1 ? "years" : "year"}</p>
        <p><strong>Available:</strong> {doctor.available ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default DoctorProfile;
