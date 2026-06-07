// controllers/usuarioController.js
// O Controller só sabe: receber req, chamar o Model, enviar res.
// Não contém lógica de negócio nem queries SQL.

const usuarioModel = require('../models/usuarioModel');

function listar(req, res) {
    const usuarios = usuarioModel.listarTodos();
    res.status(200).json({ total: usuarios.length, usuarios });
}
function buscar(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

    const usuario = usuarioModel.buscarPorId(id);
    if (!usuario) return res.status(404).json({ erro: 'Usuario não encontrado' });
    res.status(200).json(usuario);
}

function criar(req, res) {
    try {
        const novoUsuario = usuarioModel.criar(req.body);
        res.status(201).set('Location', '/api/usuario/' + novoUsuario.id).json(novoUsuario); 
    } 
    catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

function atualizar(req, res) {
    const usuario = usuarioModel.atualizar(parseInt(req.params.id), req.body);
    if (!usuario) return res.status(404).json({ erro: 'Usuario não encontrado' });
    res.status(200).json(usuario);
}

function remover(req, res) {
    const ok = usuarioModel.remover(parseInt(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Usuario não encontrado' });
    res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };