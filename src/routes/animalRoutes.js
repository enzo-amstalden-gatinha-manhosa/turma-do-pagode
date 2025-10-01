
const express = require('express');
const router = express.Router();
const animalController = require('../controllers/AnimalController');
const multer = require('multer'); // Importa o multer para upload da foto... fazer upload dps


router.get('/', animalController.listar);

router.get('/:id', animalController.buscarPorId);

router.post('/', animalController.criar);

module.exports = router;