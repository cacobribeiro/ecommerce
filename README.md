# Caminho do Ser

Monorepo com **frontend React** e **backend Node.js** para o site de yoga “Caminho do Ser”. O foco é oferecer aulas gravadas e ao vivo com uma experiência acolhedora, moderna e alinhada ao autoconhecimento.

## ✨ Visão geral

- **Home** com proposta, agenda em destaque, aulas gravadas, planos e loja.
- **Agenda** com informações das turmas ao vivo e formulário para aulas particulares.
- **Gravadas** com catálogo e páginas por categoria.
- **Loja** com mandalas (prévia).
- **Contato** com formulário e dados principais.
- **Login/Cadastro** com área logada simples.
- **Admin** para atualizar imagens e preços sem alterar o código.

## 🗂 Estrutura de pastas

```
./
├── backend
│   ├── src
│   └── tests
└── frontend
    ├── src
    └── public
```

## 🧰 Pré-requisitos

- Node.js 18+
- npm 9+

## 🔧 Configuração inicial

```bash
npm install
```

### Backend

Crie o arquivo `backend/.env` com:

```
PORT=4000
JWT_SECRET=troque-este-valor
ADMIN_USER=defina-um-login
ADMIN_PASS=defina-uma-senha
```

### Frontend

Crie o arquivo `frontend/.env` (opcional):

```
VITE_API_URL=http://localhost:4000
```

## ▶️ Executando localmente

Em terminais separados:

```bash
npm run dev:backend
```

```bash
npm run dev:frontend
```

Acesse: `http://localhost:5173`

## 🧪 Testes (Jest)

```bash
npm test
```

## ✅ ESLint

```bash
npm run lint
```

## 🔐 Fluxo de autenticação

1. O usuário autentica em `/api/login`.
2. O backend gera um **JWT**.
3. O frontend usa o token para exibir a área logada.

> Credenciais de exemplo:
>
> - **E-mail:** `lara@yoga.com`
> - **Senha:** `123456`

## ���️ Admin (imagens e preços)

1. Acesse `/admin`.
2. Informe o login e senha definidos no backend em `ADMIN_USER` e `ADMIN_PASS`.
3. Atualize as imagens e os preços.

> As alterações ficam em memória (reinicia ao reiniciar o backend). Para persistência real, use um storage (S3, Cloudinary) e banco.

## ��� Endpoints principais

- `POST /api/login` (login)
- `POST /api/register` (cadastro)
- `GET /api/profile` (dados da conta)
- `GET /api/site-config` (configurações do site)
- `PUT /api/admin/assets` (atualizar imagens)
- `PUT /api/admin/pricing` (atualizar preços)
- `POST /api/private-lessons` (formulário aulas particulares)
- `POST /api/contact` (contato)

## ♻️ Reutilização de componentes

O frontend organiza componentes reutilizáveis (header, footer, cards, botões, tabelas) para manter consistência visual e facilitar evolução.

## ☁️ Deploy (opções gratuitas)

### Frontend (Vercel - recomendado)

1. Crie um novo projeto apontando para este repositório.
2. Defina a **pasta do projeto** como `frontend` (root directory).
3. Configure:
   - **Build command:** `npm run build`
   - **Output:** `dist`
4. Defina a variável `VITE_API_URL` apontando para a URL do backend publicado.

> Este repositório já inclui `frontend/vercel.json` com a configuração padrão do Vite.

### Backend (Render - recomendado)

1. Crie um novo serviço apontando para a pasta `backend`.
2. Configure:
   - **Start command:** `npm run start`
3. Defina as variáveis de ambiente:
   - `PORT=4000`
   - `JWT_SECRET=troque-este-valor`
   - `ADMIN_USER=defina-um-login`
   - `ADMIN_PASS=defina-uma-senha`

> Este repositório já inclui `render.yaml` com o serviço de API.

> GitHub Pages hospeda apenas arquivos estáticos, então funciona somente para o frontend. Para o backend é necessário um serviço separado.
