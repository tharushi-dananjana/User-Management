const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all admins
router.get('/', adminController.getAllAdmins);

// Add new admin
router.post('/', adminController.addAdmin);

// Get admin by ID
router.get('/:id', adminController.getAdminById);

// Update admin by ID
router.put('/:id', adminController.updateAdmin);

// Delete admin by ID
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
