// Venturus/src/routes/adocaoRoutes.js
const express= require('express');
const router = express.Router();
const { postAdocao } = require('../controllers/AdocaoController');

router.post('/', postAdocao);

module.exports = router;