// routes/corRoutes.js
const express = require('express');
const router = express.Router();
// Banco de dados em memória (substituir por banco real depois)
const cores = [
    { id: 1, nome: "Marula", fabricante: "Guararapes", valor_chapa: 430.00, foto: "marula.jpg" },
    { id: 2, nome: "Erva mate", fabricante: "Guararapes", valor_chapa: 440.00, foto: "ervamate.jpg"},
    {id: 3, nome: "Mangue", fabricante: "Guararapes", valor_chapa: 420.00, foto: "mangue.jpg"},
];
let proximoId = 4;
// -- GET /cor lista todos -----------------------
router.get('/', (req, res) => {
    res.status(200).json({
        total: cores.length,
        cores: cores
    });
});
// -- GET /cor/:id busca uma cor específica ---------------------------
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número inteiro" });
    }
    const cor = cores.find(a => a.id === id);
    if (!cor) {
        return res.status(404).json({ erro: "Cor com id " + id + " não encontrada" });
    }
    res.status(200).json(cor);
});
// -- POST /cor cria nova cor ----------------------------------------
router.post('/', (req, res) => {
    const { nome, fabricante, valor_chapa, foto } = req.body;
    if (!nome || !fabricante || !valor_chapa || !foto) {
        return res.status(400).json({
            erro: "Dados inválidos",
            detalhes: [
                !nome && { campo: "nome", mensagem: "Obrigatório" },
                !fabricante && { campo: "fabricante", mensagem: "Obrigatório" },
                !valor_chapa && { campo: "valor chapa", mensagem: "Obrigatória" },
                !foto && { campo: "foto", mensagem: "Obrigatória" },
            ].filter(Boolean)
        });
}
const novaCor = { id: proximoId++, nome, fabricante, valor_chapa, foto};
cores.push(novaCor);
res.status(201)
    .set('Location', '/api/cor/' + novaCor.id)
    .json(novaCor);
});
// -- PUT /cor/:id substituição completa --------------------------------
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, fabricante, valor_chapa, foto } = req.body;
    if (!nome || !fabricante || !valor_chapa || !foto) {
        return res.status(400).json({
            erro: "PUT requer todos os campos: nome, fabricante, valor_chapa, foto"
        });
    }
    const indice = cores.findIndex(c => c.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Cor não encontrada" });
    }
    cores[indice] = {id, nome, fabricante, valor_chapa, foto};
    res.status(200).json(cores[indice]);
});
// -- PATCH /cor/:id atualização parcial --------------------------------
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = cores.findIndex(c => c.id === id);
    if (indice === -1) {
        return res.status(404).
        
        json({ erro: "Cor não encontrada" });
    }
    // Spread: mescla dados existentes com os novos (só campos enviados mudam)
    cores[indice] = { ...cores[indice], ...req.body, id };
    res.status(200).json(cores[indice]);
});
// -- DELETE /cor/:id remoção ------------------------------------------
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = cores.findIndex(c => c.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Cor não encontrada" });
    }   
    cores.splice(indice, 1);
    res.status(204).send(); // 204 No Content sem corpo na resposta
});
module.exports = router;