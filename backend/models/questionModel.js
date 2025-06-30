const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: String,
    type: String,
    difficulty: String,
    question: String,
    options: [String],           // frontend'e gönderilecek karışık şıklar
    correctAnswer: String        // sadece backend tarafında tutulacak
});

module.exports = mongoose.model('Question', questionSchema);