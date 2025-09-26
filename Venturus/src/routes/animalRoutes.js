
const express = require('express');
const router = express.Router();
const animalController = require('../controllers/AnimalController');

router.get('/', animalController.listar);

router.get('/:id', animalController.buscarPorId);

router.post('/', animalController.criar);

module.exports = router;