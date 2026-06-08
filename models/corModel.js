// models/corModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.

let cores = [
    { id: 1, nome: "Marula", fabricante: "Guararapes", valor_chapa: 430.00, foto: "marula.jpg" },
    { id: 2, nome: "Erva mate", fabricante: "Guararapes", valor_chapa: 440.00, foto: "ervamate.jpg"},
    {id: 3, nome: "Mangue", fabricante: "Guararapes", valor_chapa: 420.00, foto: "mangue.jpg"},
];

let proximoId = 4;
// Regra de negócio centralizada aqui (DRY!)
function listarTodos(filtros = {}) {
    return [...cores];
}

function buscarPorId(id) { 
    return cores.find(c => c.id === id) || null; 
}

function criar(dados) {
    if (!dados.nome || !dados.fabricante || !dados.valor_chapa || !dados.foto)
        throw new Error('Campos obrigatórios ausentes');

    const novaCor = { id: proximoId++, ...dados };
    cores.push(novaCor);
    return novaCor;
}

function atualizar(id, dados) {
    const idx = cores.findIndex(c => c.id === id);
    if (idx === -1) return null;

    cores[idx] = { ...cores[idx], ...dados, id };
    return cores[idx];
}

function remover(id) {
    const idx = cores.findIndex(c => c.id === id);
    if (idx === -1) return false;

    cores.splice(idx, 1);
    return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
