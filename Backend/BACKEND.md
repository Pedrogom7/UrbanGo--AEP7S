# Documentação do Back-End - UrbanGo

## Visão Geral

Esta documentação descreve a arquitetura, as tecnologias e as funcionalidades do back-end do UrbanGo, um aplicativo web colaborativo voltado à mobilidade urbana inteligente. O back-end fornece APIs RESTful que possibilitam a consulta de horários, rotas, relatos de usuários e integração com serviços de geolocalização.

---

## Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript no servidor.
* **Express.js**: Framework web para criação de APIs REST.
* **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
* **Prisma ORM**: Mapeamento objeto-relacional para modelagem e consultas no banco de dados.
* **JWT (JSON Web Tokens)**: Autenticação e autorização de usuários.
* **bcrypt**: Hash de senhas com segurança.
* **CORS**: Middleware para controle de acesso cruzado.
* **Dotenv**: Gerenciamento de variáveis de ambiente.

---

## Estrutura de Pastas

```
/backend
├── prisma/             # Esquema do banco de dados e migrations
├── src
│   ├── controllers/    # Lógica dos endpoints
│   ├── middlewares/    # Middlewares (auth, error handling)
│   ├── routes/         # Definição das rotas da API
│   ├── services/       # Regras de negócio
│   ├── utils/          # Funções auxiliares (ex: hashing)
│   ├── config/         # Configuração de banco de dados, ambiente
│   ├── index.js        # Arquivo principal da aplicação
├── .env                # Variáveis de ambiente
```

---

## Endpoints da API

### Autenticação

* `POST /auth/register` – Criação de usuário
* `POST /auth/login` – Login e retorno do token JWT

### Usuários

* `GET /users/me` – Retorna dados do usuário logado
* `PUT /users/me` – Atualiza dados do usuário

### Linhas de Ônibus

* `GET /lines` – Lista todas as linhas
* `GET /lines/:id` – Detalhes de uma linha

### Paradas

* `GET /stops` – Lista todas as paradas
* `GET /stops/:id` – Detalhes de uma parada

### Rotas

* `GET /routes/:lineId` – Rota de uma linha específica (ordem das paradas)

### Horários

* `GET /schedules/:lineId` – Horários da linha por dia da semana

### Relatos

* `POST /reports` – Cria um relato
* `GET /reports` – Lista relatos recentes

### Feedback

* `POST /feedbacks` – Envio de feedback do app

---

## Segurança

* Hash de senhas com bcrypt.
* Proteção de rotas com autenticação JWT.
* Validação de entrada com middleware.
* Uso de CORS com domínios específicos em produção.

---

## Integração com Front-End

* Comunicação via JSON.
* Cabeçalhos de autenticação `Authorization: Bearer <token>`.
* Códigos HTTP padronizados (200, 201, 400, 401, 404, 500).

---

## Scripts e Comandos

* `npm run dev` – Iniciar servidor em desenvolvimento com nodemon
* `npx prisma generate` – Gerar cliente Prisma
* `npx prisma migrate dev` – Executar migrações locais
* `npm run build` – Compilar aplicação para produção

---

## Escalabilidade e Futuro

* Adição de cache com Redis (para rotas/históricos).
* Suporte a notificações via WebSocket.
* Integração com dados abertos de transporte urbano.
* Dashboard administrativo para análise de relatos e uso.

---

## Conclusão

O back-end do UrbanGo é modular, seguro e pensado para crescer junto com o uso do aplicativo em diferentes cidades. Ele fornece todas as bases para um sistema confiável e responsivo ao usuário, respeitando boas práticas de desenvolvimento, segurança e performance.
