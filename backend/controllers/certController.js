const db = require('../config/db');
const certService = require('../services/certService');

// Issue new certificate
exports.issueCertificate = async (req, res) => {
    const { participant_id, program_id } = req.body;
    const year = new Date().getFullYear();
    
    try {
        // 1. Get participant and program details
        const [[participant]] = await db.query('SELECT full_name FROM participants WHERE id = ?', [participant_id]);
        const [[program]] = await db.query('SELECT name FROM programs WHERE id = ?', [program_id]);
        
        if (!participant || !program) return res.status(404).json({ message: 'Participant or Program not found' });

        // 2. Generate unique number (Self-increment logic)
        const [[lastCert]] = await db.query('SELECT id FROM certificates ORDER BY id DESC LIMIT 1');
        const nextId = (lastCert?.id || 0) + 1;
        const certNumber = `TRF-${year}-${String(nextId).padStart(6, '0')}`;

        // 3. Generate QR Code
        const verifyUrl = `http://traof-verify.com/verify/${certNumber}`;
        const qrCodeData = await certService.generateQRCode(verifyUrl);

        // 4. Save to DB
        await db.query(
            'INSERT INTO certificates (cert_number, participant_id, program_id, qr_code_data) VALUES (?, ?, ?, ?)',
            [certNumber, participant_id, program_id, qrCodeData]
        );

        // 5. Generate PDF
        const pdfFile = await certService.createCertificatePDF({
            certNumber,
            participantName: participant.full_name,
            programName: program.name,
            qrCode: qrCodeData
        });

        res.status(201).json({ certNumber, pdfFile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get certificates archive
exports.getArchive = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT c.*, p.full_name, pr.name AS program_name 
            FROM certificates c 
            JOIN participants p ON c.participant_id = p.id 
            JOIN programs pr ON c.program_id = pr.id 
            ORDER BY c.issue_date DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
