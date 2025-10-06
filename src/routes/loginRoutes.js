const express = require('express');
const router = express.Router();
const { Verification } = require('../controllers/LoginController');

// rota de login
router.post('/login', Verification);

module.exports = router;
