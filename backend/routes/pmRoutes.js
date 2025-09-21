const express = require('express');
const router = express.Router();
const pmController = require('../controllers/pmController'); // ✅ import project manager controller

// Project Manager CRUD
router.get('/', pmController.getAllManagers);
router.post('/', pmController.addManager);
router.get('/:id', pmController.getManagerById);
router.put('/:id', pmController.updateManager);
router.delete('/:id', pmController.deleteManager);

module.exports = router;
