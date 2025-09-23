import React, { useState } from "react";
import axios from "axios";

const DaddUser = ({ onClose, onDoctorAdded }) => {
  const [inputs, setInputs] = useState({
    doctorName: "",
    doctorPhone: "",
    doctorEmail: "",
    doctorPassword: "",
    specialization: "",
    experienceYears: "",
    available: true,
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = () => {
    setInputs((prev) => ({ ...prev, available: !prev.available }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/doctors", {
        doctorName: String(inputs.doctorName),
        doctorPhone: String(inputs.doctorPhone),
        doctorEmail: String(inputs.doctorEmail),
        doctorPassword: String(inputs.doctorPassword),
        specialization: String(inputs.specialization),
        experienceYears: Number(inputs.experienceYears),
        available: Boolean(inputs.available),
      });

      setInputs({
        doctorName: "",
        doctorPhone: "",
        doctorEmail: "",
        doctorPassword: "",
        specialization: "",
        experienceYears: "",
        available: true,
      });

      onDoctorAdded();
      onClose();
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message);
      } else {
        alert("Failed to add doctor. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3 p-6 relative">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add Doctor
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name:</label>
            <input
              type="text"
              name="doctorName"
              value={inputs.doctorName}
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
              value={inputs.doctorPhone}
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
              value={inputs.doctorEmail}
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
              value={inputs.doctorPassword}
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
              value={inputs.specialization}
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
              value={inputs.experienceYears}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={inputs.available}
              onChange={handleCheckbox}
              className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
            />
            <label className="text-gray-700 font-medium">Available</label>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
            >
              Register Doctor
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded shadow transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DaddUser;
