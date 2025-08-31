const Admin = require('../model/Admin');

// Get all admins
const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json({ admins });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while fetching admins.' });
  }
};

// Add new admin
const addAdmin = async (req, res, next) => {
  const { adminName, adminEmail, adminPhone, adminPassword } = req.body;

  try {
    const admin = new Admin({
      adminName,
      adminEmail,
      adminPhone,
      adminPassword,
    });
    await admin.save();
    return res.status(201).json({ admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while adding an admin.' });
  }
};

// Get admin by ID
const getAdminById = async (req, res, next) => {
  const id = req.params.id.trim();

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: 'Invalid admin ID format.' });
  }

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }
    return res.status(200).json({ admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while fetching the admin.' });
  }
};

// Update admin
const updateAdmin = async (req, res, next) => {
  const id = req.params.id.trim();

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: 'Invalid admin ID format.' });
  }

  const { adminName, adminEmail, adminPhone, adminPassword } = req.body;

  try {
    const admin = await Admin.findByIdAndUpdate(
      id,
      {
        adminName,
        adminEmail,
        adminPhone,
        adminPassword,
      },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }
    return res.status(200).json({ admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while updating the admin.' });
  }
};

// Delete admin
const deleteAdmin = async (req, res, next) => {
  const id = req.params.id.trim();

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: 'Invalid admin ID format.' });
  }

  try {
    const admin = await Admin.findByIdAndRemove(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }
    return res.status(200).json({ message: 'Admin successfully deleted.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while deleting the admin.' });
  }
};

module.exports = {
  getAllAdmins,
  addAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
