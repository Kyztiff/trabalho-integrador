// routes/movelRoutes.js
// As rotas apenas fazem o mapeamento URL Controller.
// Nenhuma lógica aqui.

const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
router.get('/', itemController.listar);
router.get('/:id', itemController.buscar);
router.post('/', itemController.criar);
router.put('/:id', itemController.atualizar);
router.patch('/:id', itemController.atualizar);
router.delete('/:id', itemController.remover);

module.exports = router;