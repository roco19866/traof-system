const db = require('../config/db');
const ExcelJS = require('exceljs');

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

// Bulk Import via Excel
exports.bulkImportParticipants = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'Please upload an Excel file' });

    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(req.file.buffer);
        const worksheet = workbook.getWorksheet(1);
        
        const participants = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) { // Skip header
                participants.push([
                    row.getCell(1).value, // full_name
                    row.getCell(2).value, // national_id
                    row.getCell(3).value, // email
                    row.getCell(4).value, // mobile
                    row.getCell(5).value, // gender
                    req.body.dept_id,
                    req.body.program_id
                ]);
            }
        });

        if (participants.length > 0) {
            await db.query(
                'INSERT INTO participants (full_name, national_id, email, mobile, gender, dept_id, program_id) VALUES ?',
                [participants]
            );
        }

        res.json({ message: `${participants.length} participants imported successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
