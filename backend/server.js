const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads (logos, backgrounds)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Placeholder
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Traof Certificates API' });
});

// Import Routes
app.use('/api/departments', require('./routes/deptRoutes'));
app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/participants', require('./routes/participantRoutes'));
app.use('/api/certificates', require('./routes/certRoutes'));
app.use('/api/templates', require('./routes/templateRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
