const express = require('express');
const router = express.Router();

// Default route for API root
router.get('/', (req, res) => {
    res.json({ message: 'API is now running' });
});

module.exports = router;
