const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const QuestionarioController = require('../controllers/QuestionarioController');

router.get('/:id', UsuarioController.listar);

router.post('/', UsuarioController.criar);

router.patch('/:id', UsuarioController.atualizar);

router.post('/questionario', QuestionarioController.criar);

module.exports = router;


