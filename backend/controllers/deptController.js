const db = require('../config/db');

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM departments ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create department
exports.createDepartment = async (req, res) => {
    const { name, manager_name, status } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO departments (name, manager_name, status) VALUES (?, ?, ?)',
            [name, manager_name, status || 'نشط']
        );
        res.status(201).json({ id: result.insertId, name, manager_name, status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update department
exports.updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, manager_name, status } = req.body;
    try {
        await db.query(
            'UPDATE departments SET name = ?, manager_name = ?, status = ? WHERE id = ?',
            [name, manager_name, status, id]
        );
        res.json({ message: 'Department updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM departments WHERE id = ?', [id]);
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
