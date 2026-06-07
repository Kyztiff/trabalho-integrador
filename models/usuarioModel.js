// models/usuarioModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.
let usuarios = [
    { id: 1, nome: "Ana Souza", CPF: "12345678910", email: "ana@uffs.com", senha: "aninha007", tipo: "cliente" },
    { id: 2, nome: "Bruno Lima", CPF: "09876543211", email: "bruno@uffs.com", senha: "brunninho007", tipo: "cliente"},
    { id: 3, nome: "Carla Matos", CPF: "56743219012", email: "carla@uffs.com", senha: "carlinha007", tipo: "administrador" },
];
let proximoId = 4;

// Regra de negócio centralizada aqui (DRY!)
function listarTodos(filtros = {}) {
    return [...usuarios];
}

function buscarPorId(id) { 
    return usuarios.find(u => u.id === id) || null; 
}

function criar(dados) {
    if (!dados.nome || !dados.CPF || !dados.email || !dados.senha || !dados.tipo)
        throw new Error('Campos obrigatórios ausentes');

    const novoUsuario = { id: proximoId++, ...dados };
    usuarios.push(novoUsuario);
    return novoUsuario;
}

function atualizar(id, dados) {
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return null;

    usuarios[idx] = { ...usuarios[idx], ...dados, id };
    return usuarios[idx];
}

function remover(id) {
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return false;

    usuarios.splice(idx, 1);
    return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
