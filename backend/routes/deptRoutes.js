const express = require('express');
const router = express.Router();
const deptController = require('../controllers/deptController');

router.get('/', deptController.getAllDepartments);
router.post('/', deptController.createDepartment);
router.put('/:id', deptController.updateDepartment);
router.delete('/:id', deptController.deleteDepartment);

module.exports = router;
