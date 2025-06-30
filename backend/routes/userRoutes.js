const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const passport = require('passport');

//Google login route'ları önce
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: true,
    }),
    (req, res) => {
        req.session.userId = req.user._id;
        res.redirect('http://localhost:3001/dashboard'); // frontend'e yönlendirme
    }
);


router.get('/me', userController.me);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);




module.exports = router;
