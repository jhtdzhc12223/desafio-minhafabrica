const express = require('express');
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// 🔐 Rotas protegidas
router.use(verifyToken);

router.post('/', productController.criar);
router.get('/', productController.listar);
router.get('/:id', productController.buscarPorId);
router.put('/:id', productController.atualizar);
router.delete('/:id', productController.deletar);

module.exports = router;