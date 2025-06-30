const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel.js');

module.exports = {
    /**
     * GET: All users
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * GET: Single user by ID
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * POST: Create new user (basic version - unused)
     */
    create: function (req, res) {
        return res.status(400).json({ message: 'This endpoint is disabled. Use /register instead.' });
    },

    /**
     * PUT: Update user
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username || user.username;
            user.password = req.body.password || user.password;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * DELETE: Remove user
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    /**
     * POST: Register
     */
    register: async function (req, res) {
        try {
            const { username, email, password } = req.body;

            const exists = await UserModel.findOne({ username });
            if (exists) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            const emailExists = await UserModel.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const user = new UserModel({ username, email, password });
            await user.save();

            req.session.userId = user._id;
            res.status(201).json({ message: 'Registered successfully' });

        } catch (err) {
            console.error("Register error:", err);
            res.status(500).json({ message: 'Server error during registration' });
        }
    },

    /**
     * POST: Login
     */
    login: async function (req, res) {
        const { username } = req.body;
        const password = String(req.body.password);

        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            req.session.userId = user._id;
            res.json({ message: 'Login successful', user: { username: user.username } });

        } catch (err) {
            console.error("LOGIN ERROR:", err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    /**
     * GET: Logout
     */
    logout: function (req, res) {
        req.session.destroy(() => {
            res.json({ message: 'Logged out successfully' });
        });
    },

    /**
     * GET: Me (current session user)
     */
    me: async function (req, res) {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const user = await UserModel.findById(req.session.userId).select('username email createdAt');
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Server error while fetching user' });
        }
    }
};
