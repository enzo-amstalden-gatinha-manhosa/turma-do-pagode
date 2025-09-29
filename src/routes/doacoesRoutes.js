const express = require('express');
const router = express.Router();
const { createDoacao } = require('../controllers/DoacoesController');

// POST /doacoes
router.post('/doacoes', createDoacao);

module.exports = router;