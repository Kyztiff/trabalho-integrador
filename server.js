// index.js servidor Express mínimo
const express = require('express');
const ambienteRoutes = require('./routes/ambienteRoutes');
const corRoutes = require('./routes/corRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
// Cria a instância da aplicação Express
const app = express();
// Define a porta usa variável de ambiente ou 3000 como fallback
const PORTA = process.env.PORT || 3001;
// Middleware para fazer o parse do corpo JSON das requisições
// Sem isso, req.body será undefined em rotas POST/PUT/PATCH
app.use(express.json());
app.use('/api/ambiente', ambienteRoutes);
app.use('/api/cor', corRoutes);
app.use('/api/usuario', usuarioRoutes);
// Rota de teste responde a GET /
app.get('/', (req, res) => {
res.json({
mensagem: 'API funcionando!',
versao: '1.0.0',
timestamp: new Date().toISOString()
});
});
// Inicia o servidor na porta especificada
app.listen(PORTA, () => {
console.log("Servidor rodando em http://localhost:" + PORTA);
});
// Inicie o servidor (escolha o gerenciador que estiver usando)
// npm run dev // com npm
// yarn dev // com yarn
// Teste no terminal (com curl) ou no navegador
// curl http://localhost:3000/
// Resposta esperada:
// { "mensagem": "API funcionando!", "versao": "1.0.0", "timestamp": "..." }