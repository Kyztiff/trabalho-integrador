// models/movelModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.

const ambienteModel = require('./ambienteModel');

let moveis = [
    { id: 1, nome: "Mesa", foto: "mesa.jpg", id_ambiente: 1},
    { id: 2, nome: "Estante", foto: "Estante.jpg", id_ambiente: 2},
    { id: 3, nome: "Escrivaninha", foto: "Escrivaninha.jpg", id_ambiente: 3},
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
    if (!dados.nome)
        throw new Error('Nome é obrigatório');

    const existe = moveis.find(
        m => m.nome.toLowerCase() === dados.nome.toLowerCase()
    );

    if (existe)
        throw new Error('Já existe um móvel com esse nome');

    if (dados.nome.trim().length < 3) {
        throw new Error('Nome deve ter pelo menos 3 caracteres');
    }    

    if (!dados.id_ambiente)
        throw new Error('Ambiente é obrigatório');

    if (isNaN(parseInt(dados.id_ambiente))) {
        throw new Error('ID do ambiente inválido');
    }

    const ambiente = ambienteModel.buscarPorId(
        parseInt(dados.id_ambiente)
    );

    if(!ambiente)
        throw new Error('Ambiente não encontrado');

    const novoMovel = { id: proximoId++, ...dados };
    moveis.push(novoMovel);
    return novoMovel;
}

function atualizar(id, dados) {
    const idx = moveis.findIndex(m => m.id === id);
    if (idx === -1) return null;

    if (dados.id_ambiente) {

    const ambiente = ambienteModel.buscarPorId(
        parseInt(dados.id_ambiente)
    );

    if (!ambiente)
        throw new Error('Ambiente não encontrado');
    }

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
