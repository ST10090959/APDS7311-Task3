const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 10;

// Define User Schema and Model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{13}$/, // 13 digits
    },
    accountNumber: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]{6,10}$/, // 6 to 10 alphanumeric characters
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('users', userSchema);

// Registration Route

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { idNumber, accountNumber, password } = req.body;

        // Validate input fields
        if (!idNumber || !accountNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find user by ID number and account number
        const user = await User.findOne({ idNumber, accountNumber });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        res.status(200).json({ message: 'Login Successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { fullName, idNumber, accountNumber, password } = req.body;

        // Validate input fields
        if (!fullName || !idNumber || !accountNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ idNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this ID number already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save user to MongoDB
        const newUser = new User({ fullName, idNumber, accountNumber, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User Registered' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

module.exports = router;
