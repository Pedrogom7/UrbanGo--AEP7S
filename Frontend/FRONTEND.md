# Documentação do Front-End - UrbanGo

## Visão Geral

Este documento descreve a arquitetura, tecnologias e estrutura do front-end do UrbanGo, um aplicativo web focado em mobilidade urbana inteligente. O foco principal é fornecer uma interface intuitiva, acessível e responsiva para que os usuários possam consultar informações sobre o transporte público de forma prática e eficiente.

---

## Tecnologias Utilizadas

* **React.js**: Biblioteca JavaScript para construção de interfaces reativas.
* **Vite**: Ferramenta de build para desenvolvimento rápido com suporte a HMR.
* **Tailwind CSS**: Framework de utilitários CSS para criação de layouts responsivos.
* **Axios**: Cliente HTTP para comunicação com o back-end via API REST.
* **React Router DOM**: Controle de rotas SPA.
* **Google Maps API**: Integração de geolocalização e mapas interativos.

---

## Estrutura de Pastas

```
/src
├── assets/            # Imagens, logos, ícones, fontes
├── components/        # Componentes reutilizáveis (Botões, Cards, Header, etc)
├── pages/             # Páginas principais (Home, Linhas, Relatar, Sobre)
├── services/          # Serviços de integração com APIs (axios)
├── contexts/          # Context API para autenticação e dados globais
├── hooks/             # Hooks personalizados (ex: useLocation)
├── routes/            # Definição das rotas do app
├── App.jsx            # Componente principal
├── main.jsx           # Ponto de entrada da aplicação
```

---

## Funcionalidades Principais

### 1. **Consulta de Horários em Tempo Real**

* Consulta de horários por linha de ônibus.
* Atualização automática com base na localização e na hora.
* Exibição de horários estimados de chegada nas paradas.

### 2. **Sugestão de Rotas**

* Input de origem e destino.
* Sugestão de melhores linhas e conexões com base na API de rotas.

### 3. **Relatos Colaborativos**

* Formulário para envio de relatos (atrasos, lotação, cancelamento).
* Exibição de relatos no mapa em tempo real.

### 4. **Geolocalização com Mapas**

* Mapa interativo com pontos de parada, rotas e ônibus em movimento.
* Visualização de onde o usuário está e das linhas próximas.

### 5. **Login/Registro de Usuário**

* Autenticação por email e senha.
* Criação de conta com validação de dados.
* Tela de perfil e histórico de relatos.

---

## Design e Usabilidade

* **Responsivo**: Compatível com smartphones, tablets e desktops.
* **Acessível**: Contrastes adequados, navegação por teclado, textos alternativos.
* **Minimalista**: Foco na simplicidade, com layout limpo e foco no usuário final.

---

## Integração com Back-End

* Todas as comunicações são feitas via requisições RESTful.
* As credenciais são armazenadas em contexto e localStorage com JWT.
* Requisições protegidas com headers de autorização.

---

## Telas do Aplicativo

1. **Tela Inicial (Home)**: Introdução ao app e chamada para ação.
2. **Linhas**: Busca e listagem de linhas de ônibus.
3. **Detalhes da Linha**: Exibição de paradas, horários e mapa.
4. **Relatar Problema**: Formulário e histórico de relatos enviados.
5. **Sobre/Contato**: Informações sobre o projeto, ODS e meios de contato.
6. **Login/Registro**: Acesso ao sistema e gerenciamento de perfil.

---

## Considerações Finais

O front-end do UrbanGo é projetado para ser escalável, modular e focado na experiência do usuário. Ele deve permitir a integração com qualquer sistema municipal de transporte que ofereça API ou dados públicos, visando futura expansão para outras cidades além de Maringá.

Para contribuir ou manter o projeto, recomenda-se seguir boas práticas de código, usar versionamento Git e validar todas as integrações com o back-end antes da publicação.
