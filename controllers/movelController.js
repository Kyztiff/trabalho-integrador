// controllers/movelController.js
// O Controller só sabe: receber req, chamar o Model, enviar res.
// Não contém lógica de negócio nem queries SQL.

const movelModel = require('../models/movelModel');

function listar(req, res) {
    const moveis = movelModel.listarTodos();
    res.status(200).json({ total: moveis.length, moveis });
}
function buscar(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

    const movel = movelModel.buscarPorId(id);
    if (!movel) return res.status(404).json({ erro: 'Movel não encontrado' });
    res.status(200).json(movel);
}

function criar(req, res) {
    try {
        const novoMovel = movelModel.criar(req.body);
        res.status(201).set('Location', '/api/movel/' + novoMovel.id).json(novoMovel); 
    } 
    catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

function atualizar(req, res) {
    const movel = movelModel.atualizar(parseInt(req.params.id), req.body);
    if (!movel) return res.status(404).json({ erro: 'Movel não encontrado' });
    res.status(200).json(movel);
}

function remover(req, res) {
    const ok = movelModel.remover(parseInt(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Movel não encontrado' });
    res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };