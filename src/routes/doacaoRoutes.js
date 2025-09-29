const express = require('express');
const router = express.Router();
const doacao = require('../routes/doacaoRoutes');

router.post('/', doacao.post);
