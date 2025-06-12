const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*', // Permite acesso de qualquer origem
  credentials: true
}));
app.use(express.json());

// Dados simulados para demonstração
const linhasOnibus = [
  {
    id: 1,
    numero: '001',
    nome: 'Centro - Zona Norte',
    status: 'ativo',
    tempoEspera: 8,
    lotacao: 'moderada',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 2,
    numero: '002',
    nome: 'Centro - Zona Sul',
    status: 'ativo',
    tempoEspera: 12,
    lotacao: 'alta',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 3,
    numero: '003',
    nome: 'UEM - Centro',
    status: 'ativo',
    tempoEspera: 5,
    lotacao: 'baixa',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 4,
    numero: '004',
    nome: 'Terminal - Shopping',
    status: 'atrasado',
    tempoEspera: 20,
    lotacao: 'alta',
    ultimaAtualizacao: new Date().toISOString()
  }
];

let relatorios = [
  {
    id: 1,
    linhaId: 1,
    usuario: 'Usuario1',
    tipo: 'atraso',
    descricao: 'Ônibus atrasado há mais de 15 minutos',
    timestamp: new Date().toISOString(),
    status: 'pendente'
  },
  {
    id: 2,
    linhaId: 2,
    usuario: 'Usuario2',
    tipo: 'superlotacao',
    descricao: 'Ônibus muito cheio, passageiros não conseguem embarcar',
    timestamp: new Date().toISOString(),
    status: 'verificado'
  }
];

// Rotas da API

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Mobilidade Urbana - Maringá',
    version: '1.0.0',
    endpoints: [
      'GET /api/linhas - Lista todas as linhas de ônibus',
      'GET /api/linhas/:id - Detalhes de uma linha específica',
      'GET /api/relatorios - Lista todos os relatórios',
      'POST /api/relatorios - Cria um novo relatório',
      'GET /api/status - Status geral do sistema'
    ]
  });
});

// Listar todas as linhas de ônibus
app.get('/api/linhas', (req, res) => {
  res.json({
    success: true,
    data: linhasOnibus,
    total: linhasOnibus.length
  });
});

// Obter detalhes de uma linha específica
app.get('/api/linhas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const linha = linhasOnibus.find(l => l.id === id);
  
  if (!linha) {
    return res.status(404).json({
      success: false,
      message: 'Linha não encontrada'
    });
  }
  
  res.json({
    success: true,
    data: linha
  });
});

// Listar todos os relatórios
app.get('/api/relatorios', (req, res) => {
  const { linhaId, tipo, status } = req.query;
  let filteredRelatorios = [...relatorios];
  
  if (linhaId) {
    filteredRelatorios = filteredRelatorios.filter(r => r.linhaId === parseInt(linhaId));
  }
  
  if (tipo) {
    filteredRelatorios = filteredRelatorios.filter(r => r.tipo === tipo);
  }
  
  if (status) {
    filteredRelatorios = filteredRelatorios.filter(r => r.status === status);
  }
  
  res.json({
    success: true,
    data: filteredRelatorios,
    total: filteredRelatorios.length
  });
});

// Criar um novo relatório
app.post('/api/relatorios', (req, res) => {
  const { linhaId, usuario, tipo, descricao } = req.body;
  
  if (!linhaId || !usuario || !tipo || !descricao) {
    return res.status(400).json({
      success: false,
      message: 'Todos os campos são obrigatórios: linhaId, usuario, tipo, descricao'
    });
  }
  
  const novoRelatorio = {
    id: relatorios.length + 1,
    linhaId: parseInt(linhaId),
    usuario,
    tipo,
    descricao,
    timestamp: new Date().toISOString(),
    status: 'pendente'
  };
  
  relatorios.push(novoRelatorio);
  
  res.status(201).json({
    success: true,
    data: novoRelatorio,
    message: 'Relatório criado com sucesso'
  });
});

// Status geral do sistema
app.get('/api/status', (req, res) => {
  const linhasAtivas = linhasOnibus.filter(l => l.status === 'ativo').length;
  const linhasComProblema = linhasOnibus.filter(l => l.status !== 'ativo').length;
  const relatoriosPendentes = relatorios.filter(r => r.status === 'pendente').length;
  
  res.json({
    success: true,
    data: {
      totalLinhas: linhasOnibus.length,
      linhasAtivas,
      linhasComProblema,
      totalRelatorios: relatorios.length,
      relatoriosPendentes,
      ultimaAtualizacao: new Date().toISOString()
    }
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

module.exports = app;

