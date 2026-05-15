<div align="center">

<img src="docs/assets/logo.svg" alt="Astreon" width="520"/>

# Astreon

### Plataforma de gerenciamento de treinos

![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow?style=for-the-badge)

</div>

## 🎯 Por que o Astreon existe?

Muitas academias não fornecem fichas estruturadas.
Alunos acabam registrando treinos em notas soltas, WhatsApp ou memória.

O Astreon nasce como uma tentativa de resolver esse problema
criando um sistema simples, pessoal e reutilizável de organização de treinos.

## 🧠 Documentação do Projeto

Antes de implementar features, o projeto foi melhor planejado e documentado.
Esses arquivos descrevem o **problema**, o **fluxo central** e as decisões de arquitetura.

| Documento                           | Descrição                           |
| ----------------------------------- | ----------------------------------- |
| [Overview](./docs/00-overview.md)   | Visão geral e objetivo do projeto   |
| [Problem](./docs/01-problem.md)     | Problema real que o Astreon resolve |
| [Core Flow](./docs/02-core-flow.md) | Fluxo principal do usuário          |
| [Entities](./docs/03-entities.md)   | Modelagem conceitual do domínio     |
| [Ideas](./docs/05-ideas.md)         | Ideias futuras e experimentações    |

> A documentação foi escrita a partir das minhas anotações pessoais e
> organizada com auxílio de IA para melhorar clareza e estrutura.

---

## 📦 Estrutura do Repositório

```
moon-fit/
├── backend/    # API REST com NestJS
├── frontend/   # Interface web com React + Vite
└── docs/       # Assets e documentação geral
```

---

| Parte    | Stack principal                    | README                                   |
| -------- | ---------------------------------- | ---------------------------------------- |
| Backend  | NestJS, PostgreSQL, Prisma, Docker | [backend/README.md](backend/README.md)   |
| Frontend | React, Vite, Tailwind, Shadcn      | [frontend/README.md](frontend/README.md) |

---

## 🗺️ Roadmap

- **Fase 1** — Base da API (auth, usuários, fichas) ← _atualmente_
- **Fase 2** — Testes e validações robustas
- **Fase 3** — Migração para Fastify ✅
- **Fase 4** — Frontend completo
- **Fase 5** — Deploy ✅ (Render & Vercel)
