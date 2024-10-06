const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 10;

// Mock database (Replace with actual DB connection)
const users = [];

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Hashing password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        users.push({ email, password: hashedPassword });
        res.status(201).send('User Registered');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).send('Login Successful');
    } else {
        res.status(400).send('Invalid Credentials');
    }
});

module.exports = router;
