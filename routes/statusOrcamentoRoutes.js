// routes/statusOrcamento.js
const express = require('express');
const router = express.Router();
// Banco de dados em memória (substituir por banco real depois)
const statusOrcamentos = [
    { id: 1, nome: "aprovado", cor: "verde"},
    { id: 2, nome: "pendente", cor: "amarelo"},
    { id: 3, nome: "reprovado", cor: "vermelho"},
];
let proximoId = 4;
// -- GET /statusOrcamento lista todos (com filtro opcional) -----------------------
/*router.get('/', (req, res) => {
    const { curso } = req.query;
    const resultado = curso
        ? alunos.filter(a => a.curso === curso.toUpperCase())
        : alunos;
    res.status(200).json({ total: resultado.length, alunos: resultado });
});
*/
router.get('/', (req, res) => {
    res.status(200).json({
        total: statusOrcamentos.length,
        statusOrcamentos: statusOrcamentos
    });
});

// -- GET /statusOrcamento/:id busca um statusOrcamento específico ---------------------------
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número inteiro" });
    }
    const statusOrcamento = statusOrcamentos.find(a => a.id === id);
    if (!statusOrcamento) {
        return res.status(404).json({ erro: "Status com id " + id + " não encontrado" });
    }
    res.status(200).json(statusOrcamento);
});
// -- POST /statusOrcamento cria novo statusOrcamento ----------------------------------------
router.post('/', (req, res) => {
    const { nome, cor} = req.body;
    if (!nome || !cor) {
        return res.status(400).json({
            erro: "Dados inválidos",
            detalhes: [
                !nome && { campo: "nome", mensagem: "Obrigatório" },
                !cor && { campo: "cor", mensagem: "Obrigatória" },
            ].filter(Boolean)
        });
}
const novostatusOrcamento = { id: proximoId++, nome, cor};
statusOrcamentos.push(novostatusOrcamento);
res.status(201)
    .set('Location', '/api/statusOrcamentos/' + novostatusOrcamento.id)
    .json(novostatusOrcamento);
});
// -- PUT /statusOrcamento/:id substituição completa --------------------------------
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, cor } = req.body;
    if (!nome || !cor) {
        return res.status(400).json({
            erro: "PUT requer todos os campos: nome, cor"
        });
    }
    const indice = statusOrcamentos.findIndex(a => a.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Status não encontrado" });
    }
    statusOrcamentos[indice] = {id, nome, cor};
    res.status(200).json(statusOrcamentos[indice]);
});
// -- PATCH /statusOrcamentos/:id atualização parcial --------------------------------
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = statusOrcamentos.findIndex(a => a.id === id);
    if (indice === -1) {
        return res.status(404).
        
        json({ erro: "Status não encontrado" });
    }
    // Spread: mescla dados existentes com os novos (só campos enviados mudam)
    statusOrcamentos[indice] = { ...statusOrcamentos[indice], ...req.body, id };
    res.status(200).json(statusOrcamentos[indice]);
});
// -- DELETE /statusOrcamentos/:id remoção ------------------------------------------
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = statusOrcamentos.findIndex(a => a.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Status não encontrado" });
    }   
    statusOrcamentos.splice(indice, 1);
    res.status(204).send(); // 204 No Content sem corpo na resposta
});

module.exports = router;