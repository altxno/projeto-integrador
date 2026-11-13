# Ateliê — Gestão de Pedidos e Clientes

Aplicação web para artistas independentes organizarem clientes e pedidos de trabalhos artísticos. O sistema oferece operações CRUD para clientes e pedidos, separa os registros por conta, e inclui autenticação demonstrativa, busca, filtros por status e visualização dos detalhes de um pedido.

> Este projeto é acadêmico e utiliza o JSON Server como API REST simulada. A autenticação e o armazenamento de senhas não são apropriados para produção.

## Tecnologias

- Angular 19.2 e TypeScript
- Angular Material e Angular CDK
- JSON Server para simular a API REST
- RxJS para lidar com respostas assíncronas HTTP
- Node.js e npm para executar o ambiente de desenvolvimento

## Requisitos

- Node.js compatível com Angular 19.2: `^18.19.1`, `^20.11.1` ou `^22.0.0`.
- npm, instalado junto com o Node.js.
- Acesso a um terminal para executar a aplicação e a API em processos separados.

Consulte a [tabela oficial de compatibilidade do Angular](https://angular.dev/reference/versions) para detalhes sobre Node.js, TypeScript e RxJS.

## Instalação e execução

Na pasta `semestre-2/angular-crud-json`, instale as dependências:

```bash
npm install
```

Inicie a API em um terminal:

```bash
npm run server
```

O JSON Server lê `backend/db.json` e disponibiliza os recursos na porta `3000`.

Em outro terminal, na mesma pasta, inicie o Angular:

```bash
npm start
```

A aplicação fica disponível em `http://localhost:4200`.

### Conta de demonstração

- E-mail: `artista@atelie.com`
- Senha: `123456`

A tela de login possui um botão que preenche esses dados automaticamente.

## Funcionalidades

### Clientes

- Listagem com busca por nome, e-mail ou CPF.
- Os clientes são associados à conta do artista conectado.
- Cadastro, edição e exclusão.
- Validação de campos obrigatórios, formato de e-mail, limites de caracteres e dígitos verificadores do CPF.
- Exibição do CPF com formatação; o valor enviado à API é normalizado para conter somente números.

### Pedidos e comissões

- Listagem com busca por título, cliente ou categoria.
- Os pedidos são associados à conta do artista conectado.
- Indicadores de quantidade total, pendências, pedidos em andamento, pedidos concluídos e soma dos valores registrados.
- Filtro de status pela lista e pelos indicadores.
- Cadastro e edição com título, descrição, cliente, categoria, valor, prazo e status.
- Ações para visualizar os detalhes em um diálogo somente leitura, editar e excluir.

### Acesso

- Login consultando usuários registrados na API simulada.
- Persistência do usuário atual no `localStorage` para manter a sessão no navegador.
- Proteção das rotas internas por um guard de autenticação.
- Logout pela navegação lateral.

**Estado da criação de usuário:** a rota `/registro`, a tela e o link no login ainda estão ativos no código. Embora a decisão de produto seja manter a criação de usuário desligada por enquanto, essa alteração ainda precisa ser aplicada.

## Organização do código

```text
src/app/
├── core/
│   ├── guards/       # Proteção de rotas
│   ├── models/       # Formatos de Cliente, Pedido e Usuário
│   ├── services/     # Comunicação HTTP e autenticação
│   └── validators/   # Validação de CPF
├── features/
│   ├── auth/         # Login e registro
│   ├── clientes/     # Lista e formulário de clientes
│   └── pedidos/      # Lista, formulário e detalhes do pedido
└── layout/
    ├── app-layout/   # Estrutura compartilhada das telas internas
    ├── header/       # Caminho da página e usuário conectado
    └── sidebar/      # Navegação e ação de logout

backend/
└── db.json           # Dados locais usados pelo JSON Server
```

Os componentes são standalone e importam os módulos Angular e Material de que precisam. As páginas cuidam da interface, dos formulários e das interações; os serviços encapsulam as chamadas HTTP; os modelos descrevem os objetos trafegados entre frontend e API.

## Rotas principais

| Rota | Finalidade |
|---|---|
| `/login` | Acesso ao sistema |
| `/pedidos` | Lista de pedidos e comissões |
| `/pedidos/novo` | Cadastro de pedido |
| `/pedidos/editar/:id` | Edição de pedido existente |
| `/clientes` | Lista de clientes |
| `/clientes/novo` | Cadastro de cliente |
| `/clientes/editar/:id` | Edição de cliente existente |
| `/registro` | Criação de usuário (atualmente ativa no código) |

As páginas de pedidos e clientes são filhas do `AppLayout`, protegidas pelo `authGuard`. O layout mantém a sidebar e o header enquanto o conteúdo da rota muda.

## API simulada

O JSON Server converte as coleções de `backend/db.json` em endpoints REST na base `http://localhost:3000`:

| Recurso | Endpoint base |
|---|---|
| Usuários | `/usuarios` |
| Clientes | `/clientes` |
| Pedidos | `/pedidos` |

As operações usam `GET` para consultar, `POST` para criar, `PUT` para substituir/atualizar e `DELETE` para excluir. Os serviços correspondentes são `AuthService`, `ClientesService` e `PedidosService`.

O pedido guarda `clienteId` e também `clienteNome`. O ID mantém a referência ao cliente; o nome é armazenado junto ao pedido para facilitar sua apresentação na lista.

Clientes e pedidos também guardam `usuarioId`, identificando a conta proprietária. As listas e buscas por ID consultam os dados com esse identificador; ao criar ou editar, o frontend inclui o ID do usuário conectado.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor Angular de desenvolvimento |
| `npm run server` | Inicia o JSON Server na porta 3000 |
| `npm run build` | Compila a aplicação para distribuição |
| `npm test -- --watch=false` | Executa os testes unitários uma vez |

Atualmente não há arquivos `*.spec.ts` no projeto; por isso, o comando de testes informa que não encontrou entradas de teste. A compilação com `npm run build` foi executada com sucesso durante a preparação desta documentação.

## Limitações conhecidas

- O JSON Server é um armazenamento local de demonstração, sem banco de dados de produção.
- A senha dos usuários fica em texto simples no `db.json`; não há autenticação ou autorização real no servidor.
- O login compara as credenciais no frontend e usa o `localStorage` para persistir o estado de sessão.
- O isolamento por `usuarioId` é aplicado nas consultas e nas telas Angular. Como o JSON Server não tem regras de autorização, isso não impede alguém de chamar diretamente os endpoints de outra conta.
- A validação de CPF verifica os dígitos verificadores localmente, mas não confirma a existência do documento.
- O indicador chamado “Faturamento Total” soma os valores de todos os pedidos cadastrados, sem representar pagamentos recebidos.
- O README de semestre contém requisitos e informações gerais do projeto acadêmico; este arquivo documenta especificamente a aplicação Angular nesta pasta.
