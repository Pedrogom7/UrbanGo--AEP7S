# Documentação do Banco de Dados - UrbanGo

## Visão Geral

Este documento descreve a estrutura do banco de dados utilizado pelo UrbanGo, um aplicativo web para consulta e colaboração em informações sobre transporte público urbano. A base de dados é projetada para fornecer desempenho eficiente, segurança e suporte a funcionalidades colaborativas em tempo real.

---

## Modelo de Dados

### Entidades Principais

#### 1. Usuários (`users`)

* `id` (PK, UUID): Identificador único do usuário.
* `nome` (VARCHAR): Nome completo do usuário.
* `email` (VARCHAR): Email único do usuário.
* `senha_hash` (VARCHAR): Hash da senha do usuário.
* `data_cadastro` (TIMESTAMP): Data de criação da conta.

#### 2. Linhas de Ônibus (`bus_lines`)

* `id` (PK, UUID): Identificador único da linha.
* `nome` (VARCHAR): Nome da linha (ex: "Circular Norte").
* `numero` (VARCHAR): Número identificador da linha.

#### 3. Paradas de Ônibus (`bus_stops`)

* `id` (PK, UUID): Identificador único da parada.
* `nome` (VARCHAR): Nome da parada.
* `latitude` (FLOAT): Latitude da localização.
* `longitude` (FLOAT): Longitude da localização.

#### 4. Rotas (`routes`)

* `id` (PK, UUID): Identificador único da rota.
* `linha_id` (FK): Linha de ônibus associada.
* `parada_id` (FK): Parada de ônibus associada.
* `ordem` (INTEGER): Ordem de passagem da parada.

#### 5. Horários (`schedules`)

* `id` (PK, UUID): Identificador único do horário.
* `linha_id` (FK): Linha relacionada.
* `horario_partida` (TIME): Horário de saída da linha.
* `dia_semana` (VARCHAR): Dia da semana (ex: "Segunda-feira").

#### 6. Relatos dos Usuários (`user_reports`)

* `id` (PK, UUID): Identificador do relato.
* `usuario_id` (FK): Usuário que fez o relato.
* `linha_id` (FK): Linha relacionada.
* `tipo` (VARCHAR): Tipo de relato (atraso, superlotação, cancelamento).
* `descricao` (TEXT): Descrição adicional.
* `data_hora` (TIMESTAMP): Data e hora do relato.
* `latitude` / `longitude` (FLOAT): Localização do relato (opcional).

#### 7. Feedback do Aplicativo (`feedbacks`)

* `id` (PK, UUID): Identificador do feedback.
* `usuario_id` (FK): Autor do feedback.
* `mensagem` (TEXT): Comentário do usuário.
* `data_envio` (TIMESTAMP): Data do envio.

---

## Relacionamentos

* Um usuário pode realizar vários relatos (`1:N`).
* Uma linha pode ter várias paradas (`1:N`) e vários horários (`1:N`).
* Uma rota conecta uma linha a uma parada com ordem definida.

---

## Tecnologias e Armazenamento

* **SGDB**: PostgreSQL (recomendado pelo suporte a tipos geográficos e desempenho).
* **ORM Sugerido**: Prisma ou Sequelize (Node.js).

---

## Considerações de Segurança

* Senhas devem ser armazenadas com hash seguro (bcrypt recomendado).
* Autenticação via JWT para API.
* Sanitização e validação de entrada para evitar SQL Injection.

---

## Expansão Futura

* Tabela de notificações push.
* Tabela de logs de acesso.
* Integração com dados abertos da prefeitura (importação automatizada).

---

## Backup e Manutenção

* Backup diário automatizado.
* Rotinas de limpeza para dados antigos ou irrelevantes (ex: relatos com mais de 90 dias).

---

## Conclusão

O modelo proposto para o banco de dados do UrbanGo oferece escalabilidade, integridade referencial, e suporte para funcionalidades colaborativas com foco em transporte público urbano em tempo real.
