const express = require('express');
const router = express.Router();
const multer = require('multer');
const participantController = require('../controllers/participantController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', participantController.getAllParticipants);
router.post('/', participantController.createParticipant);
router.post('/bulk', upload.single('file'), participantController.bulkImportParticipants);

module.exports = router;
