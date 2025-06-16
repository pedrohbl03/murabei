# Murabei FullStack Test

Este repositório contém uma aplicação fullstack composta por backend em Python (Flask) e frontend em Next.js, ambos orquestrados via Docker Compose. O objetivo é listar, filtrar livros, autores e assuntos, utilizando uma base SQLite3.

## Estrutura do Projeto

```
senior/
  _docker-compose/      # Arquivos de orquestração Docker
  backend/              # API Flask + SQLite3
  frontend/             # Aplicação Next.js
```

## Tecnologias Utilizadas

- Python 3 + Flask
- SQLite3
- Next.js 13+ (React)
- Docker & Docker Compose
- Cypress (testes e2e)
- shadcn/ui (componentes UI)

## Como rodar o projeto

1. **Clone o repositório**
   ```sh
   git clone <url-do-repo>
   cd senior
   ```

2. **Build do backend**
   ```sh
   cd backend
   bash build.bash
   cd ..
   ```

3. **Build do frontend**
   ```sh
   cd frontend
   bash build.sh
   cd ..
   ```

4. **Suba todos os serviços**
   ```sh
   cd _docker-compose
   bash docker-up.bash
   ```

5. **Acesse o frontend**
   - Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Desenvolvimento

- O frontend está em [`frontend/codes`](frontend/codes), usando Next.js 14.
- O backend está em [`backend/app.py`](backend/app.py).
- O orquestrador está em [`_docker-compose/docker-compose.yml`](_docker-compose/docker-compose.yml).

### Scripts úteis

- Build do frontend: `frontend/build.sh`
- Build do backend: `backend/build.bash`
- Subir containers: `_docker-compose/docker-up.bash`

## Testes

- Testes end-to-end com Cypress: veja [`frontend/codes/cypress.config.ts`](frontend/codes/cypress.config.ts).
- Para rodar os testes:
  ```sh
  cd frontend/codes
  npx cypress open
  ```

## Funcionalidades

- Listagem de livros, autores e editoras
- Filtros acumulativos e independentes (ex: título + editora)
- Componentes reutilizáveis com shadcn/ui
- Gerenciamento de estado escalável
- Debounce nos filtros para performance
- Tratamento de estados vazios

## Critérios Técnicos

- Componentização e reutilização
- Organização e clareza de código
- Clean Code e DRY
- Testes automatizados (unitários e e2e)
- Deploy via Docker

## Docker

Todo o projeto está completamente dockerizado para facilitar a execução e desenvolvimento:

- Frontend e backend possuem seus próprios Dockerfiles
- Os containers são orquestrados via Docker Compose
- Configurações de rede isoladas entre os containers
- Volumes persistentes para o banco de dados

Para verificar os logs dos containers:
```sh
docker-compose logs -f frontend
docker-compose logs -f backend
```

---

> Projeto para avaliação técnica da Murabei Data Science.