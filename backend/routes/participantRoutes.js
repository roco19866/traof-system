const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.get('/', participantController.getAllParticipants);
router.post('/', participantController.createParticipant);
router.post('/bulk', participantController.bulkImportParticipants);

module.exports = router;
