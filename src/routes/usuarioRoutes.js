const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/:id', UsuarioController.listar);

router.post('/', UsuarioController.criar);

router.patch('/:id', UsuarioController.atualizar);



module.exports = router;
