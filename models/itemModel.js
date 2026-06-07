// models/itemModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.

let itens = [
    { id: 1, comprimento: 60, altura: 50, largura: 40, foto: "foto.jpg", descricao: "Texto3" },
    { id: 2, comprimento: 70, altura: 50, largura: 60, foto: "foto3.jpg", descricao: "Texto2" },
    { id: 3, comprimento: 40, altura: 20, largura: 30, foto: "foto2.jpg", descricao: "Texto1" },
];

let proximoId = 4;
// Regra de negócio centralizada aqui (DRY!)
function listarTodos(filtros = {}) {
    return [...itens];
}

function buscarPorId(id) { 
    return itens.find(i => i.id === id) || null; 
}

function criar(dados) {
    if (!dados.comprimento || !dados.altura || !dados.largura)
        throw new Error('Campos obrigatórios ausentes');

    const novoItem = { id: proximoId++, ...dados };
    itens.push(novoItem);
    return novoItem;
}

function atualizar(id, dados) {
    const idx = itens.findIndex(i => i.id === id);
    if (idx === -1) return null;

    itens[idx] = { ...itens[idx], ...dados, id };
    return itens[idx];
}

function remover(id) {
    const idx = itens.findIndex(i => i.id === id);
    if (idx === -1) return false;

    itens.splice(idx, 1);
    return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
