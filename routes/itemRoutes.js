// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
// Banco de dados em memória (substituir por banco real depois)
const itens = [
    { id: 1, comprimento: 60, altura: 50, largura: 40, foto: "foto.jpg", descricao: "Texto3" },
    { id: 2, comprimento: 70, altura: 50, largura: 60, foto: "foto3.jpg", descricao: "Texto2" },
    { id: 3, comprimento: 40, altura: 20, largura: 30, foto: "foto2.jpg", descricao: "Texto1" },
];
let proximoId = 4;
// -- GET /item lista todos (com filtro opcional) -----------------------
router.get('/', (req, res) => {
    res.status(200).json({
        total: itens.length,
        itens: itens
    });
});
// -- GET /item/:id busca um item específico ---------------------------
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número inteiro" });
    }
    const item = itens.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ erro: "Item com número " + id + " não encontrado" });
    }
    res.status(200).json(item);
});
// -- POST /item cria novo item ----------------------------------------
router.post('/', (req, res) => {
    const { comprimento, altura, largura, foto, descricao } = req.body;
    if (!comprimento || !altura || !largura) {
        return res.status(400).json({
            erro: "Dados inválidos",
            detalhes: [
                !comprimento && { campo: "comprimento", mensagem: "Obrigatório" },
                !altura && { campo: "altura", mensagem: "Obrigatória" },
                !largura && { campo: "largura", mensagem: "Obrigatória" },
            ].filter(Boolean)
        });
}
const novoItem = { id: proximoId++, comprimento, altura, largura, foto, descricao};
itens.push(novoItem);
res.status(201)
    .set('Location', '/api/item/' + novoItem.id)
    .json(novoItem);
});
// -- PUT /item/:id substituição completa --------------------------------
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {comprimento, altura, largura, foto, descricao} = req.body;
    if (!comprimento || !altura || !largura || !foto || !descricao) {
        return res.status(400).json({
            erro: "PUT requer todos os campos: comprimento, altura, largura, foto, descrição"
        });
    }
    const indice = itens.findIndex(i => i.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Item não encontrado" });
    }
    itens[indice] = {id, comprimento, altura, largura, foto, descricao};
    res.status(200).json(itens[indice]);
});
// -- PATCH /item/:id atualização parcial --------------------------------
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = itens.findIndex(i => i.id === id);
    if (indice === -1) {
        return res.status(404).
        
        json({ erro: "Item não encontrado" });
    }
    // Spread: mescla dados existentes com os novos (só campos enviados mudam)
    itens[indice] = { ...itens[indice], ...req.body, id };
    res.status(200).json(itens[indice]);
});
// -- DELETE /alunos/:id remoção ------------------------------------------
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = itens.findIndex(i => i.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Item não encontrado" });
    }   
    itens.splice(indice, 1);
    res.status(204).send(); // 204 No Content sem corpo na resposta
});
module.exports = router;