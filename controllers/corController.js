// controllers/corController.js
// O Controller só sabe: receber req, chamar o Model, enviar res.
// Não contém lógica de negócio nem queries SQL.

const corModel = require('../models/corModel');

function listar(req, res) {
    const cores = corModel.listarTodos();
    res.status(200).json({ 
        total: cores.length, 
        cores 
    });
}
function buscar(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

    const cor = corModel.buscarPorId(id);
    if (!cor) return res.status(404).json({ erro: 'Cor não encontrada' });
    res.status(200).json(cor);
}

function criar(req, res) {
    try {
        const novoCor = corModel.criar(req.body);
        res.status(201).set('Location', '/api/cor/' + novoCor.id).json(novoCor); 
    } 
    catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

function atualizar(req, res) {
    const cor = corModel.atualizar(parseInt(req.params.id), req.body);
    if (!cor) return res.status(404).json({ erro: 'cor não encontrada' });
    res.status(200).json(cor);
}

function remover(req, res) {
    const ok = corModel.remover(parseInt(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Cor não encontrada' });
    res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };