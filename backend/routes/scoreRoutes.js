const express = require('express');
const router = express.Router();
const Score = require('../models/scoreModel');

// Quiz tamamlandığında sonucu kaydet
router.post('/submit', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const { answers } = req.body;
        const totalScore = answers.reduce((sum, ans) => sum + ans.score, 0);

        const score = new Score({
            user: req.session.userId,
            totalScore,
            answers
        });

        await score.save();

        res.status(201).json({ message: 'Score saved successfully' });
    } catch (err) {
        console.error("Score submit error:", err);
        res.status(500).json({ message: 'Server error submitting score' });
    }
});

// Geçmiş quiz sonuçları
router.get('/history', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const history = await Score.find({ user: req.session.userId }).sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching history' });
    }
});

// Leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const topScores = await Score.find()
            .sort({ totalScore: -1 })
            .limit(10)
            .populate('user', 'username email');

        const formatted = topScores.map(s => ({
            username: s.user.username,
            email: s.user.email,
            totalScore: s.totalScore
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: 'Error loading leaderboard' });
    }
});

module.exports = router;
