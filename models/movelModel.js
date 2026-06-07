// models/movelModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.
let moveis = [
    { id: 1, nome: "Mesa", foto: "mesa.jpg"},
    { id: 2, nome: "Estante", foto: "Estante.jpg"},
    { id: 3, nome: "Escrivaninha", foto: "Escrivaninha.jpg"},
];

let proximoId = 4;
// Regra de negócio centralizada aqui (DRY!)
function listarTodos(filtros = {}) {
    return [...moveis];
}

function buscarPorId(id) { 
    return moveis.find(m => m.id === id) || null; 
}

function criar(dados) {
    if (!dados.nome || !dados.foto )
        throw new Error('Campos obrigatórios ausentes');

    const novoMovel = { id: proximoId++, ...dados };
    moveis.push(novoMovel);
    return novoMovel;
}

function atualizar(id, dados) {
    const idx = moveis.findIndex(m => m.id === id);
    if (idx === -1) return null;

    moveis[idx] = { ...moveis[idx], ...dados, id };
    return moveis[idx];
}

function remover(id) {
    const idx = moveis.findIndex(m => m.id === id);
    if (idx === -1) return false;

    moveis.splice(idx, 1);
    return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
