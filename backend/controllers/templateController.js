const db = require('../config/db');

// Get all templates
exports.getAllTemplates = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM templates ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create template
exports.createTemplate = async (req, res) => {
    const { title, body_text, signature_name, signature_title, type, logo_url, background_url } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO templates (title, body_text, signature_name, signature_title, type, logo_url, background_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, body_text, signature_name, signature_title, type, logo_url, background_url]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete template
exports.deleteTemplate = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM templates WHERE id = ?', [id]);
        res.json({ message: 'Template deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
