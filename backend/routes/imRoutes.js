const express = require('express');
const router = express.Router();
const imController = require('../controllers/imController'); // ✅ import inventory manager controller

// Inventory Manager CRUD
router.get('/', imController.getAllManagers);
router.post('/', imController.addManager);
router.get('/:id', imController.getManagerById);
router.put('/:id', imController.updateManager);
router.delete('/:id', imController.deleteManager);

module.exports = router;
