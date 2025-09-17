const express = require('express');
const router = express.Router();
const adocaoRoutes = require('../routes/adocaoRoutes');

router.post('/', adocaoRoutes.post);

module.exports = router;