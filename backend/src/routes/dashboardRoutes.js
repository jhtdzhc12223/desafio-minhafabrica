const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// 🔐 Protegido
router.use(verifyToken);

router.get('/', dashboardController.resumo);

module.exports = router;