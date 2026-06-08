// routes/movelRoutes.js
// As rotas apenas fazem o mapeamento URL Controller.
// Nenhuma lógica aqui.

const express = require('express');
const router = express.Router();

const corController = require('../controllers/corController');
router.get('/', corController.listar);
router.get('/:id', corController.buscar);
router.post('/', corController.criar);
router.put('/:id', corController.atualizar);
router.patch('/:id', corController.atualizar);
router.delete('/:id', corController.remover);

module.exports = router;
