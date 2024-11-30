import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            const user = new User({ username, email, password });
            await user.save();
            res.status(201).json({ message: 'User created successfully.', user_id: user._id });
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
];


export const login = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return res.status(400).json({ status: false, message: 'Invalid Username and password' });
                }

                return bcrypt.compare(password, user.password).then(match => {
                    if (!match) {
                        return res.status(400).json({ status: false, message: 'Invalid Username and password' });
                    }
                    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
                    res.status(200).json({ message: 'Login successful.', jwt_token: token });
                });
            })
            .catch(error => {
                res.status(500).json({ status: false, message: error.message });
            });
    }
];
