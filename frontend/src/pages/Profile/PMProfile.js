import React, { useEffect, useState } from "react";
import axios from "axios";
import PMNav from "../../components/Nav/IMNav/IMNav.js"; // Use PMNav if created

const PMProfile = () => {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    managerPhone: "",
    managerEmail: "",
    managerPassword: "",
    nic: "",
    category: "",
  });

  const managerId = localStorage.getItem("pmId");

  useEffect(() => {
    const fetchManager = async () => {
      try {
        if (!managerId) {
          alert("No project manager is logged in!");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/project-managers/${managerId}`
        );
        const data = response.data.manager;

        setManager(data);
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          managerPhone: data.managerPhone,
          managerEmail: data.managerEmail,
          managerPassword: data.managerPassword,
          nic: data.nic,
          category: data.category || "",
        });
      } catch (err) {
        console.error("Error fetching manager profile:", err);
        alert("Failed to fetch project manager profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchManager();
  }, [managerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/project-managers/${managerId}`,
        form
      );
      setManager(res.data.manager);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating manager profile:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading project manager profile...</p>;
  if (!manager)
    return <p className="text-center mt-10 text-red-500">No manager found.</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar / Navigation */}
      <PMNav />

      {/* Profile Content */}
      <div className="flex-1 p-6 md:p-12" style={{ marginLeft: "245px", maxWidth: '600px' }}>
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Project Manager Profile</h1>

        {!editing ? (
          <div className="bg-white shadow rounded-lg p-6 space-y-3">
            <p><strong>First Name:</strong> {manager.firstName}</p>
            <p><strong>Last Name:</strong> {manager.lastName}</p>
            <p><strong>Phone:</strong> {manager.managerPhone}</p>
            <p><strong>Email:</strong> {manager.managerEmail}</p>
            <p><strong>Password:</strong> {manager.managerPassword}</p>
            <p><strong>NIC:</strong> {manager.nic}</p>
            <p><strong>Category:</strong> {manager.category || "N/A"}</p>

            <button
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 transition"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="bg-white shadow rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone:</label>
              <input
                type="text"
                name="managerPhone"
                value={form.managerPhone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email:</label>
              <input
                type="email"
                name="managerEmail"
                value={form.managerEmail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password:</label>
              <input
                type="text"
                name="managerPassword"
                value={form.managerPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">NIC:</label>
              <input
                type="text"
                name="nic"
                value={form.nic}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Category:</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Category</option>
                <option value="Construction">Construction</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded shadow hover:bg-gray-500 transition"
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

export default PMProfile;
