const express = require('express');
const router = express.Router();
const controller = require('../controllers/templateController');

router.get('/', controller.getAllTemplates);
router.post('/', controller.createTemplate);
router.delete('/:id', controller.deleteTemplate);

module.exports = router;
