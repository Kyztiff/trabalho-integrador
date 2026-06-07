// routes/usuarioRoutes.js
// As rotas apenas fazem o mapeamento URL Controller.
// Nenhuma lógica aqui.const express = require('express');

const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.buscar);
router.post('/', usuarioController.criar);
router.put('/:id', usuarioController.atualizar);
router.patch('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.remover);

module.exports = router;
