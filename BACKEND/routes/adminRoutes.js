const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin CRUD
router.get('/', adminController.getAllAdmins);
router.post('/', adminController.addAdmin);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
