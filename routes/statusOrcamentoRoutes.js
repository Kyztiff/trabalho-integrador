// routes/statusOrcamentoRoutes.js
// As rotas apenas fazem o mapeamento URL Controller.
// Nenhuma lógica aqui.const express = require('express');

const express = require('express');
const router = express.Router();

const statusOrcamentoController = require('../controllers/statusOrcamentoController');
router.get('/', statusOrcamentoController.listar);
router.get('/:id', statusOrcamentoController.buscar);
router.post('/', statusOrcamentoController.criar);
router.put('/:id', statusOrcamentoController.atualizar);
router.patch('/:id', statusOrcamentoController.atualizar);
router.delete('/:id', statusOrcamentoController.remover);

module.exports = router;

