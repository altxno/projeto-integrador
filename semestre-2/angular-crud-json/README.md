# Ateliê — mapa rápido para apresentação

## O que é

Sistema web acadêmico para artistas organizarem clientes e comissões: cadastrar, listar, editar, excluir e consultar dados. A interface é Angular 19; a API de demonstração é JSON Server e salva em `backend/db.json`.

## Mapa do projeto

```text
angular-crud-json/
├── backend/
│   └── db.json                         # Dados locais: usuarios, clientes, pedidos
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/auth.guard.ts    # Bloqueia rotas internas sem sessão
│   │   │   ├── models/                 # Formatos TypeScript dos dados
│   │   │   ├── services/               # Chamadas HTTP para a API
│   │   │   └── validators/              # Regra personalizada de CPF
│   │   ├── features/
│   │   │   ├── auth/                    # Login, registro e perfil
│   │   │   ├── clientes/                # Lista e formulário de clientes
│   │   │   └── pedidos/                 # Lista, formulário e detalhes
│   │   ├── layout/
│   │   │   ├── app-layout/              # Estrutura comum + área da rota atual
│   │   │   ├── header/                  # Caminho da página e usuário atual
│   │   │   └── sidebar/                 # Navegação e logout
│   │   ├── app.routes.ts                # URLs e componentes correspondentes
│   │   └── app.config.ts                # Configuração global da aplicação
│   ├── styles.css                       # Estilos e paleta globais
│   └── index.html                       # Página base carregada pelo navegador
├── angular.json / tsconfig*.json        # Configuração de build e TypeScript
├── package.json                         # Dependências e comandos npm
├── README.md                            # Este mapa
└── README.md                            # Mapa de apresentação
```

Cada componente de tela costuma ter `.ts` (comportamento), `.html` (estrutura visual) e `.css` (estilo). Os arquivos `*.spec.ts` seriam testes automatizados; atualmente não há testes de componente no projeto.

## Responsabilidades principais

| Parte | Responsabilidade |
|---|---|
| `features` | Telas e interações de login, clientes e pedidos/comissões |
| `core/services` | Enviar `GET`, `POST`, `PUT` e `DELETE` à API |
| `core/models` | Definir os campos de Cliente, Pedido e Usuário no TypeScript |
| `core/guards` | Redirecionar para login se não houver usuário conectado |
| `core/validators` | Validar o CPF no formulário Angular |
| `layout` | Reaproveitar header, sidebar e área de conteúdo entre rotas |
| `backend/db.json` | Guardar os dados da API local simulada |

## Fluxo dos dados

```text
Tela HTML → componente TypeScript → serviço Angular (HttpClient)
         → HTTP/JSON → JSON Server → backend/db.json
         ← resposta ← Observable/subscribe ←
```

O componente controla a tela e chama um serviço; o serviço conversa com a API. A tela não lê `db.json` diretamente. JSON é o formato dos dados enviados e recebidos.

## CPF: de onde vem e como funciona

- O campo está no template `features/clientes/form/clientes-form.component.html` como `formControlName="cpf"`.
- O formulário reativo é criado no TypeScript com `FormBuilder` e `fb.group(...)` em `clientes-form.component.ts`.
- O controle `cpf` recebe `[Validators.required, validarCpf]`; o import de `validarCpf` aponta para `core/validators/cpf.validator.ts`.
- O Angular executa esses validadores enquanto o valor do campo muda. `Validators.required` trata vazio; `validarCpf` verifica o formato e os dígitos.
- `validarCpf` limpa caracteres que não são números, exige 11 dígitos, rejeita números repetidos e calcula os dois dígitos verificadores com somas ponderadas e módulo 11.
- `null` significa “sem erro”; `{ cpfInvalido: true }` marca erro. O template usa `hasError('cpfInvalido')` para mostrar a mensagem.
- Ao salvar, o componente confere `form.invalid`; se inválido, não envia e marca os campos como tocados para exibir os erros. O CPF é enviado sem pontuação.
- Essa validação é só no frontend: ajuda quem preenche, mas pode ser contornada. O JSON Server não valida o CPF nem fornece regras de segurança.

## Funcionalidades e dados

- **Clientes:** nome, CPF, e-mail e telefone; busca, cadastro, edição e exclusão.
- **Pedidos/comissões:** título, descrição, cliente, categoria artística, valor, prazo e status; busca, filtro, cadastro, edição, consulta em diálogo e exclusão.
- Cada cliente e pedido guarda `usuarioId`; pedidos também guardam `clienteId` e `clienteNome`.
- As telas filtram os registros pelo usuário conectado. Com JSON Server, isso organiza a demonstração, mas não é autorização segura no servidor.
- Login compara e-mail/senha consultando `/usuarios` e mantém a sessão no `localStorage`. As senhas do `db.json` estão em texto simples: não usar com dados reais.
- A bolinha de perfil abre `/perfil`, onde é possível alterar nome, e-mail e, opcionalmente, senha. O sistema rejeita e-mail já usado por outra conta e mantém a sessão atualizada.
- A tela/rota de registro ainda consta no código (`/registro`). A decisão de desativar cadastro de usuário não está aplicada nesta cópia.
- O cartão “Faturamento Total” soma valores dos pedidos; não significa que foram pagos.

## Rotas principais

| URL | Tela |
|---|---|
| `/login` | Entrar |
| `/pedidos` | Listar e filtrar comissões |
| `/pedidos/novo` | Criar comissão |
| `/pedidos/editar/:id` | Editar comissão |
| `/clientes` | Listar e pesquisar clientes |
| `/clientes/novo` | Cadastrar cliente |
| `/clientes/editar/:id` | Editar cliente |
| `/perfil` | Editar nome, e-mail e senha da conta atual |
| `/registro` | Criar usuário (rota ainda ativa) |

As rotas ficam em `src/app/app.routes.ts`. Clientes e pedidos usam o `AppLayout`; o `authGuard` protege a área interna.

## Requisitos e como executar

- Node.js compatível com Angular 19.2: `^18.19.1`, `^20.11.1` ou `^22.0.0`; npm.
- Na pasta do projeto, execute `npm install` uma vez.
- Terminal 1: `npm run server` (JSON Server em `http://localhost:3000`).
- Terminal 2: `npm start` (Angular em `http://localhost:4200`).
- Conta demonstrativa: `artista@atelie.com` / `123456`.

Comandos: `npm run build` compila; `npm test -- --watch=false` tenta rodar testes, mas não há arquivos de teste atualmente.

## Frase curta para explicar a arquitetura

> “A interface é dividida por funcionalidades. Os componentes cuidam das telas e formulários; os serviços Angular centralizam as chamadas HTTP; o JSON Server oferece uma API REST de demonstração e persiste os dados em `db.json`.”

## Limites importantes

É um protótipo acadêmico. Não há backend próprio, banco de dados de produção, hash de senha ou autorização real. O filtro por `usuarioId`, o login no frontend e o `localStorage` não protegem os dados contra chamadas diretas à API.
