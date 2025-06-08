# Documentação da API - UrbanGo

## Visão Geral

Este documento detalha os endpoints RESTful oferecidos pela aplicação UrbanGo. As APIs são organizadas em categorias e visam prover dados de transporte público urbano, gestão de usuários e relatórios colaborativos, permitindo uma integração eficiente com o front-end.

---

## Autenticação

Todas as rotas protegidas requerem o cabeçalho:

```
Authorization: Bearer <token>
```

### POST /auth/register

Cria um novo usuário.

* Body:

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

* Response: `201 Created`

### POST /auth/login

Realiza login e retorna token JWT.

* Body:

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

* Response:

```json
{
  "token": "<jwt-token>"
}
```

---

## Usuários

### GET /users/me

Retorna dados do usuário autenticado.

* Headers: Authorization
* Response: `200 OK`

### PUT /users/me

Atualiza os dados do usuário.

* Body (opcional):

```json
{
  "name": "Novo Nome"
}
```

---

## Linhas de Ônibus

### GET /lines

Lista todas as linhas de ônibus.

* Response:

```json
[
  { "id": 1, "nome": "Zona 01 - Terminal" },
  { "id": 2, "nome": "Zona 07 - Terminal" }
]
```

### GET /lines/\:id

Detalhes de uma linha específica.

* Response:

```json
{
  "id": 1,
  "nome": "Zona 01 - Terminal",
  "paradas": [ ... ],
  "horarios": [ ... ]
}
```

---

## Paradas

### GET /stops

Retorna todas as paradas de ônibus.

### GET /stops/\:id

Retorna dados de uma parada específica (nome, localização, linhas que passam).

---

## Rotas

### GET /routes/\:lineId

Retorna as paradas ordenadas de uma linha de ônibus.

---

## Horários

### GET /schedules/\:lineId

Retorna os horários da linha.

---

## Relatos

### POST /reports

Cria um relato colaborativo.

* Body:

```json
{
  "linhaId": 2,
  "tipo": "atraso",
  "mensagem": "Ônibus atrasado em 20 minutos",
  "localizacao": {
    "lat": -23.4201,
    "lng": -51.9331
  }
}
```

### GET /reports

Lista relatos recentes, ordenados por data.

---

## Feedback

### POST /feedbacks

Permite envio de sugestões ou críticas gerais sobre o app.

---

## Integração com APIs Externas

### Google Maps API

* Utilizada para conversão de coordenadas geográficas em nomes de locais (reverse geocoding).
* Auxilia na sugestão de rotas otimizadas com base na posição do usuário.
* Permite visualização em tempo real de rotas e localização de paradas no mapa.

### Outros Serviços (futuro)

* Possível integração com dados públicos de transporte (ex: GTFS) para obter horários oficiais em tempo real.
* APIs meteorológicas para informar clima nas regiões das rotas.

**Nota:** O uso de APIs externas depende de chaves de acesso (API Keys), que devem ser armazenadas em variáveis de ambiente e nunca expostas no front-end.

---

## Códigos de Resposta Comuns

* `200 OK` – Sucesso
* `201 Created` – Recurso criado
* `400 Bad Request` – Dados inválidos
* `401 Unauthorized` – Token inválido ou ausente
* `404 Not Found` – Recurso não encontrado
* `500 Internal Server Error` – Erro interno

---

## Observações Finais

* Todas as requisições devem ser feitas em `application/json`.
* As APIs estão prontas para expansão com cache, paginação e filtros.
* Para uso em produção, endpoints adicionais para administração (CRUD completo) poderão ser adicionados.
