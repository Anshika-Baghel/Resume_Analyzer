const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');
const Resume = require('../models/Resume');
const { analyzeResume } = require('../services/aiService');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

// Analyze Resume Route
router.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No resume file uploaded" });
        }
        const { jobDescription } = req.body;
        if (!jobDescription) {
            return res.status(400).json({ error: "Job description is required" });
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdf(dataBuffer);
        const resumeText = pdfData.text;

        const analysis = await analyzeResume(resumeText, jobDescription);

        // Save to Database
        const newResume = new Resume({
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            jobDescription: jobDescription,
            analysisResult: analysis
        });

        await newResume.save();

        res.json(newResume);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during analysis" });
    }
});

// Get History
router.get('/history', async (req, res) => {
    try {
        const history = await Resume.find().sort({ uploadDate: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// Admin Analytics
router.get('/analytics', async (req, res) => {
    try {
        const totalResumes = await Resume.countDocuments();

        const avgScoreResult = await Resume.aggregate([
            {
                $group: {
                    _id: null,
                    avgScore: { $avg: "$analysisResult.score" }
                }
            }
        ]);

        const avgScore = avgScoreResult.length > 0 ? Math.round(avgScoreResult[0].avgScore) : 0;

        res.json({
            totalResumes,
            avgScore
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});

module.exports = router;
