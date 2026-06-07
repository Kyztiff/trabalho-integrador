// models/statusOrcamentoModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.

let statusOrcamentos = [
    { id: 1, nome: "aprovado", cor: "verde"},
    { id: 2, nome: "pendente", cor: "amarelo"},
    { id: 3, nome: "reprovado", cor: "vermelho"},
];
let proximoId = 4;

// Regra de negócio centralizada aqui (DRY!)
function listarTodos(filtros = {}) {
    return [...statusOrcamentos];
}

function buscarPorId(id) { 
    return statusOrcamentos.find(s => s.id === id) || null; 
}

function criar(dados) {
    if (!dados.nome || !dados.cor)
        throw new Error('Campos obrigatórios ausentes');

    const novostatusOrcamento = { id: proximoId++, ...dados };
    statusOrcamentos.push(novostatusOrcamento);
    return novostatusOrcamento;
}

function atualizar(id, dados) {
    const idx = statusOrcamentos.findIndex(s => s.id === id);
    if (idx === -1) return null;

    statusOrcamentos[idx] = { ...statusOrcamentos[idx], ...dados, id };
    return statusOrcamentos[idx];
}

function remover(id) {
    const idx = statusOrcamentos.findIndex(s => s.id === id);
    if (idx === -1) return false;

    statusOrcamentos.splice(idx, 1);
    return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
