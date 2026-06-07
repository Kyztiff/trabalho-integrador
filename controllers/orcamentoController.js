// controllers/orcamentoController.js
// O Controller só sabe: receber req, chamar o Model, enviar res.
// Não contém lógica de negócio nem queries SQL.

const orcamentoModel = require('../models/orcamentoModel');

function listar(req, res) {
    const orcamentos = orcamentoModel.listarTodos();
    res.status(200).json({ total: orcamentos.length, orcamentos });
}
function buscar(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

    const orcamento = orcamentoModel.buscarPorId(id);
    if (!orcamento) return res.status(404).json({ erro: 'Orcamento não encontrado' });
    res.status(200).json(orcamento);
}

function criar(req, res) {
    try {
        const novoOrcamento = orcamentoModel.criar(req.body);
        res.status(201).set('Location', '/api/orcamento/' + novoOrcamento.id).json(novoOrcamento); 
    } 
    catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

function atualizar(req, res) {
    const orcamento = orcamentoModel.atualizar(parseInt(req.params.id), req.body);
    if (!orcamento) return res.status(404).json({ erro: 'Orcamento não encontrado' });
    res.status(200).json(orcamento);
}

function remover(req, res) {
    const ok = orcamentoModel.remover(parseInt(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Orcamento não encontrado' });
    res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };