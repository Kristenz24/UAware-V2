const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'pages', 'home.html'));
    
});


router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'pages', 'index.html'));
    
});

module.exports = router;
