// src/controllers/ambienteController.js
// O Controller só sabe: receber req, chamar o Model, enviar res.
// Não contém lógica de negócio nem queries SQL.
const ambienteModel = require('../models/ambienteModel');

function listar(req, res) {
    const ambientes = ambienteModel.listarTodos();
    res.status(200).json({ 
        total: ambientes.length, ambientes });
}

function buscar(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) 
        return res.status(400).json({ erro: 'ID inválido' });

    const ambiente = ambienteModel.buscarPorId(id);
    
    if (!ambiente) 
        return res.status(404).json({ erro: 'Ambiente não encontrado' });
    
    res.status(200).json(ambiente);
}

function criar(req, res) {
    try {
        const novoAmbiente = ambienteModel.criar(req.body);
        res.status(201).set('Location', '/api/ambiente/' + novoAmbiente.id).json(novoAmbiente);
    } 
    catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

function atualizar(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) 
        return res.status(400).json({ erro: 'ID inválido' });

    try{
        const ambiente = ambienteModel.atualizar(id, req.body);
    
        if (!ambiente) 
            return res.status(404).json({ erro: 'Ambiente não encontrado' });
        
        res.status(200).json(ambiente);

    }
    catch(err){
        res.status(400).json({erro: err.message});
    }
}
function remover(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) 
        return res.status(400).json({ erro: 'ID inválido' });

    const ok = ambienteModel.remover(id);

    if (!ok) 
        return res.status(404).json({ erro: 'Ambiente não encontrado' });
    
    res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };