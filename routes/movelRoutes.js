// routes/movelRoutes.js
// As rotas apenas fazem o mapeamento URL Controller.
// Nenhuma lógica aqui.

const express = require('express');
const router = express.Router();

const movelController = require('../controllers/movelController');
router.get('/', movelController.listar);
router.get('/:id', movelController.buscar);
router.post('/', movelController.criar);
router.put('/:id', movelController.atualizar);
router.patch('/:id', movelController.atualizar);
router.delete('/:id', movelController.remover);

module.exports = router;