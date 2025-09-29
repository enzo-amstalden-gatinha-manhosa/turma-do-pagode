const express = require('express');
const router = express.Router();
const { createDoacao } = require('../controllers/doacoesController');

// POST /doacoes
router.post('/doacoes', createDoacao);

module.exports = router;