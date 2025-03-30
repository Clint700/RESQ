const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const contactRoutes = require('./routes/contactRoutes');
const botRoutes = require('./routes/botRoutes');
const endpointRoutes = require('./routes/endpointRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/alerts', emergencyRoutes);
app.use('/contacts', contactRoutes);
app.use('/bot', botRoutes);
app.use('/endpoints', endpointRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
