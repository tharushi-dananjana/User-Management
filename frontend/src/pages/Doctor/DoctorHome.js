import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Doctor from "./Doctors";
import Nav from '../../components/Nav/Nav';
import './DoctorHome.css';
import { GrAdd } from 'react-icons/gr';
import DaddUser from './DaddUser';
import DupdateUser from './DupdateUser';

const URL = "http://localhost:5000/doctors";

const fetchHandler = async () => {
  return await axios.get(URL).then(res => res.data);
};

const DoctorHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const getDoctors = () => {
    fetchHandler().then(data => setDoctors(data.doctors));
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if(confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/doctors/${id}`);
        setDoctors(prev => prev.filter(doctor => doctor._id !== id));
        setSuccessMessage('Doctor deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error(err);
        alert('Failed to delete doctor.');
      }
    }
  };

  // Filter doctors by search term (case insensitive)
  const filteredDoctors = doctors.filter(doctor =>
  (doctor.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
  (doctor.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
  (doctor.specialization?.toLowerCase() || '').includes(searchTerm.toLowerCase())
);


  return (
    <div>
      <Nav />

      <h2 className='mh2'>Doctors Registration Details</h2>
      {successMessage && <div className="success-popup">{successMessage}</div>}

      {/* Search box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table id="users">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Experience (Years)</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, i) => (
              <Doctor
                key={i}
                doctor={doctor}
                onUpdate={() => {
                  setSelectedDoctor(doctor);
                  setShowUpdatePopup(true);
                }}
                onDelete={() => handleDelete(doctor._id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                No doctors found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Doctor Button */}
      <div className="float" onClick={() => setShowAddPopup(true)}>
        <GrAdd className="my-float" />
      </div>
      <div className="label-container">
        <div className="label-text">Add Doctor</div>
      </div>

      {/* Add Doctor Popup */}
      {showAddPopup && (
        <DaddUser
          onClose={() => setShowAddPopup(false)}
          onDoctorAdded={() => {
            getDoctors();
            setSuccessMessage('Doctor added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
          }}
        />
      )}

      {/* Update Doctor Popup */}
      {showUpdatePopup && selectedDoctor && (
        <DupdateUser
          doctor={selectedDoctor}
          onClose={() => setShowUpdatePopup(false)}
          onDoctorUpdated={() => {
            getDoctors();
            setSuccessMessage('Doctor updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
          }}
        />
      )}
    </div>
  );
};

export default DoctorHome;
