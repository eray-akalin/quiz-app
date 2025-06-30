const mongoose = require('mongoose');
const axios = require('axios');
const he = require('he');
const Question = require('../models/questionModel');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB error:", err));

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

async function fetchAndSaveQuestions() {
    try {
        const res = await axios.get('https://opentdb.com/api.php?amount=50&type=multiple');
        const questions = res.data.results;

        for (let item of questions) {
            const options = shuffle([item.correct_answer, ...item.incorrect_answers]);

            const q = new Question({
                category: he.decode(item.category),
                type: item.type,
                difficulty: item.difficulty,
                question: he.decode(item.question),
                options: shuffle(item.incorrect_answers.concat(item.correct_answer).map(he.decode)),
                correctAnswer: he.decode(item.correct_answer)
            });

            await q.save();
        }

        console.log(`${questions.length} question(s) saved to DB.`);
        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

fetchAndSaveQuestions();
