const express = require('express');
const router = express.Router();
const certController = require('../controllers/certController');

router.get('/', certController.getArchive);
router.post('/issue', certController.issueCertificate);

module.exports = router;
