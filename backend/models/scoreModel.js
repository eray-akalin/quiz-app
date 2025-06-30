const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalScore: { type: Number, required: true },
    answers: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
            selectedAnswer: String,
            correct: Boolean,
            grade: Number,
            time: Number,
            score: Number
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);