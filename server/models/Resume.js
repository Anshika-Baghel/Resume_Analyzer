const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    jobDescription: {
        type: String,
        required: true
    },
    analysisResult: {
        score: Number,
        summary: String,
        strengths: [String],
        weaknesses: [String],
        missingSkills: [String],
        improvements: [String]
    }
});

module.exports = mongoose.model('Resume', resumeSchema);
