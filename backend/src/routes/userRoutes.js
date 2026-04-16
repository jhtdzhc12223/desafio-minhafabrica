const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// 🔐 TODAS as rotas protegidas
router.use(verifyToken);

router.post('/', userController.criar);
router.get('/', userController.listar);
router.get('/:id', userController.buscarPorId);
router.put('/:id', userController.atualizar);
router.delete('/:id', userController.deletar);

module.exports = router;
