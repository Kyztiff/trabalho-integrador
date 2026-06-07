// models/orcamentoModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.

let orcamentos = [
    { id: 1, data: "06/06/2026", valor: "100,5", resposta_adm: "sim"},
    { id: 2, data: "06/06/2026", valor: "150,2", resposta_adm: "sim"},
    { id: 3, data: "06/06/2026", valor: "130,3", resposta_adm: "sim"},
];
let proximoId = 4;

// Regra de negócio centralizada aqui (DRY!)
function listarTodos(filtros = {}) {
    return [...orcamentos];
}

function buscarPorId(id) { 
    return orcamentos.find(o => o.id === id) || null; 
}

function criar(dados) {
    if (!dados.data || !dados.valor || !dados.resposta_adm)
        throw new Error('Campos obrigatórios ausentes');

    const novoOrcamento = { id: proximoId++, ...dados };
    orcamentos.push(novoOrcamento);
    return novoOrcamento;
}

function atualizar(id, dados) {
    const idx = orcamentos.findIndex(o => o.id === id);
    if (idx === -1) return null;

    orcamentos[idx] = { ...orcamentos[idx], ...dados, id };
    return orcamentos[idx];
}

function remover(id) {
    const idx = orcamentos.findIndex(o => o.id === id);
    if (idx === -1) return false;

    orcamentos.splice(idx, 1);
    return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
