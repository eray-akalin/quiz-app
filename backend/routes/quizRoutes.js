const express = require('express');
const router = express.Router();
const Question = require('../models/questionModel');


// GET /api/quiz/start
router.get('/start', async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 10 } }]);

        // Her sorunun başlama zamanını session’a yaz
        questions.forEach(q => {
            req.session[`question_${q._id}_start`] = Date.now();
        });

        const sanitized = questions.map(q => ({
            _id: q._id,
            category: q.category,
            type: q.type,
            difficulty: q.difficulty,
            question: q.question,
            options: q.options // ŞIKLAR 
        }));

        res.json(sanitized);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching quiz.' });
    }
});




// POST /api/quiz/answer
router.post('/answer', async (req, res) => {
    const { questionId, selectedAnswer } = req.body;
    const startTime = req.session[`question_${questionId}_start`];

    // Server çökmesin diye önce kontrol et
    if (!startTime) {
        return res.status(400).json({
            message: 'Start time missing from session. Call /api/quiz/start first.'
        });
    }

    const timeTaken = (Date.now() - startTime) / 1000;

    try {
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        const isCorrect = selectedAnswer === question.correctAnswer;
        const grade = isCorrect ? 1 : 0;

        const n = 100 * grade;
        const k = 0.2;
        const e = 2.71828;
        const score = n * Math.pow(e, -k * timeTaken);

        delete req.session[`question_${questionId}_start`];

        res.json({
            correct: isCorrect,
            grade: grade,
            time: timeTaken,
            score: parseFloat(score.toFixed(2))
        });
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ message: 'Server error during grading.' });
    }
});

// Yeni: her soru başında süre başlat
router.post('/set-start', (req, res) => {
    const { questionId } = req.body;
    req.session[`question_${questionId}_start`] = Date.now();
    res.json({ message: 'Start time set' });
});



module.exports = router;
