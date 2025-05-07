
# Auth User Management System - Backend

Este é o backend do sistema de gerenciamento de usuários com autenticação (Auth User Management System). A aplicação foi desenvolvida com **Node.js**, **Express**, **Prisma ORM** e **PostgreSQL**, e fornece uma API RESTful com autenticação via JWT e controle de acesso por perfil de usuário (`ADMIN` e `VISUALIZADOR`).

## ⚙️ Funcionalidades

- Autenticação de usuários via JWT
- Controle de acesso com middleware por tipo de usuário
- CRUD completo de usuários
- Integração com banco de dados PostgreSQL
- Migrações e modelo de dados gerenciados com Prisma

## 🧪 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Docker](https://www.docker.com/)

## 🌐 Deploy

O backend está em produção com deploy automático na [Render](https://render.com/).

🔗 **API de Produção:** [https://auth-user-management-system-api.onrender.com](https://auth-user-management-system-api.onrender.com)

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/andersonvlidio/auth-user-management-system-api.git
cd auth-user-management-system-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` com o seguinte conteúdo:

```env
DATABASE_URL=postgresql://<usuario>:<senha>@<host>:<porta>/<database>
JWT_SECRET=suachavesecreta
```

### 4. Executar localmente


####  Docker Compose:

```bash
docker-compose up --build
```

## 🛠️ API - Rotas disponíveis

Todas as rotas estão baseadas na URL `/api`.

| Método | Rota             | Descrição                                      | Acesso                  |
|--------|------------------|-----------------------------------------------|-------------------------|
| POST   | `/api/login`      | Autenticação e geração de token JWT          | Público                 |
| GET    | `/api/users`     | Listagem de usuários                          | ADMIN e VISUALIZADOR    |            |
| POST   | `/api/users`     | Criação de usuário                            | ADMIN                   |
| PUT    | `/api/auth/users/:id` | Atualização de dados de um usuário            | ADMIN ou o próprio usuário |
| DELETE | `/api/users/delete/:id` | Remoção de usuário                            | ADMIN                   |
| GET    | `/api/auth/profile/:id`   | Retorna os dados do usuário autenticado       | Usuário logado          |

> 🔒 Todas as rotas (exceto login) requerem token JWT válido no header:  
> `Authorization: Bearer <token>`

## 📁 Estrutura de Pastas

```bash
prisma/
src/
├── controllers/      
├── middlewares/      
├── routes/           
├── utils/

```