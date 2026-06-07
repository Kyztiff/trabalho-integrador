// routes/alunos.js
const express = require('express');
const router = express.Router();
// Banco de dados em memória (substituir por banco real depois)
const usuarios = [
    { id: 1, nome: "Ana Souza", CPF: "12345678910", email: "ana@uffs.com", senha: "aninha007", tipo: "cliente" },
    { id: 2, nome: "Bruno Lima", CPF: "09876543211", email: "bruno@uffs.com", senha: "brunninho007", tipo: "cliente"},
    { id: 3, nome: "Carla Matos", CPF: "56743219012", email: "carla@uffs.com", senha: "carlinha007", tipo: "administrador" },
];
let proximoId = 4;

// -- GET /usuarios lista todos (com filtro opcional) -----------------------
/*router.get('/', (req, res) => {
    const { curso } = req.query;
    const resultado = curso
        ? alunos.filter(a => a.curso === curso.toUpperCase())
        : alunos;
    res.status(200).json({ total: resultado.length, alunos: resultado });
});*/

 router.get('/', (req, res) => {
    res.status(200).json({
        total: usuarios.length,
        usuarios: usuarios
    });
});

// -- GET /usuarios/:id busca um usuario específico ---------------------------
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número inteiro" });
    }
    const usuario = usuarios.find(a => a.id === id);
    if (!usuario) {
        return res.status(404).json({ erro: "Usuario com id " + id + " não encontrado" });
    }
    res.status(200).json(usuario);
});
// -- POST /alunos cria novo aluno ----------------------------------------
router.post('/', (req, res) => {
    const { nome, CPF, email, senha, tipo } = req.body;
    if (!nome || !CPF || !email || !senha || !tipo) {
        return res.status(400).json({
            erro: "Dados inválidos",
            detalhes: [
                !nome && { campo: "nome", mensagem: "Obrigatório" },
                !CPF && { campo: "CPF", mensagem: "Obrigatória" },
                !email && { campo: "email", mensagem: "Obrigatório" },
                !senha && { campo: "senha", mensagem: "Obrigatório" },
                !tipo && { campo: "tipo", mensagem: "Obrigatório" },
            ].filter(Boolean)
        });
}

const novoUsuario = { id: proximoId++, nome, CPF, email, senha, tipo};
usuarios.push(novoUsuario);
res.status(201)
    .set('Location', '/api/usuarios/' + novoUsuario.id)
    .json(novoUsuario);
});
// -- PUT /usuarios/:id substituição completa --------------------------------
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, CPF, email, senha, tipo} = req.body;
    if (!nome || !CPF || !email || !senha || !tipo) {
        return res.status(400).json({
            erro: "PUT requer o campo: nome, CPF, email, senha, tipo"
        });
    }
    const indice = usuarios.findIndex(a => a.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "usuario não encontrado" });
    }
    usuarios[indice] = {id, nome, CPF, email, senha, tipo};
    res.status(200).json(usuarios[indice]);
});
// -- PATCH /usuarios/:id atualização parcial --------------------------------
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = usuarios.findIndex(a => a.id === id);
    if (indice === -1) {
        return res.status(404).
        
        json({ erro: "Usuario não encontrado" });
    }
    // Spread: mescla dados existentes com os novos (só campos enviados mudam)
    usuarios[indice] = { ...usuarios[indice], ...req.body, id };
    res.status(200).json(usuarios[indice]);
});
// -- DELETE /alunos/:id remoção ------------------------------------------
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = usuarios.findIndex(a => a.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Usuario não encontrado" });
    }   
    usuarios.splice(indice, 1);
    res.status(204).send(); // 204 No Content sem corpo na resposta
});

module.exports = router;