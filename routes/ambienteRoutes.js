// routes/ambiente.js
const express = require('express');
const router = express.Router();
// Banco de dados em memória (substituir por banco real depois)
const ambientes = [
    { id: 1, nome: "Cozinha"},
    { id: 2, nome: "Sala" },
    { id: 3, nome: "Quarto"},
];
let proximoId = 4;

// -- GET /ambiente lista todos (com filtro opcional) -----------------------
/*router.get('/', (req, res) => {
    const { curso } = req.query;
    const resultado = curso
        ? alunos.filter(a => a.curso === curso.toUpperCase())
        : alunos;
    res.status(200).json({ total: resultado.length, alunos: resultado });
});*/

router.get('/', (req, res) => {
    res.status(200).json({
        total: ambientes.length,
        ambientes: ambientes
    });
});

// -- GET /ambiente/:id busca um ambiente específico ---------------------------
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número inteiro" });
    }
    const ambiente = ambientes.find(a => a.id === id);
    if (!ambiente) {
        return res.status(404).json({ erro: "Ambiente com id " + id + " não encontrado" });
    }
    res.status(200).json(ambiente);
});
// -- POST /ambiente cria novo ambiente ----------------------------------------
router.post('/', (req, res) => {
    const {nome} = req.body;
    if (!nome) {
        return res.status(400).json({
            erro: "Dados inválidos",
            detalhes: [
                !nome && { campo: "nome", mensagem: "Obrigatório" },
            ].filter(Boolean)
        });
}
const novoAmbiente = { id: proximoId++, nome};
ambientes.push(novoAmbiente);
res.status(201)
    .set('Location', '/api/ambiente/' + novoAmbiente.id)
    .json(novoAmbiente);
});
// -- PUT /ambiente/:id substituição completa --------------------------------
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {nome} = req.body;
    if (!nome) {
        return res.status(400).json({
            erro: "PUT requer o campo: nome"
        });
    }
    const indice = ambientes.findIndex(a => a.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Ambiente não encontrado" });
    }
    ambientes[indice] = {id, nome};
    res.status(200).json(ambientes[indice]);
});
// -- PATCH /ambiente/:id atualização parcial --------------------------------
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = ambientes.findIndex(a => a.id === id);
    if (indice === -1) {
        return res.status(404).
        
        json({ erro: "Ambiente não encontrado" });
    }
    // Spread: mescla dados existentes com os novos (só campos enviados mudam)
    ambientes[indice] = { ...ambientes[indice], ...req.body, id };
    res.status(200).json(ambientes[indice]);
});
// -- DELETE /ambiente/:id remoção ------------------------------------------
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = ambientes.findIndex(a => a.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Ambiente não encontrado" });
    }   
    ambientes.splice(indice, 1);
    res.status(204).send(); // 204 No Content sem corpo na resposta
});
module.exports = router;