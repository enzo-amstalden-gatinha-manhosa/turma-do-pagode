// Venturus/src/routes/adocaoRoutes.js
import express from 'express';
const router = express.Router();
const { postAdocao } = require('../controllers/AdocaoController');

router.post('/', postAdocao);

export default router;