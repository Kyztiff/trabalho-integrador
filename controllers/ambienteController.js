// src/controllers/ambienteController.js
// O Controller só sabe: receber req, chamar o Model, enviar res.
// Não contém lógica de negócio nem queries SQL.
const ambienteModel = require('../models/ambienteModel');

async function listar(req, res) {
    try{
        const ambientes = await ambienteModel.listarTodos();
        res.status(200).json({ 
            total: ambientes.length, 
            ambientes 
        });
    } catch(err){
        res.status(500).json({
            erro: 'Erro ao listar ambientes'
        });
    }

}

async function buscar(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) 
        return res.status(400).json({ erro: 'ID inválido' });

    try{
        const ambiente = await ambienteModel.buscarPorId(id);
    
        if (!ambiente) 
            return res.status(404).json({ erro: 'Ambiente não encontrado' });
    
        res.status(200).json(ambiente);
    }
    catch(err){
        res.status(500).json({erro: err.message});
    }
}

async function criar(req, res) {
    try {
        const novoAmbiente = await ambienteModel.criar(req.body);

        res.status(201)
        .set('Location', '/api/ambiente/' + novoAmbiente.id_ambiente)
        .json(novoAmbiente);
    } catch (err) {
        res.status(400).json({ 
            erro: err.message 
        });
    }
}

async function atualizar(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) 
        return res.status(400).json({ erro: 'ID inválido' });

    try{
        const ambiente = await ambienteModel.atualizar(id, req.body);
    
        if (!ambiente) 
            return res.status(404).json({ erro: 'Ambiente não encontrado' });
        
        res.status(200).json(ambiente);

    }
    catch(err){
        res.status(400).json({erro: err.message});
    }
}

async function remover(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) 
        return res.status(400).json({ erro: 'ID inválido' });

    try{ 
        const ok = await ambienteModel.remover(id);

        if (!ok) 
            return res.status(404).json({ erro: 'Ambiente não encontrado' });
    
        res.status(200).json({
            mensagem: 'Ambiente removido com sucesso'
         });
    } catch (err){
        res.status(500).json({ erro: err.message });
    }
}

module.exports = { listar, buscar, criar, atualizar, remover };