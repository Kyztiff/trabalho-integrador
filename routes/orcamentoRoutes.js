// routes/orcamentoRoutes.js
// As rotas apenas fazem o mapeamento URL Controller.
// Nenhuma lógica aqui.const express = require('express');

const express = require('express');
const router = express.Router();

const orcamentoController = require('../controllers/orcamentoController');
router.get('/', orcamentoController.listar);
router.get('/:id', orcamentoController.buscar);
router.post('/', orcamentoController.criar);
router.put('/:id', orcamentoController.atualizar);
router.patch('/:id', orcamentoController.atualizar);
router.delete('/:id', orcamentoController.remover);

module.exports = router;




/*/ routes/alunos.js
const express = require('express');
const router = express.Router();
// Banco de dados em memória (substituir por banco real depois)
const orcamentos = [
    { id: 1, data: "06/06/2026", valor: "100,5", resposta_adm: "sim"},
    { id: 2, data: "06/06/2026", valor: "150,2", resposta_adm: "sim"},
    { id: 3, data: "06/06/2026", valor: "130,3", resposta_adm: "sim"},
];
let proximoId = 4;
// -- GET /alunos lista todos (com filtro opcional) -----------------------
/*router.get('/', (req, res) => {
    const { curso } = req.query;
    const resultado = curso
        ? alunos.filter(a => a.curso === curso.toUpperCase())
        : alunos;
    res.status(200).json({ total: resultado.length, alunos: resultado });
});

router.get('/', (req, res) => {
    res.status(200).json({
        total: orcamentos.length,
        orcamentos: orcamentos
    });
});

// -- GET /alunos/:id busca um aluno específico ---------------------------
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número inteiro" });
    }
    const orcamento = orcamentos.find(o => o.id === id);
    if (!orcamento) {
        return res.status(404).json({ erro: "Orcamento com id " + id + " não encontrado" });
    }
    res.status(200).json(orcamento);
});
// -- POST /orcamento cria novo aluno ----------------------------------------
router.post('/', (req, res) => {
    const { data, valor, resposta_adm } = req.body;
    if (!data || !valor || !resposta_adm) {
        return res.status(400).json({
            erro: "Dados inválidos",
            detalhes: [
                !data && { campo: "data", mensagem: "Obrigatório" },
                !valor && { campo: "valor", mensagem: "Obrigatória" },
                !resposta_adm && { campo: "resposta_adm", mensagem: "Obrigatório" },
            ].filter(Boolean)
        });
}

const novoOrcamento = { id: proximoId++, data, valor, resposta_adm};
orcamentos.push(novoOrcamento);
res.status(201)
    .set('Location', '/api/orcamentos/' + novoOrcamento.id)
    .json(novoOrcamento);
});
// -- PUT /alunos/:id substituição completa --------------------------------
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { data, valor, resposta_adm } = req.body;
    if (!data || !valor || !resposta_adm) {
        return res.status(400).json({
            erro: "PUT requer todos os campos: data, valor, resposta_adm"
        });
    }
    const indice = orcamentos.findIndex(o => o.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Orcamento não encontrado" });
    }
    orcamentos[indice] = {id, data, valor, resposta_adm};
    res.status(200).json(orcamentos[indice]);
});
// -- PATCH /alunos/:id atualização parcial --------------------------------
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = orcamentos.findIndex(o => o.id === id);
    if (indice === -1) {
        return res.status(404).
        
        json({ erro: "Orcamento não encontrado" });
    }
    // Spread: mescla dados existentes com os novos (só campos enviados mudam)
    orcamentos[indice] = { ...orcamentos[indice], ...req.body, id };
    res.status(200).json(orcamentos[indice]);
});
// -- DELETE /alunos/:id remoção ------------------------------------------
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = orcamentos.findIndex(o => o.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Orcamento não encontrado" });
    }   
    orcamentos.splice(indice, 1);
    res.status(204).send(); // 204 No Content sem corpo na resposta
});


module.exports = router;

*/