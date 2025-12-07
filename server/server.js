require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically (optional, if we want to view them)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/resume', resumeRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resume-analyzer')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
