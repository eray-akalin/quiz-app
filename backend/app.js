const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('dotenv').config();

const scoreRoutes = require('./routes/scoreRoutes');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');


const app = express();

//  MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Middleware sırası ÖNEMLİ
app.use(logger('dev'));
app.use(express.json()); // BODY PARSER ÖNCE GELMELİ
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001', // React portu
  credentials: true
}));

// SESSION middleware – PASSPORT'TAN ÖNCE
app.use(session({
  secret: 'quiz_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL
  }),
  cookie: { maxAge: 60 * 60 * 1000 } // 1 saat
}));

// PASSPORT middleware – session'dan SONRA
require('./passport');
app.use(passport.initialize());
app.use(passport.session());

// Static dosyalar (frontend için)
app.use(express.static(path.join(__dirname, 'public')));

// Route'lar

app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/scores', scoreRoutes);

// 404
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// Error handler — VIEW ENGINE YOKSA render kullanma
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
});


module.exports = app;
