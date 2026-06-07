// controllers/itemController.js
// O Controller só sabe: receber req, chamar o Model, enviar res.
// Não contém lógica de negócio nem queries SQL.

const itemModel = require('../models/itemModel');

function listar(req, res) {
    const itens = itemModel.listarTodos();
    res.status(200).json({ 
        total: itens.length, 
        itens 
    });
}
function buscar(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

    const item = itemModel.buscarPorId(id);
    if (!item) return res.status(404).json({ erro: 'Item não encontrado' });
    res.status(200).json(item);
}

function criar(req, res) {
    try {
        const novoItem = itemModel.criar(req.body);
        res.status(201).set('Location', '/api/item/' + novoItem.id).json(novoItem); 
    } 
    catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

function atualizar(req, res) {
    const item = itemModel.atualizar(parseInt(req.params.id), req.body);
    if (!item) return res.status(404).json({ erro: 'Item não encontrado' });
    res.status(200).json(item);
}

function remover(req, res) {
    const ok = itemModel.remover(parseInt(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Item não encontrado' });
    res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };