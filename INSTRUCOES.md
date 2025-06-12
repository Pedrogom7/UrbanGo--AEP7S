# Instruções de Execução - Sistema Mobilidade Maringá

## Iniciando o Sistema Completo

### 1. Iniciar o Backend
```bash
cd /home/ubuntu/mobilidade_maringa/backend
npm run dev
```
O servidor backend estará disponível em: http://localhost:3001

### 2. Iniciar o Frontend
```bash
cd /home/ubuntu/mobilidade_maringa/frontend
pnpm run dev --host
```
A aplicação frontend estará disponível em: http://localhost:5174

### 3. Acessar a Aplicação
Abra o navegador e acesse: http://localhost:5174

## Funcionalidades Disponíveis

### Dashboard
- Acesse a página inicial para ver estatísticas gerais
- Visualize métricas em tempo real do sistema

### Linhas de Ônibus
- Clique em "Linhas" para ver todas as linhas disponíveis
- Veja informações de tempo de espera, status e lotação

### Relatórios
- Clique em "Relatórios" para ver relatórios existentes
- Use "Novo Relatório" para criar um relatório de problema
- Preencha todos os campos obrigatórios

## Testando a API Diretamente

### Listar todas as linhas:
```bash
curl http://localhost:3001/api/linhas
```

### Ver status do sistema:
```bash
curl http://localhost:3001/api/status
```

### Criar um novo relatório:
```bash
curl -X POST http://localhost:3001/api/relatorios \
  -H "Content-Type: application/json" \
  -d '{
    "linhaId": 1,
    "usuario": "Teste",
    "tipo": "atraso",
    "descricao": "Teste de relatório via API"
  }'
```

## Estrutura de Dados

### Linha de Ônibus
```json
{
  "id": 1,
  "numero": "001",
  "nome": "Centro - Zona Norte",
  "status": "ativo",
  "tempoEspera": 8,
  "lotacao": "moderada",
  "ultimaAtualizacao": "2025-06-10T22:37:25.283Z"
}
```

### Relatório
```json
{
  "id": 1,
  "linhaId": 1,
  "usuario": "Usuario1",
  "tipo": "atraso",
  "descricao": "Ônibus atrasado há mais de 15 minutos",
  "timestamp": "2025-06-10T22:37:25.283Z",
  "status": "pendente"
}
```

## Parando os Serviços

Para parar os serviços, use Ctrl+C nos terminais onde estão rodando o backend e frontend.

## Troubleshooting

### Porta em uso
Se as portas estiverem em uso, os serviços tentarão usar portas alternativas automaticamente.

### Erro de CORS
O backend está configurado para aceitar requisições de qualquer origem, então não deve haver problemas de CORS.

### Dados não aparecem
Verifique se o backend está rodando corretamente em http://localhost:3001

