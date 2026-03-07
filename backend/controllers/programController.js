const db = require('../config/db');

// Get all programs
exports.getAllPrograms = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, d.name AS department_name 
            FROM programs p 
            LEFT JOIN departments d ON p.dept_id = d.id 
            ORDER BY p.created_at DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create program
exports.createProgram = async (req, res) => {
    const { name, dept_id, type, trainer_name, start_date, end_date, location, description } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO programs (name, dept_id, type, trainer_name, start_date, end_date, location, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, dept_id, type, trainer_name, start_date, end_date, location, description]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete program
exports.deleteProgram = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM programs WHERE id = ?', [id]);
        res.json({ message: 'Program deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
