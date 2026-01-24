# Yoga em Movimento

Projeto monorepo com **frontend React** e **backend Node.js** para uma plataforma de aulas de yoga com planos, área do aluno, agendamentos e atualizações em tempo real via WebSocket.

## ✨ Visão geral

- **Home** com proposta e CTA para planos.
- **Planos** com regras de negócio (pagamentos antecipados e cancelamento até 2h antes).
- **Área do aluno** com perfil, plano contratado e agendamentos.
- **Agendamento** com confirmação em tempo real e aviso por e-mail (opcional via SMTP).
- **Realtime** com Socket.IO autenticado por JWT.

## ✅ Regras de negócio implementadas

- Aulas **em grupo**: R$ 150/mês (1x/semana) ou R$ 300/mês (2x/semana).
- Aulas **personal**: R$ 300/mês (1x/semana) ou R$ 600/mês (2x/semana).
- **Cancelamento** permitido apenas até 2h antes da aula.
- **Pagamento antecipado** de todas as mensalidades.
- Aulas realizadas via **Google Meet** (link enviado após confirmação).

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

> O comando acima instala as dependências de ambos os projetos via workspaces.

### Backend

Crie o arquivo `backend/.env` (opcional para SMTP) com:

```
PORT=4000
JWT_SECRET=troque-este-valor
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=agendamentos@yoga.com
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
3. O frontend usa o token nas requisições e na conexão WebSocket.

> Credenciais de exemplo:
> - **E-mail:** `lara@yoga.com`
> - **Senha:** `123456`

## 📡 WebSocket em tempo real

- O frontend conecta no Socket.IO com o token do usuário.
- Eventos de agendamento são enviados para a sala do usuário.

## ♻️ Reutilização de componentes

O frontend organiza componentes reutilizáveis como botões, cards e seções para manter consistência visual.

## 📌 Próximos passos sugeridos

- Integração real com Google Calendar.
- Integração com gateway de pagamentos.
- Deploy em ambientes separados (Vercel + Render, por exemplo).

## ☁️ Deploy (opções gratuitas)

### Frontend (Vercel - recomendado)

1. Crie um novo projeto apontando para este repositório.
2. Defina a **pasta do projeto** como `frontend` (root directory).
3. Configure:
   - **Build command:** `npm run build`
   - **Output:** `dist`
4. Defina a variável `VITE_API_URL` apontando para a URL do backend publicado.

> Este repositório já inclui `frontend/vercel.json` com a configuração padrão do Vite.

### Backend (Render ou Railway)

1. Crie um novo serviço apontando para a pasta `backend`.
2. Configure:
   - **Start command:** `npm run start`
3. Defina as variáveis de ambiente:
   - `PORT=4000`
   - `JWT_SECRET=troque-este-valor`
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` (opcionais)

> GitHub Pages hospeda apenas arquivos estáticos, então funciona somente para o frontend. Para o backend com WebSocket é necessário um serviço separado.
