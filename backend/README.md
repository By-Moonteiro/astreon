<div align="center">

<img src="../docs/assets/logo.svg" alt="Astreon" width="520"/>

### API de gerenciamento de treinos — construída para durar

[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
![Swagger](https://img.shields.io/badge/Swagger-OAS3-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Scalar](https://img.shields.io/badge/Scalar-API_Docs-6366f1?style=for-the-badge)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>

---

## 📚 Sobre

API REST para gerenciamento de fichas de treino, desenvolvida com foco em aprendizado prático de NestJS, arquitetura backend e boas práticas.

> Repositório público, evolui junto com meu aprendizado. Sinta-se livre para explorar.

---

## 🎯 Funcionalidades

- [x] Autenticação com JWT
- [x] Cadastro e gerenciamento de usuários
- [x] Rotas protegidas com Guards

---

## 🏗️ Arquitetura

<details>
<summary>Ver estrutura de arquivos</summary>

```
src/
├── main.ts
├── app.module.ts
├── auth/                        # Módulo de autenticação
│   ├── decorators/              # @CurrentUser e outros
│   ├── dtos/
│   ├── guards/                  # JwtAuthGuard & JwtRefreshGuard
│   ├── interceptors/            # SetCookie Interceptor
│   ├── strategy/                # JWT Strategies (Passport)
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── users/
├── exercises/
├── prisma/                      # Módulo compartilhado do Prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── test/
```

> Com exceção de `auth/` e `prisma/`, todos os módulos seguem a estrutura padrão: controller, service, module, dtos/, repositories/, entities/ e \*.spec.ts para testes unitários.

</details>

---

## 🚀 Como Executar

### Pré-requisitos (localmente)

- Node.js 24 LTS
- pnpm
- Docker e Docker Compose

### Setup

**1. Entre na pasta:**

```bash
cd backend
```

**2. Instale as dependências:**

```bash
pnpm install
```

**3. Configure as variáveis de ambiente:**

```bash
cp .env.example .env
```

**4. Suba o banco com Docker:**

```bash
docker compose up -d
```

**5. Gere o Prisma Client e rode as migrations:**

```bash
pnpm prisma:migrate
```

**6. Inicie em desenvolvimento:**

```bash
pnpm start:dev
```

✅ API disponível em `https://api.astreon.app/`  
✅ Documentação interativa em `https://api.astreon.app/docs`

---

## 📡 Endpoints

### Auth

| Método | Rota             | Descrição                                           | Auth |
| ------ | ---------------- | --------------------------------------------------- | ---- |
| `POST` | `/auth/register` | Registrar usuário                                   | ❌   |
| `POST` | `/auth/login`    | Login                                               | ❌   |
| `POST` | `/auth/refresh`  | Gera um novo access e refresh token                 | ✅   |
| `POST` | `/auth/logout`   | Invalida o refresh token após o usuário desconectar | ✅   |

### Users

| Método   | Rota          | Descrição         | Auth |
| -------- | ------------- | ----------------- | ---- |
| `GET`    | `/users/me`   | Perfil do usuário | ✅   |
| `PATCH`  | `/users/edit` | Editar usuário    | ✅   |
| `DELETE` | `/users/`     | Apagar usuário    | ✅   |

### Exercises

| Método   | Rota                                 | Descrição                                   | Auth |
| -------- | ------------------------------------ | ------------------------------------------- | ---- |
| `POST`   | `/exercise/`                         | Registrar exercício                         | ❌   |
| `GET`    | `/exercise/`                         | Buscar todos os exercícios                  | ❌   |
| `GET`    | `/exercise?name=...&muscleGroup=...` | Buscar por nome ou grupo muscular (ou os 2) | ❌   |
| `PATCH`  | `/exercise/:name`                    | Editar exercício                            | ❌   |
| `DELETE` | `/exercise/:name`                    | Apagar exercício                            | ❌   |

---

## 📝 Variáveis de Ambiente (localmente)

```env
# Banco de dados
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=astreon

# Prisma
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/astreon?schema=public"
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=sua_chave_secreta
JWT_REFRESH_SECRET=um_secret_diferente_e_longo_aqui

# App
PORT=3333
```

---

## 🐳 Docker

```bash
# Subir ambiente
docker compose up -d

# Parar
docker compose down

# Resetar banco (apaga dados)
docker compose down -v && docker compose up -d
```

---

## 📖 Aprendizados

- [x] Arquitetura modular com NestJS
- [x] ORM com Prisma + PostgreSQL
- [x] Ambiente isolado com Docker
- [x] Autenticação JWT com Guards e Decorators
- [x] Validação com class-validator
- [x] Documentação da API com Swagger + Scalar
- [x] Uso de ferramentas de IA (Claude, Copilot) como apoio no aprendizado
- [x] Refresh token rotation
- [x] Armazenamento de tokens por HttpOnly Cookies
- [x] Interceptors no Nest
- [x] Deploy com Render

---
