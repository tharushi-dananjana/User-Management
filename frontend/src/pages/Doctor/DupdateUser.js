import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DupdateUser = ({ doctor, onClose, onDoctorUpdated }) => {
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs(doctor); // initialize form with doctor data
  }, [doctor]);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = () => {
    setInputs(prev => ({ ...prev, available: !prev.available }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/doctors/${doctor._id}`, {
        doctorName: String(inputs.doctorName),
        doctorPhone: String(inputs.doctorPhone),
        doctorEmail: String(inputs.doctorEmail),
        doctorPassword: String(inputs.doctorPassword),
        specialization: String(inputs.specialization),
        experienceYears: Number(inputs.experienceYears),
        available: Boolean(inputs.available),
      });
      onDoctorUpdated(); // refresh doctor list & show success
      onClose(); // close popup
    } catch (err) {
      console.error(err);
      alert('Failed to update doctor.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-bold text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Update Doctor</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name:</label>
            <input
              type="text"
              name="doctorName"
              value={inputs.doctorName || ''}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone:</label>
            <input
              type="text"
              name="doctorPhone"
              value={inputs.doctorPhone || ''}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              type="email"
              name="doctorEmail"
              value={inputs.doctorEmail || ''}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password:</label>
            <input
              type="password"
              name="doctorPassword"
              value={inputs.doctorPassword || ''}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={inputs.specialization || ''}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Experience (Years):</label>
            <input
              type="number"
              name="experienceYears"
              value={inputs.experienceYears || ''}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={inputs.available || false}
              onChange={handleCheckbox}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label className="text-gray-700 font-medium">Available</label>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition duration-200"
            >
              Update Doctor
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded shadow transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DupdateUser;
