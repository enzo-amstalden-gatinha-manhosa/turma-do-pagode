const express = require('express');
const router = express.Router();
const QuestionarioController = require('../controllers/QuestionarioController');

router.post('/', QuestionarioController.criar);

module.exports = router;