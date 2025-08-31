const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Get all doctors
router.get('/', doctorController.getAllDoctors);

// Add new doctor
router.post('/', doctorController.addDoctor);

// Get doctor by ID
router.get('/:id', doctorController.getDoctorById);

// Update doctor by ID
router.put('/:id', doctorController.updateDoctor);

// Delete doctor by ID
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
