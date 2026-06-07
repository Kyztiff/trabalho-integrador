// routes/movelRoutes.js
// As rotas apenas fazem o mapeamento URL Controller.
// Nenhuma lógica aqui.

const express = require('express');
const router = express.Router();

const movelController = require('../controllers/movelController');
router.get('/', movelController.listar);
router.get('/:id', movelController.buscar);
router.post('/', movelController.criar);
router.put('/:id', movelController.atualizar);
router.patch('/:id', movelController.atualizar);
router.delete('/:id', movelController.remover);

module.exports = router;

/*/ routes/movelRoutes.js
const express = require('express');
const router = express.Router();
// Banco de dados em memória (substituir por banco real depois)
const moveis = [
    { id: 1, nome: "Mesa", foto: "mesa.jpg"},
    { id: 2, nome: "Estante", foto: "Estante.jpg"},
    { id: 3, nome: "Escrivaninha", foto: "Escrivaninha.jpg"},
];
let proximoId = 4;
// -- GET /movelRoutes lista todos (com filtro opcional) -----------------------
router.get('/', (req, res) => {
    res.status(200).json({
        total: moveis.length,
        moveis: moveis
    });
});
// -- GET /movel/:id busca um aluno específico ---------------------------
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número inteiro" });
    }
    const movel = moveis.find(a => a.id === id);
    if (!movel) {
        return res.status(404).json({ erro: "Movel com id " + id + " não encontrado" });
    }
    res.status(200).json(movel);
});
// -- POST /movel cria novo movel ----------------------------------------
router.post('/', (req, res) => {
    const { nome, foto } = req.body;
    if (!nome || !foto) {
        return res.status(400).json({
            erro: "Dados inválidos",
            detalhes: [
                !nome && { campo: "nome", mensagem: "Obrigatório" },
                !foto && { campo: "foto", mensagem: "Obrigatória" },
            ].filter(Boolean)
        });
}
const novoMovel = { id: proximoId++, nome, foto};
moveis.push(novoMovel);
res.status(201)
    .set('Location', '/api/movel/' + novoMovel.id)
    .json(novoMovel);
});
// -- PUT /movel/:id substituição completa --------------------------------
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, foto } = req.body;
    if (!nome || !foto) {
        return res.status(400).json({
            erro: "PUT requer todos os campos: nome,foto"
        });
    }
    const indice = moveis.findIndex(m => m.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Movel não encontrado" });
    }
    moveis[indice] = {id, nome, foto};
    res.status(200).json(moveis[indice]);
});
// -- PATCH /movel/:id atualização parcial --------------------------------
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = moveis.findIndex(m => m.id === id);
    if (indice === -1) {
        return res.status(404).
        
        json({ erro: "Movel não encontrado" });
    }
    // Spread: mescla dados existentes com os novos (só campos enviados mudam)
    moveis[indice] = { ...moveis[indice], ...req.body, id };
    res.status(200).json(moveis[indice]);
});
// -- DELETE /alunos/:id remoção ------------------------------------------
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = moveis.findIndex(m => m.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Movel não encontrado" });
    }   
    moveis.splice(indice, 1);
    res.status(204).send(); // 204 No Content sem corpo na resposta
});

module.exports = router;

*/