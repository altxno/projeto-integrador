# Introdução ao projeto Ateliê

Este material apresenta o projeto para quem está começando a estudar desenvolvimento web. Ele explica primeiro as ideias básicas e depois mostra onde elas aparecem na aplicação. Os exemplos e os caminhos de arquivo correspondem ao código atual deste repositório.

## 1. O que este projeto faz

O Ateliê é um sistema web para artistas organizarem seus clientes e os pedidos de trabalhos artísticos recebidos. Depois de entrar, a pessoa pode cadastrar, consultar, editar e excluir esses registros. Cada cliente e cada pedido fica associado à conta de artista que o criou.

O projeto tem duas partes que trabalham juntas:

- **Frontend:** as telas que aparecem no navegador. Aqui ele foi feito com Angular 19.
- **Backend de demonstração:** um programa local que recebe requisições e lê ou grava dados. Aqui ele é o JSON Server, usando `backend/db.json` como armazenamento.

O Angular roda em `http://localhost:4200`; a API simulada roda em `http://localhost:3000`. A palavra `localhost` significa que os programas estão rodando na própria máquina.

## 2. Como funciona uma aplicação web

Quando você abre um site, o navegador pede arquivos e dados a programas chamados servidores. O navegador apresenta a interface e permite interagir; o servidor responde a pedidos, por exemplo, enviando uma lista de clientes.

Neste projeto, a tela de clientes não abre o arquivo `db.json` diretamente. Ela pede os dados ao serviço Angular. O serviço envia uma requisição HTTP ao JSON Server. O JSON Server lê o arquivo e devolve uma resposta. O componente recebe essa resposta e a mostra na tabela.

```text
Pessoa → navegador → tela Angular → serviço Angular
                                      ↓ requisição HTTP
Arquivo db.json ← JSON Server ← API local
```

Essa comunicação separada é importante: o navegador cuida da experiência visual; a API cuida de receber e devolver dados. Em aplicações reais, o backend também deve cuidar das regras de negócio, da segurança e do acesso ao banco.

### Frontend

**Frontend** é a parte com a qual a pessoa interage diretamente: textos, menus, formulários, tabelas, ícones e mensagens. Neste projeto, o frontend fica principalmente em `src/app/features` e `src/app/layout`.

### Backend

**Backend** é a parte executada fora da interface, que recebe requisições e trabalha com dados. O JSON Server ocupa esse papel de forma simplificada, mas o projeto não possui uma API própria feita em Express, Java, C# ou outro backend completo. O JSON Server é suficiente para praticar chamadas e operações CRUD localmente, mas não fornece autorização real por usuário.

## 3. Framework, biblioteca e Angular

Um **framework** é uma estrutura de desenvolvimento que organiza como uma aplicação é montada e executada. Angular oferece mecanismos para criar telas, organizar componentes, navegar por rotas, validar formulários e fazer requisições.

Uma **biblioteca** oferece ferramentas que a aplicação pode chamar quando precisa. O **Angular Material** é uma biblioteca visual: fornece campos, botões, tabelas, diálogos, ícones, menus e outros controles com comportamento e aparência consistentes. O Material não decide o que significa cadastrar um cliente; essa regra é escrita nos componentes e serviços do projeto.

O projeto usa Angular 19 e Angular Material. Os componentes Material aparecem nos templates com elementos como `mat-card`, `mat-form-field`, `matInput`, `mat-table` e `mat-icon`.

## 4. Os arquivos que formam uma tela Angular

Uma tela Angular costuma juntar três tipos de arquivo:

- **`.ts` — TypeScript:** estado e comportamento da tela, como carregar dados, filtrar uma lista ou salvar um formulário.
- **`.html` — template:** estrutura visual e conexão entre a tela e o código TypeScript.
- **`.css` — estilos:** cores, tamanhos, alinhamento e adaptação para diferentes larguras de tela.

Por exemplo, a lista de pedidos possui [pedidos-lista.component.ts](src/app/features/pedidos/lista/pedidos-lista.component.ts), [pedidos-lista.component.html](src/app/features/pedidos/lista/pedidos-lista.component.html) e [pedidos-lista.component.css](src/app/features/pedidos/lista/pedidos-lista.component.css). Juntos, eles formam um **componente**: uma parte da interface com uma responsabilidade definida.

O HTML usa expressões entre chaves duplas para mostrar valores do TypeScript, como `{{ totalPedidos }}`. Diretivas Angular, como `*ngIf` e `*ngFor`, controlam se um trecho aparece ou se repete. Eventos, como `(click)`, chamam métodos do componente. A sintaxe `[(ngModel)]` conecta um campo a uma propriedade, enquanto formulários reativos usam `[formGroup]` e `formControlName`.

### Componentes standalone

As telas deste projeto são **standalone**: cada componente importa os recursos de que precisa diretamente na declaração. Por exemplo, um componente que usa a tabela Material importa `MatTableModule`; um que usa formulários reativos importa `ReactiveFormsModule`.

Isso ajuda a identificar de onde vem cada elemento usado no template. O `imports` do componente é uma lista de dependências visuais e funcionais daquela parte da interface; não é a lista de arquivos que ele chama durante a execução.

## 5. Estrutura das pastas do aplicativo

```text
src/app/
├── core/
│   ├── guards/
│   ├── models/
│   ├── services/
│   └── validators/
├── features/
│   ├── auth/
│   ├── clientes/
│   └── pedidos/
└── layout/
    ├── app-layout/
    ├── header/
    └── sidebar/
```

### `features`

Agrupa as funções que a pessoa usa. `auth` contém login e registro; `clientes` contém lista e formulário de clientes; `pedidos` contém lista, formulário e diálogo de detalhes.

### `core`

Contém partes compartilhadas que não pertencem a uma única tela: formatos dos dados (`models`), serviços de API e autenticação (`services`), proteção de rotas (`guards`) e validação de CPF (`validators`).

### `layout`

Contém a estrutura repetida nas páginas autenticadas. O [AppLayoutComponent](src/app/layout/app-layout/app-layout.component.ts) organiza a sidebar, o header e o espaço de conteúdo. O `router-outlet` no template é o local onde o Angular encaixa a página selecionada pela rota.

O [SidebarComponent](src/app/layout/sidebar/sidebar.component.ts) oferece links e emite um evento quando a pessoa pede logout. O [HeaderComponent](src/app/layout/header/header.component.ts) recebe do layout o caminho atual e os dados do usuário e os apresenta.

## 6. Rotas: como a aplicação troca de página

Uma **rota** associa um endereço a uma tela. As rotas estão em [app.routes.ts](src/app/app.routes.ts). Por exemplo:

- `/login` abre o login.
- `/clientes` abre a lista de clientes.
- `/clientes/novo` abre o cadastro.
- `/clientes/editar/3` abre a edição do cliente de ID 3.
- `/pedidos` abre a lista de pedidos.
- `/pedidos/novo` abre o formulário de pedido.

O `RouterOutlet` mostra a página da rota atual sem precisar recarregar o site inteiro. Links Angular como `routerLink="/clientes"` pedem essa navegação.

Na rota de edição, `:id` é um **parâmetro**. O componente lê esse valor usando `ActivatedRoute`, busca o registro correspondente e preenche o formulário. A tela usa o mesmo componente para cadastro e edição; a presença do ID define qual modo está ativo.

As páginas internas ficam sob o `AppLayoutComponent` e usam o `authGuard`. O guard verifica se há um usuário marcado como conectado antes de permitir a navegação.

## 7. TypeScript e modelos de dados

TypeScript é uma linguagem baseada em JavaScript que permite declarar os tipos esperados de valores. Um **modelo** ou `interface` descreve os campos de um objeto; ele ajuda o editor e o compilador a encontrar erros, mas não cria a tabela do banco e não valida sozinho os dados recebidos em tempo de execução.

O modelo [Cliente](src/app/core/models/cliente.model.ts) descreve campos como `nome`, `cpf`, `email` e `telefone`. O modelo [Pedido](src/app/core/models/pedido.model.ts) descreve `titulo`, `descricao`, `clienteId`, `clienteNome`, `tipoArte`, `valor`, `dataEntrega`, `status` e `usuarioId`.

O `?` em `id?` significa que o campo pode estar ausente. Isso é útil porque um objeto novo ainda não tem ID; a API atribui um quando salva o registro.

O tipo `StatusPedido` limita status a uma lista conhecida: `Pendente`, `Em Andamento`, `Concluído` ou `Cancelado`. Assim, o código pode ser avisado se tentar usar uma grafia diferente.

## 8. JSON e os dados do projeto

**JSON** é um formato textual para representar dados estruturados. Ele usa objetos entre `{ }`, listas entre `[ ]`, pares `"campo": valor`, textos entre aspas e números sem aspas. É usado para trocar dados entre programas e também para armazená-los neste projeto.

O arquivo [backend/db.json](backend/db.json) tem três listas principais:

- `usuarios`: as contas usadas no login demonstrativo.
- `clientes`: pessoas atendidas pelo artista.
- `pedidos`: trabalhos artísticos associados a clientes.

Um objeto de cliente pode ser representado assim:

```json
{
  "id": "1",
  "usuarioId": "1",
  "nome": "Ana Souza",
  "cpf": "52998224725",
  "email": "ana@example.com",
  "telefone": "11999990000"
}
```

`id` identifica o cliente; `usuarioId` identifica a conta proprietária. Um pedido contém `clienteId` para indicar seu cliente e `usuarioId` para indicar o artista proprietário. O projeto também guarda `clienteNome` no pedido para facilitar a exibição. É uma duplicação de informação: se o nome do cliente mudar depois, o nome copiado no pedido não se atualiza automaticamente.

## 9. API e requisições HTTP

Uma **API** é uma interface que um programa oferece para outros programas solicitarem operações ou dados. A aplicação conversa com o JSON Server por uma API HTTP. As URLs que a API oferece são chamadas de **endpoints**.

O JSON Server cria endpoints a partir das coleções do `db.json`:

```text
http://localhost:3000/usuarios
http://localhost:3000/clientes
http://localhost:3000/pedidos
```

Os métodos HTTP mais importantes para o CRUD são:

| Método | Significado no CRUD | Exemplo |
|---|---|---|
| `GET` | Ler dados | Buscar `/clientes` |
| `POST` | Criar registro | Enviar um cliente para `/clientes` |
| `PUT` | Atualizar um registro completo | Enviar dados para `/clientes/1` |
| `DELETE` | Excluir registro | Remover `/clientes/1` |

Uma chamada `GET /clientes?usuarioId=1` pede à API os clientes cujo `usuarioId` é `1`. A parte após `?` é um **parâmetro de consulta**. O JSON Server aceita filtros por campos e retorna uma lista que satisfaz os filtros. A própria [documentação do JSON Server](https://github.com/typicode/json-server/blob/main/README.md) descreve esse comportamento.

## 10. JSON Server: o backend usado agora

O JSON Server é uma ferramenta que transforma um arquivo JSON em uma API para desenvolvimento. Neste repositório, o comando `npm run server` executa essa ferramenta apontando para `backend/db.json` na porta 3000.

Quando o frontend envia um `POST`, o JSON Server grava o item na coleção. Quando envia `GET`, lê e devolve os dados. Em caso de edição ou exclusão, muda o conteúdo local. É por isso que as mudanças continuam no arquivo mesmo após atualizar a página.

Esse backend é **simulado** porque não contém as regras de uma aplicação real, controle de acesso, banco de dados relacional ou autenticação segura. Ele serve para praticar a comunicação entre frontend e API. O Angular não deve ser considerado capaz de proteger dados de outros usuários por conta própria.

## 11. Serviços Angular: onde o HTTP fica

Um serviço é uma classe para compartilhar lógica entre componentes. Neste projeto, os serviços de clientes e pedidos concentram URLs e operações HTTP:

- [ClientesService](src/app/core/services/clientes.service.ts) fala com `/clientes`.
- [PedidosService](src/app/core/services/pedidos.service.ts) fala com `/pedidos`.
- [AuthService](src/app/core/services/auth.service.ts) lida com login, registro, sessão local e logout.

O `HttpClient` do Angular envia as requisições. Por exemplo, `http.get<Cliente[]>(url)` solicita uma lista de clientes e indica ao TypeScript que se espera uma lista desse modelo. O `<Cliente[]>` ajuda na checagem do código, mas não garante que a resposta recebida realmente tenha os campos corretos.

Os componentes recebem os serviços por **injeção de dependência**. Isso significa que o Angular cria ou localiza o serviço e o disponibiliza ao componente, evitando que cada tela tenha que construir seu próprio cliente HTTP. Nas listas, por exemplo, `inject(AuthService)` obtém o serviço que fornece o usuário conectado.

## 12. `Observable`: respostas que chegam depois

Uma requisição de rede demora um tempo. O código não deve presumir que os dados estarão disponíveis imediatamente. O Angular usa o **RxJS** e seu tipo `Observable` para representar respostas assíncronas.

O serviço retorna algo como `Observable<Pedido[]>`. O componente chama `subscribe()` e fornece funções para o resultado:

- `next`: executa quando a API respondeu com sucesso.
- `error`: executa se houve falha de rede ou resposta de erro.

Por isso as listas possuem um estado `carregando`. A tela mostra um indicador enquanto aguarda; quando a resposta chega, guarda a lista, calcula os indicadores e encerra o carregamento. Se não vier nenhum pedido, deve mostrar a mensagem de lista vazia. Se ocorrer erro, deve mostrar uma mensagem em vez de manter o indicador indefinidamente.

## 13. Como o CRUD de clientes funciona

### Listagem

O componente da lista chama `ClientesService.listar(usuarioId)`. A API devolve só os clientes daquela conta. A lista também mantém os dados filtrados pelo texto de busca, que pode comparar nome, e-mail ou CPF.

### Cadastro

O formulário reativo recebe nome, CPF, e-mail e telefone. Os validadores impedem envio de campos inválidos. O CPF é verificado pelo algoritmo dos dígitos verificadores e normalizado para somente números antes do envio. O componente acrescenta o `usuarioId` da sessão e chama `incluir()`, que executa `POST`.

### Edição

O ID na rota informa qual cliente editar. O componente pede ao serviço o registro com aquele ID **e** o `usuarioId` atual. Se a busca não encontrar correspondência, o registro não pertence à conta atual (ou não existe). Se encontrar, `patchValue()` preenche o formulário. Ao salvar, `editar()` executa uma verificação de proprietário e envia `PUT`.

### Exclusão

Após a confirmação, o serviço procura o registro com seu ID e proprietário antes de chamar `DELETE`. A tela também remove o item da lista já carregada para refletir a alteração imediatamente.

## 14. Como o CRUD de pedidos funciona

Um pedido contém título, descrição, cliente, categoria, valor, data de entrega e status. O formulário de pedido carrega os clientes da conta atual e os apresenta em um seletor. Assim, a pessoa escolhe um cliente em vez de digitar um ID manualmente.

Ao salvar, o componente encontra o cliente escolhido e monta o pedido com `clienteId`, `clienteNome` e o `usuarioId` conectado. O valor é convertido para número. Novo pedido usa `POST`; edição usa o ID da rota para localizar e carregar apenas um pedido pertencente à conta atual e depois executa `PUT`.

Na lista, a busca considera título, cliente ou categoria. Os filtros por status e os cartões de resumo são calculados somente sobre pedidos carregados para aquela conta. O botão de visualizar abre um diálogo somente leitura; editar navega ao formulário; excluir exige confirmação.

## 15. Como funciona a separação por usuário

O `AuthService` mantém o usuário atual. Cada usuário tem um `id`. Quando um cliente ou pedido é criado, o componente inclui esse valor como `usuarioId`. Por exemplo, um registro com `usuarioId: "b010"` pertence à conta de ID `b010`.

As listas usam `GET /clientes?usuarioId=b010` ou `GET /pedidos?usuarioId=b010`. Isso significa que a consulta da tela pede explicitamente os registros daquela conta. As buscas por ID incluem o `usuarioId`; se a API não retornar um registro, a tela considera que ele não está disponível para a conta atual.

Os registros de demonstração existentes foram atribuídos ao usuário de ID `1` (Artista Principal). Outra conta começa sem clientes e pedidos; ela verá apenas os registros criados por ela.

### Limite importante dessa separação

O filtro de `usuarioId` é útil para a aplicação acadêmica, mas não é uma proteção de segurança real. O JSON Server permite que alguém faça uma requisição diretamente e altere o parâmetro. Em um backend real, o servidor deve identificar a conta a partir de uma sessão ou token confiável e verificar a propriedade para cada leitura, edição e exclusão. Não deve confiar em um `usuarioId` enviado livremente pelo navegador.

## 16. Login e sessão

O login consulta a coleção `usuarios` e compara e-mail e senha. Quando há correspondência, o `AuthService` salva o usuário no `localStorage`, um espaço de armazenamento do navegador. O serviço também mantém o estado atual em um `BehaviorSubject`, que os componentes podem consultar.

Ao atualizar a página, o serviço tenta ler `usuario_logado` do `localStorage` para restaurar a sessão. Ao sair, remove esse valor e o usuário volta à tela de login. O guard usa a sessão para decidir se a pessoa pode entrar nas rotas internas.

No projeto atual, existe uma tela e uma rota `/registro`, com link na tela de login. O registro está ativo. Senhas ficam em texto simples no arquivo JSON e a comparação é feita no frontend; isso é somente para demonstração e não deve ser usado em produção.

## 17. Formulários e validação

Os formulários de clientes e pedidos usam **Reactive Forms**. O grupo de controles é criado no TypeScript com `FormBuilder`; cada campo tem um `formControlName` correspondente no HTML. Os `Validators` definem regras como obrigatório, tamanho mínimo/máximo, e-mail e valor mínimo.

Quando se tenta salvar um formulário inválido, `markAllAsTouched()` marca os campos como visitados para que as mensagens de erro apareçam. O CPF usa uma função própria em `core/validators/cpf.validator.ts`.

A validação do frontend ajuda a pessoa a preencher os dados corretamente, mas pode ser contornada. Em sistemas reais, o backend também precisa validar todos os dados antes de salvar.

## 18. Como iniciar e usar localmente

É necessário ter uma versão de Node.js compatível com Angular 19 e npm. A compatibilidade está na [documentação do Angular](https://angular.dev/reference/versions).

Dentro de `semestre-2/angular-crud-json`, instale as dependências uma vez:

```bash
npm install
```

Em um terminal, inicie o backend de demonstração:

```bash
npm run server
```

Em outro terminal, inicie o frontend:

```bash
npm start
```

Abra `http://localhost:4200`. A conta de demonstração cadastrada no arquivo de dados é `artista@atelie.com`, senha `123456`. A tela de login também oferece o botão “Preencher Conta Demo”.

Se a lista ficar carregando, verifique se o JSON Server está ligado e se responde em `http://localhost:3000/pedidos` ou `http://localhost:3000/clientes`. Se a conta estiver autenticada, confira se o usuário tem um `id` e se seus registros possuem o mesmo `usuarioId`. Uma conta recém-criada sem pedidos deve ver a mensagem de lista vazia, não o indicador de carregamento.

## 19. O que o Angular Material faz aqui

O Angular Material fornece controles prontos, mas a regra de negócio continua pertencendo à aplicação:

- `mat-table` exibe as linhas e colunas de clientes ou pedidos.
- `mat-form-field`, `matInput` e `mat-select` criam campos e seletores.
- `mat-button` cria botões seguindo o tema visual.
- `mat-icon` mostra ícones.
- `mat-dialog` sustenta o popup de detalhes do pedido.
- `mat-snack-bar` apresenta mensagens breves de sucesso e erro.
- `mat-spinner` representa carregamento em andamento.
- `mat-sidenav` compõe a navegação lateral.

O Material não carrega os dados nem decide quem pode vê-los; isso é responsabilidade do código Angular e da API.

## 20. Resumo dos arquivos mais importantes

| Arquivo/pasta | Responsabilidade |
|---|---|
| `src/app/app.routes.ts` | Associa endereços às telas e protege as rotas internas |
| `src/app/core/models/` | Descreve os campos de cliente, pedido e usuário |
| `src/app/core/services/clientes.service.ts` | Requisições HTTP para clientes |
| `src/app/core/services/pedidos.service.ts` | Requisições HTTP para pedidos |
| `src/app/core/services/auth.service.ts` | Login, registro, sessão local e logout |
| `src/app/core/guards/auth.guard.ts` | Bloqueia navegação interna sem sessão |
| `src/app/core/validators/cpf.validator.ts` | Valida os dígitos verificadores do CPF |
| `src/app/features/clientes/` | Lista e formulário de clientes |
| `src/app/features/pedidos/` | Lista, formulário e detalhes dos pedidos |
| `src/app/features/auth/` | Telas de login e registro |
| `src/app/layout/` | Estrutura compartilhada, header e sidebar |
| `backend/db.json` | Dados lidos e gravados pelo JSON Server |

## 21. Vocabulário rápido

- **Aplicação web:** programa acessado pelo navegador por meio de páginas e requisições.
- **Componente:** bloco de interface Angular com código, template e estilo.
- **Rota:** endereço que seleciona qual página exibir.
- **API:** conjunto de endpoints que permite a programas trocar dados.
- **Endpoint:** endereço específico da API, como `/clientes`.
- **HTTP:** protocolo usado para fazer requisições entre navegador e API.
- **JSON:** formato textual para representar objetos e listas de dados.
- **CRUD:** Create (criar), Read (ler), Update (atualizar) e Delete (excluir).
- **Modelo/interface:** descrição TypeScript dos campos esperados em um dado.
- **Serviço:** classe reutilizável que concentra uma tarefa, como comunicação HTTP.
- **Validador:** regra que decide se um valor informado é aceitável.
- **Observável:** mecanismo para receber resultados assíncronos, como respostas HTTP.
- **Persistência:** manter dados salvos para que continuem disponíveis depois de atualizar a página; aqui, feita pelo arquivo usado pelo JSON Server.
- **Autenticação:** identificar quem está acessando.
- **Autorização:** decidir o que essa pessoa tem permissão para acessar ou alterar. No projeto atual, há uma verificação demonstrativa no frontend, mas não uma autorização segura no backend.
