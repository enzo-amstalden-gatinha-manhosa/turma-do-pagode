const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.use(authMiddleware);


router.use(adminMiddleware);


router.use('/', adminController);

module.exports = router;