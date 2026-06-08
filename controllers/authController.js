const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

function login(req, res) {

    const { email, senha } = req.body;

    const usuario = usuarioModel.buscarPorEmail(email);

    if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({
            erro: 'Credenciais inválidas'
        });
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            role: usuario.tipo
        },
        'segredo-super-secreto',
        {
            expiresIn: '15m'
        }
    );

    res.status(200).json({ token });
}

function registrar(req, res) {

    try {

        const novoUsuario = usuarioModel.criar(req.body);

        res.status(201)
            .set('Location', '/api/usuario/' + novoUsuario.id)
            .json(novoUsuario);

    } catch (err) {

        res.status(400).json({
            erro: err.message
        });

    }
}

module.exports = {
    login,
    registrar
};