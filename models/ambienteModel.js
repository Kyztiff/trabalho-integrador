// /models/ambienteModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.

// -------------------------DADOS---------------------------------
let ambientes = [
    { id: 1, nome: "Cozinha"},
    { id: 2, nome: "Sala" },
    { id: 3, nome: "Quarto"},
];

let proximoId = 4;

// Regra de negócio centralizada aqui (DRY!)
// ---------------------VALIDADORES---------------------------------
function validarNome(nome) {
    if (nome === undefined || nome === null)
        throw new Error('Nome é obrigatório');

    if (typeof nome !== 'string')
        throw new Error('Nome deve ser um texto');

    const nomeTratado = nome.trim();

    if (nomeTratado.length === 0)
        throw new Error('Nome é obrigatório');

    if (nomeTratado.length > 50)
        throw new Error('Nome deve ter no máximo 50 caracteres');

    return nomeTratado;
}
// ---------------------HELPERS---------------------------------

function encontrarPorNome(nome, ignorarId = null) {
    return ambientes.find(a =>
        a.nome.toLowerCase() === nome.toLowerCase() &&
        a.id !== ignorarId
    );
}

// ---------------------CRUD---------------------------------

    function listarTodos(filtros = {}) {
        return [...ambientes];
    };

    function buscarPorId(id) { 
        return ambientes.find(a => a.id === id) || null; 
    }

    function criar(dados) {

        const nome = validarNome(dados.nome);   
        
        if (encontrarPorNome(nome))
            throw new Error('Já existe um ambiente com esse nome');

        const novoAmbiente = { id: proximoId++, nome };
        ambientes.push(novoAmbiente);
        return novoAmbiente;
    }

    function atualizar(id, dados) {

        const idx = ambientes.findIndex(a => a.id === id);
        if (idx === -1) return null;

        if (dados.nome !== undefined) {
            const nome = validarNome(dados.nome);

            if (encontrarPorNome(nome, id))
                throw new Error('Já existe um ambiente com esse nome');

            dados.nome = nome;
        }

        ambientes[idx] = { 
            ...ambientes[idx], 
            ...dados, id };

        return ambientes[idx];
    }

    function remover(id) {

        const idx = ambientes.findIndex(a => a.id === id);
        if (idx === -1) return false;

        ambientes.splice(idx, 1);
        return true;
    }

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };