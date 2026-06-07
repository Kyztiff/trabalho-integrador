// src/routes/AmbienteRoutes.js
// As rotas apenas fazem o mapeamento URL Controller.
// Nenhuma lógica aqui.
const express = require('express');
const router = express.Router();

const AmbienteController = require('../controllers/ambienteController');
router.get('/', AmbienteController.listar);
router.get('/:id', AmbienteController.buscar);
router.post('/', AmbienteController.criar);
router.put('/:id', AmbienteController.atualizar);
router.patch('/:id', AmbienteController.atualizar);
router.delete('/:id', AmbienteController.remover);

module.exports = router;