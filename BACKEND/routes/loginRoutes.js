const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Doctor = require('../model/Doctor'); // your doctor schema
const Admin = require('../model/Admin');   // your admin schema

// POST /loginH
router.post('/', async (req, res) => {
  const { username, password } = req.body; // username = email

  if (!username || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    // Check Admins
    const admin = await Admin.findOne({ email: username, password: password });
    if (admin) {
      return res.status(200).json({ role: 'admin', user: { id: admin._id, email: admin.email } });
    }

    // Check Doctors
    const doctor = await Doctor.findOne({ email: username, password: password });
    if (doctor) {
      return res.status(200).json({ role: 'doctor', user: { id: doctor._id, email: doctor.email } });
    }

    // If no match
    return res.status(401).json({ message: 'Invalid credentials' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
