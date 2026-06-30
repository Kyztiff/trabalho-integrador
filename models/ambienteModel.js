// /models/ambienteModel.js
// O Model encapsula TODA a lógica de dados.
// O Controller nunca acessa o banco diretamente.

// -------------------------DADOS---------------------------------
const db = require('../config/database');

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

    if (nomeTratado.length < 3)
        throw new Error('Nome deve ter pelo menos 3 caracteres');

    if (nomeTratado.length > 50)
        throw new Error('Nome deve ter no máximo 50 caracteres');

    return nomeTratado;
}
// ---------------------HELPERS---------------------------------

async function encontrarPorNome(nome, ignorarId = null) {
    return await db.oneOrNone(
        `
        SELECT *
        FROM ambiente
        WHERE nome ILIKE $1
        AND ($2 IS NULL OR id_ambiente <> $2)
        `,
        [nome, ignorarId]
    );
}

// ---------------------CRUD---------------------------------

async function listarTodos(filtros = {}) {
    return await db.any(
        `
        SELECT
            id_ambiente,
            nome
        FROM ambiente
        ORDER BY id_ambiente
        `
    );
}

async function buscarPorId(id) { 
    return await db.oneOrNone(
        `
        SELECT *
        FROM ambiente
        WHERE id_ambiente = $1
        `,
        [id]
    );
}

async function criar(dados) {

    const nome = validarNome(dados.nome);   
        
    if (await encontrarPorNome(nome))
        throw new Error('Já existe um ambiente com esse nome');

     return await db.one(
        `
        INSERT INTO ambiente (nome)
        VALUES ($1)
        RETURNING *;
        `,
        [nome]
    );
}

async function atualizar(id, dados) {

    const ambiente = await buscarPorId(id);

    if (!ambiente) 
        return null;

    if(dados.nome === undefined)
        throw new Error('Nenhum dado informado para atualização');
        

    const nome = validarNome(dados.nome);

    if (await encontrarPorNome(nome, id))
        throw new Error('Já existe um ambiente com esse nome');

    return await db.one(
        `
        UPDATE ambiente
        SET nome = $1
        WHERE id_ambiente = $2
        RETURNING *;
        `,
        [nome, id]
        );
}

async function remover(id) {

    const ambiente = await buscarPorId(id);
    
    if (!ambiente) 
        return false;

    await db.none(
        `
        DELETE FROM ambiente
        WHERE id_ambiente = $1
        `,
        [id]
    );
    return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };