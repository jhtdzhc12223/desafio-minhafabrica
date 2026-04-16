# 🏭 Desafio Técnico - MinhaFabrica

Aplicação Full Stack desenvolvida para o processo seletivo de **Assistente de Desenvolvimento**.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![Next.js](https://img.shields.io/badge/Next.js-14+-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

## ✨ Funcionalidades Implementadas

- 🔐 **Autenticação JWT:** Login seguro com senha criptografada (Bcrypt).
- 👥 **CRUD de Usuários:** Cadastro, edição, listagem e exclusão (acesso restrito a administradores).
- 📦 **CRUD de Produtos:** Controle de estoque, preço, descrição e categoria.
- 📊 **Dashboard:** Contadores dinâmicos de total de usuários e produtos cadastrados.
- 🛡️ **Arquitetura Limpa:** Separação clara entre Controllers, Services e Repositories.
- 🎨 **UI Moderna:** Interface responsiva com Tailwind CSS e componentes estilizados.

## 🛠️ Stack Tecnológica

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Banco de Dados:** MongoDB (Atlas) + Mongoose ODM
- **Segurança:** JWT, Bcrypt
- **Validação:** Lógica de validação customizada em Services

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **HTTP Client:** Axios
- **Gerenciamento de Estado:** React Hooks (useState, useEffect)

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (geralmente instalado com o Node)
- **Conta no MongoDB Atlas** (gratuita) **ou** MongoDB rodando localmente (Docker/Local)

---

### 1. Clonagem e Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/desafio-minhafabrica.git
cd desafio-minhafabrica

# Instale as dependências do Backend
cd backend
npm install

# Instale as dependências do Frontend
cd ../frontend
npm install