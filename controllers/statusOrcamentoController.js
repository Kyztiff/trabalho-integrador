// controllers/statusOrcamentoController.js
// O Controller só sabe: receber req, chamar o Model, enviar res.
// Não contém lógica de negócio nem queries SQL.

const statusOrcamentoModel = require('../models/statusOrcamentoModel');

function listar(req, res) {
    const statusOrcamentos = statusOrcamentoModel.listarTodos();
    res.status(200).json({ total: statusOrcamentos.length, statusOrcamentos });
}
function buscar(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

    const statusOrcamento = statusOrcamentoModel.buscarPorId(id);
    if (!statusOrcamento) return res.status(404).json({ erro: 'Status de orcamento não encontrado' });
    res.status(200).json(statusOrcamento);
}

function criar(req, res) {
    try {
        const novostatusOrcamento = statusOrcamentoModel.criar(req.body);
        res.status(201).set('Location', '/api/statusOrcamento/' + novostatusOrcamento.id).json(novostatusOrcamento); 
    } 
    catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

function atualizar(req, res) {
    const statusOrcamento = statusOrcamentoModel.atualizar(parseInt(req.params.id), req.body);
    if (!statusOrcamento) return res.status(404).json({ erro: 'Status de orcamento não encontrado' });
    res.status(200).json(statusOrcamento);
}

function remover(req, res) {
    const ok = statusOrcamentoModel.remover(parseInt(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Status de orcamento não encontrado' });
    res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };