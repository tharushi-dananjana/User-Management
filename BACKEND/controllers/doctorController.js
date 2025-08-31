const Doctor = require('../model/Doctor');

// Get all doctors
const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json({ doctors });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while fetching doctors.' });
  }
};

// Add new doctor
const addDoctor = async (req, res, next) => {
  const { doctorName, doctorPhone, doctorEmail, doctorPassword, specialization, experienceYears, available } = req.body;

  try {
    const doctor = new Doctor({
      doctorName,
      doctorPhone,
      doctorEmail,
      doctorPassword,
      specialization,
      experienceYears,
      available,
    });
    await doctor.save();
    return res.status(201).json({ doctor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while adding a doctor.' });
  }
};

// Get doctor by ID
const getDoctorById = async (req, res, next) => {
  const id = req.params.id.trim();

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: 'Invalid doctor ID format.' });
  }

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }
    return res.status(200).json({ doctor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while fetching the doctor.' });
  }
};

// Update doctor details
const updateDoctor = async (req, res, next) => {
  const id = req.params.id.trim();

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: 'Invalid doctor ID format.' });
  }

  const { doctorName, doctorPhone, doctorEmail, doctorPassword, specialization, experienceYears, available } = req.body;

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      {
        doctorName,
        doctorPhone,
        doctorEmail,
        doctorPassword,
        specialization,
        experienceYears,
        available,
      },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }
    return res.status(200).json({ doctor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while updating the doctor.' });
  }
};

// Delete doctor
const deleteDoctor = async (req, res, next) => {
  const id = req.params.id.trim();

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: 'Invalid doctor ID format.' });
  }

  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }
    return res.status(200).json({ message: 'Doctor successfully deleted.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while deleting the doctor.' });
  }
};

module.exports = {
  getAllDoctors,
  addDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
