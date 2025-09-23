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
    mode: "Physical",
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
      await axios.post("http://localhost:5000/doctors", inputs);

      // Reset form after submit
      setInputs({
        doctorName: "",
        doctorPhone: "",
        doctorEmail: "",
        doctorPassword: "",
        specialization: "",
        experienceYears: "",
        available: true,
        mode: "Physical",
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
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
          Add Doctor
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Grid for Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="doctorName"
                value={inputs.doctorName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone:
              </label>
              <input
                type="text"
                name="doctorPhone"
                value={inputs.doctorPhone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Grid for Email + Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="doctorEmail"
                value={inputs.doctorEmail}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                name="doctorPassword"
                value={inputs.doctorPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Specialization + Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Specialization:
              </label>
              <select
                name="specialization"
                value={inputs.specialization}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              >
                <option value="">Select Specialization</option>
                <option value="VOG">VOG</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Ayurvedic Specialist">Ayurvedic Specialist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience (Years):
              </label>
              <input
                type="number"
                name="experienceYears"
                value={inputs.experienceYears}
                onChange={handleChange}
                required
                min="0"
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Mode + Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mode:
              </label>
              <select
                name="mode"
                value={inputs.mode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              >
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
            <div className="flex items-center mt-3 md:mt-6">
              <input
                type="checkbox"
                name="available"
                checked={inputs.available}
                onChange={handleCheckbox}
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                Available
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md shadow text-sm transition duration-200"
            >
              Register
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 rounded-md shadow text-sm transition duration-200"
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
