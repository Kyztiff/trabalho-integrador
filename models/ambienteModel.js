// /models/ambienteModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.
let ambientes = [
    { id: 1, nome: "Cozinha"},
    { id: 2, nome: "Sala" },
    { id: 3, nome: "Quarto"},
];

let proximoId = 4;
// Regra de negócio centralizada aqui (DRY!)
    function listarTodos(filtros = {}) {
        return [...ambientes];
    };

    function buscarPorId(id) { 
        return ambientes.find(a => a.id === id) || null; 
    }

    function criar(dados) {
        if (!dados.nome)
            throw new Error('Nome é obrigatório');
        const existe = ambientes.find(
            a => a.nome.toLowerCase() === dados.nome.toLowerCase()
        );

        if (existe)
            throw new Error('Já existe um ambiente com esse nome');

        const novoAmbiente = { id: proximoId++, ...dados };
        ambientes.push(novoAmbiente);
        return novoAmbiente;
    }

    function atualizar(id, dados) {
        const idx = ambientes.findIndex(a => a.id === id);
        if (idx === -1) return null;
        ambientes[idx] = { ...ambientes[idx], ...dados, id };
        return ambientes[idx];
    }

    function remover(id) {
        const idx = ambientes.findIndex(a => a.id === id);
        if (idx === -1) return false;
        ambientes.splice(idx, 1);
        return true;
    }

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };