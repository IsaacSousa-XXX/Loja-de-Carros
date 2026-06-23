const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite receber JSON no body das requisições

// Rota de teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Loja de Veículos rodando com sucesso!' });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});