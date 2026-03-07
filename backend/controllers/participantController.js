const db = require('../config/db');

// Get all participants
exports.getAllParticipants = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, d.name AS department_name, pr.name AS program_name 
            FROM participants p 
            LEFT JOIN departments d ON p.dept_id = d.id 
            LEFT JOIN programs pr ON p.program_id = pr.id 
            ORDER BY p.created_at DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create participant
exports.createParticipant = async (req, res) => {
    const { full_name, national_id, email, mobile, gender, dept_id, program_id } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO participants (full_name, national_id, email, mobile, gender, dept_id, program_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [full_name, national_id, email, mobile, gender, dept_id, program_id]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Bulk Import (Conceptual - will integrate with exceljs)
exports.bulkImportParticipants = async (req, res) => {
    // Logic for parsing Excel and inserting into DB
    res.json({ message: 'Bulk import logic ready for integration' });
};
