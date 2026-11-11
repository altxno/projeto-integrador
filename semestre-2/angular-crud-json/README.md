# OBJETIVO

Este projeto é uma aplicação Angular que realiza operações CRUD (criar, ler, atualizar e deletar) de clientes utilizando o JSON-Server como API simulada. O projeto foi estruturado com vários componentes (header, cadastrar, consultar, alterar, excluir e listagem) e configurado para roteamento interno. O serviço ClientesService centraliza toda a comunicação HTTP com o backend, seguindo boas práticas de arquitetura Angular. O frontend consome dados do db.json via requisições HTTP, proporcionando uma experiência completa de gestão de clientes, com formulários estilizados, tabelas de exibição e navegação fluida, tudo rodando localmente em localhost:4200 (Angular) e localhost:3000 (JSON-Server).

# Site

Este projeto foi criado usando [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4, por meio dos comandos abaixo:

```bash
ng new site
```
OU
```bash
npx ng new site
```
OU 
```bash
npx @angular/cli new site
```

## Acesso à pasta do projeto

```bash
cd site
```
## Verificar se o projeto Angular foi criado

Para testar se criou o projeto, starte o servidor usando o comando abaixo, que já abrirá o site no navegador (http://localhost:4200/).

```bash
npx ng serve --open
```

## Abrir a pasta site do projeto no Visual Studio Code

File > Open folder... [Selecione a pasta site onde o projeto foi criado]

## Criar o compnente header

```bash
npx ng generate component header
```
OU
```bash
npx ng g c header
```

## Ajsutar o header.component.html 

O header.component.html terá um menu com as funcionalidades do site: Cadastrar, Consultar, Excluir e Listar

```bash
<nav class="menu">
    <ul>
      <li><a routerLink="/cadastrar" routerLinkActive="active">Cadastrar</a></li>
      <li><a routerLink="/consultar" routerLinkActive="active">Consultar</a></li>
      <li><a routerLink="/excluir" routerLinkActive="active">Excluir</a></li>
      <li><a routerLink="/listagem" routerLinkActive="active">Listar</a></li>
    </ul>
  </nav>
```

## Ajsutar o header.component.css

A configuração CSS para o componente é apresentada abaixo: 

```bash
.menu {
  background-color: #2c3e50;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
}

.menu li {
  display: inline;
}

.menu a {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.menu a:hover {
  color: #1abc9c;
}
```

## Ajustar o header.component.ts

No header.component.ts vamos habilitar/importar o módulo responsável pelo roteamento dos links:

```bash
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
```

## Ajustar o app.component.html para incluir o componente header

No app.component.html, inclua:

```bash
<app-header></app-header>
<router-outlet />
```

## Criação dos componentes indicandos no menu

Agora vamos criar os componentes referentes aos links do menu.

```bash
npx ng generate component pages/cadastrar
npx ng generate component pages/consultar
npx ng generate component pages/alterar
npx ng generate component pages/excluir
```

## Definindo as rotas para os componentes

Agora vamos transformar as opções Cadastrar, Consultar, Alterar e Excluir do menu em links reais usando o Angular Router, apontando para rotas que levem a componentes específicos.

```bash
import { Routes } from '@angular/router';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { AlterarComponent } from './pages/alterar/alterar.component';
import { ExcluirComponent } from './pages/excluir/excluir.component';
import { ListagemComponent } from './pages/listagem/listagem.component';

export const routes: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'cadastrar', component: CadastrarComponent, title:'Cadastrar' },
  { path: 'consultar', component: ConsultarComponent },
  { path: 'alterar/:id', component: AlterarComponent },
  { path: 'excluir', component: ExcluirComponent },
  { path: 'listagem', component: ListagemComponent },
  { path: '**', redirectTo: 'consultar' }
];
```
O objetivo dessa aplicação é criar um CRUD.
 
> **CRUD – Create, Read, Update, Delete**
> O CRUD é um conjunto de operações básicas para manipulação de dados em aplicações. Utilizando o JSON-Server como uma API simulada, é possível consumir dados de forma simples e eficaz. A aplicação permite realizar consultas (Read), inclusão de novos dados (Create), alteração de dados existentes (Update) e exclusão (Delete) por meio de requisições HTTP, simulando a interação com um backend real e facilitando o desenvolvimento e teste de funcionalidades frontend.

## SERVICE PARA COMUNICAÇÃO COM O SERVIDOR (API REST)

Você precisa de um arquivo como esse (clientes.service.ts) na sua aplicação Angular para organizar e centralizar a lógica de acesso e manipulação de dados relacionados aos clientes. Esse serviço será responsável por fazer o CRUD (Criar, Ler, Atualizar e Deletar) dos dados dos clientes, geralmente se comunicando com uma API (real ou simulada, como o JSON-Server).

A classe clientes.service.ts é necessária nesta aplicação para centralizar e organizar toda a comunicação com o servidor (API REST) em um único lugar. Em vez de cada componente (ListagemComponent, AlterarComponent, ConsultarComponent, ExcluirComponent etc.) ter que escrever diretamente código de requisição HTTP (GET, POST, PUT, DELETE), o serviço ClientesService fornece métodos reutilizáveis como listar(), buscarPorId(), incluir(), editar(), e excluir(). Isso segue o princípio de responsabilidade única: os componentes cuidam da interface e da interação do usuário, enquanto o serviço cuida dos dados e da comunicação externa. Assim, o código fica mais limpo, modular, fácil de testar e mais profissional. Se no futuro mudar o endereço da API, ou quiser adicionar autenticação, você altera apenas no serviço, sem precisar mexer em vários componentes espalhados.

### Criação do componente de serviço

```bash
npx ng generate service core/services/clientes
```
OU 
```bash
npx ng generate service core/services/clientes
```
Abrindo o arquivo clientes.service.ts você verá:
```bash
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }
}
```
Mais à frente vamos alterar o código desse arquivo para que ele possa acessar os dados em uma base JSON.

### Criação da interface para definir o modelo dos dados que serão manipulados

Você vai criar  o arquivo **types.ts** dentro da pasta **core/types** para definir um tipo (ou modelo) de dados chamado Cliente, que representa a estrutura que os objetos de cliente devem seguir na sua aplicação. Esse tipo é importante porque o Angular (com TypeScript) trabalha com tipagem estática, ou seja, ajuda você a garantir que os dados usados no código têm a forma correta — neste caso, que um cliente tem nome, email, telefone e, opcionalmente, um id.
Usar esse tipo facilita:
•	A autocompletar e validação de código no editor.
•	A troca segura de dados entre componentes e serviços.
•	O reuso da estrutura em vários lugares da aplicação, sem repetir código.
Em resumo, você cria o types.ts para organizar e padronizar como os dados dos clientes (tipo Cliente) são representados, melhorando a legibilidade, segurança e manutenção da sua aplicação Angular.

Crie a pasta **types** dentro da pasta **core** do projeto Angular.

Crie um arquivo chamado **types.ts** com o seguinte código:
```bash
export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
}
```

## INSTALAR E EXECUTAR O JSON-SERVER

O JSON-Server é uma ferramenta que permite simular uma API REST de forma rápida e fácil, ideal para testes e desenvolvimento frontend. Ele funciona a partir de um arquivo JSON que atua como um banco de dados e permite realizar operações CRUD completas por meio dos métodos HTTP GET, POST, PUT, PATCH e DELETE, facilitando a criação de protótipos e a integração com aplicações sem a necessidade de um backend real.

Vamos fazer a instalação do JSON-SERVER

```bash
npm install json-server
```
Crie uma pasta chamada **backend** dentro da pasta **site** do projeto e entre na pasta

```bash
mkdir backend
cd backend
```

Crie um arquivo *db.json* usando o bloco de notas o Visual Studio Code na pasta **backend**. Coloque o conteúdo abaixo nesse arquivo.

```bash
{
  "clientes": [
    {
      "id": "1",
      "nome": "Enzo",
      "email": "a@gmail.com",
      "telefone": "(11)976543-0075"
    },
    {
      "id": "2",
      "nome": "Valentina",
      "email": "b@gmail.com",
      "telefone": "(11)98765-9087"
    },
    {
      "id": "1",
      "nome": "Evandro",
      "email": "teste@gmail.com",
      "telefone": "(11)8976-7865"
    }
  ]
}
```

### Startando o JSON-SERVER

Agora execute (suba) o servidor JSON-SERVER para o arquivo **db.json**.

```bash
npx json-server db.json
```

> O comando **npx json-server db.json** inicia um servidor local que simula uma API REST, utilizando o arquivo **db.json** como banco de dados. Ele permite realizar operações CRUD (GET, POST, PUT, PATCH, DELETE) nos dados definidos nesse arquivo, acessando a API normalmente via endpoints como **http://localhost:3000/**.
> Esse endereço **http://localhost:3000/clientes** você vai referenciar no arquivo **clientes.service.ts** para que a aplicação Angular possa consumir como uma API externa de acesso ao serviço que disponibiliza o arquivo **db.json**.

### Testando o JSON-SERVER

Para testar se o servidor está funcionando, abra o navegador e digite: **http://localhost:3000/clientes**

## Ajustando a classe de serviço

Agora vamos inserir o endereço da base de dados db.json no componente de serviço (clientes.service.ts). Abra o arquivo clientes.service.ts e deixe como segue:

```bash
import { Injectable } from '@angular/core';
import { Cliente } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://localhost:3000/clientes';
  constructor(private http: HttpClient) {}
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }
}
```

Veja que **http://localhost:3000/clientes** indica como consumir o db.json como serviço, que está rodando no JSON-Server.

**BREVE EXPLICAÇÃO:**
> Este código é um serviço em Angular, criado para gerenciar a comunicação com uma API que lida com dados de clientes. Ele está escrito em TypeScript e utiliza o módulo HttpClient do Angular para fazer requisições HTTP.
> É um serviço chamado ClientesService que fornece uma função simples: buscar uma lista de clientes de uma API. Ele utiliza o HttpClient para fazer uma requisição GET ao endpoint http://localhost:3000/clientes. > O resultado esperado é um array de objetos do tipo Cliente, retornado como um Observable.
> Explicação dos imports: 
> •	angular/core: Biblioteca principal do Angular, onde está o decorador Injectable. 
> •	Cliente: Um tipo de interface interface Cliente definida em ../types/types, que representa a estrutura de dados de um cliente (ex.: nome, email etc.). 
> •	HttpClient: Módulo do Angular para fazer requisições HTTP (como GET, POST etc.). 
> •	Observable: Classe da biblioteca RxJS, usada para lidar com operações assíncronas, como requisições à API.
> O decorador @Injectable indica que esta classe pode ser injetada em outros componentes ou serviços do Angular (injeção de dependência).
```bash
private readonly API = 'http://localhost:3000/clientes';
```
> Define uma constante privada chamada API que armazena o endereço da API backend (neste caso, uma URL local: http://localhost:3000/clientes).
```bash
constructor(private http: HttpClient) {}
```
> O construtor recebe uma instância de HttpClient como parâmetro, que é injetada automaticamente pelo Angular graças ao decorador @Injectable.
```bash
listar(): Observable<Cliente[]> {
  return this.http.get<Cliente[]>(this.API);
}
```
> •	Este método faz uma requisição HTTP do tipo GET para a URL armazenada em API (http://localhost:3000/clientes). 
> •	http.get<Cliente[]>: Especifica que a resposta da API será um array de objetos do tipo Cliente. 
> •	Observable<Cliente[]>: O método retorna um Observable, que é um objeto assíncrono. Quem chamar esse método precisará se "inscrever" (subscribe) para receber os dados quando a requisição for concluída.

## MODULO DE LISTAGEM DE DADOS

Neste módulo vamos desenvolver o componente de lisgagem (ListagemComponent) que vai buscar os dados do reposítório **db.json** e exibir na tela, abaixo do header.

### Criação dos componentes para listagem dos dados contidos em db.json

Agora vamos criar um componente para listar os clientes cadastrados quando a aplicação for startada.

```bash
npx ng generate component pages/listagem
```

Abra o **listagem.componente.ts** e ajuste conforme o código abaixo, para consumir o serviço **clientes.service.ts** criado.

```bash
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/services/clientes.service';

@Component({
  selector: 'app-listagem',
  imports: [],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit{
  listaClientes: Cliente[] = [];
  constructor(private service: ClientesService) {}
  ngOnInit(): void {
    this.service.listar().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }
}
```

Abra o arquivo *listagem.componente.html* e digite o código abaixo:

```bash
<div class="content-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        @for (cliente of listaClientes; track cliente){
        <tr>
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.telefone }}</td>
          <td>
            <button class="btn-editar">Editar</button>
            <button class="btn-excluir">Excluir</button>
          </td>
        </tr>
        }
      </tbody>
    </table>
  </div>
```

Agora confira o roteamento (**app.routes.ts**) para que a listagem apareça por padrão quando nenhuma opção do menu for selecionada.

```bash
import { Routes } from '@angular/router';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { AlterarComponent } from './pages/alterar/alterar.component';
import { ExcluirComponent } from './pages/excluir/excluir.component';
import { ListagemComponent } from './pages/listagem/listagem.component';

export const routes: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'cadastrar', component: CadastrarComponent, title:'Cadastrar' },
  { path: 'consultar', component: ConsultarComponent },
  { path: 'alterar/:id', component: AlterarComponent },
  { path: 'excluir', component: ExcluirComponent },
  { path: 'listagem', component: ListagemComponent },
  { path: '**', redirectTo: 'consultar' }  // se clicar em link quebrado, abra o componente consultar
];
```

Agora abra o arquivo **app.config.ts** e ajuste o código como segue:

```bash
import { provideHttpClient } from '@angular/common/http';

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient() // <- Adicione isso aqui
  ]
};
```

> **Importante:** O componente **rovideHttpClient** é necessário para o funcionamento das funções GT, POST, PUT e DELETE no componente de serviço (clientes.service.ts)

Abra o arquivo listagem.componente.css e configura a exibição.

```bash
/* Container principal */
.content-container {
    max-width: 1000px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow-x: auto; /* Permite rolar a tabela em telas pequenas */
  }
  
  /* Estilo geral da tabela */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  /* Estilo dos cabeçalhos da tabela */
  thead tr {
    background-color: #007bff;
    color: white;
  }
  
  th, td {
    padding: 12px 16px;
    text-align: center; /* Centraliza tanto cabeçalho quanto células */
    vertical-align: middle; /* Alinha verticalmente ao centro */
  }
  
  /* Estilo das linhas do corpo da tabela */
  tbody tr {
    background-color: #ffffff;
    border-bottom: 1px solid #ccc;
  }
  
  tbody tr:hover {
    background-color: #f1f1f1; /* Destaque no hover */
  }
  
  /* Ajuste específico para a coluna de Ações */
  td:last-child {
    white-space: nowrap; /* Impede quebra de linha entre botões */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Espaçamento entre os botões */
  }
  
  /* Estilo base dos botões */
  td button {
    min-width: 90px;
    padding: 8px 14px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  /* Botão Editar */
  .btn-editar {
    background-color: #17a2b8;
    color: white;
  }
  
  .btn-editar:hover {
    background-color: #138496;
    transform: translateY(-2px);
  }
  
  /* Botão Excluir */
  .btn-excluir {
    background-color: #e3342f;
    color: white;
  }
  
  .btn-excluir:hover {
    background-color: #c82333;
    transform: translateY(-2px);
  }
  
  /* Responsividade para telas menores */
  @media (max-width: 600px) {
    th, td {
      padding: 8px 10px;
    }
  
    td:last-child {
      flex-direction: column; /* Empilha os botões no mobile */
      gap: 6px;
    }
  
    td button {
      width: 100%;
    }
  }
```

**PARA TESTAR:**
Em um console (prompt), suba o JSON Server de dentro da pasta **backend**:

```bash
npx json-server db.json
```

Em outro console (prompt), suba a aplicação angular de dentro da pasta **site**:
```bash
npx ng serve --open
```
Verá que o conteúdo do arquivo **db.json** será exibido abaixo do menu contido no componente header.

## MODULO DE CADASTRO

Vamos adicionar o método **incluir** para cadastrar dados. Altere o arquivo **clientes.service.ts**:

```bash
import { Injectable } from '@angular/core';
import { Cliente } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://localhost:3000/clientes';
  constructor(private http: HttpClient) { }

//Faz um GET para pegar todos os clientes.
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  //Faz um POST com um novo cliente para adicionar no banco de dados.
  incluir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

}
```

Vamos implementar a programação para o formulário **cadastrar.componentes.html**

```bash
<form>
  <label for="input-id">ID</label><br />
  <input
    class="input-simples"
    id="input-id"
    name="input-id"
    placeholder="Digite o id"
    type="text"
    [(ngModel)]="cliente.id"
  />
  <label for="input-nome">Nome</label><br />
  <input
    class="input-simples"
    id="input-nome"
    name="input-nome"
    placeholder="Digite o primeiro nome"
    type="text"
    [(ngModel)]="cliente.nome"
  />
  <label for="input-sobrenome">E-mail</label><br />
  <input
    class="input-simples"
    id="input-email"
    name="input-email"
    placeholder="Email"
    type="text"
    [(ngModel)]="cliente.email"
  />
  <label for="input-telefone">Telefone</label><br />
  <input
    class="input-simples"
    id="input-telefone"
    name="input-telefone"
    type="tel"
    [(ngModel)]="cliente.telefone"
  />
  <button class="input-submeter" (click)="submeter()">Cadastrar</button>
</form>
```

Agora estilize o **cadastrar.componentes.css**:

```bash
/* Estilo geral do formulário */
form {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Estilo dos rótulos */
form label {
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

/* Estilo dos inputs */
.input-simples {
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

/* Efeito ao focar no input */
.input-simples:focus {
  border-color: #007bff;
  outline: none;
}

/* Estilo do botão de submit */
.input-submeter {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #28a745; /* verde sucesso */
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Efeito ao passar o mouse sobre o botão */
.input-submeter:hover {
  background-color: #218838;
}
```

Vamos implementar a programação para **cadastrar.componentes.ts**:

```bash
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  titulo = 'Cadastro de Clientes';
  cliente: Cliente = {} as Cliente;

  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  submeter() {
    this.service.incluir(this.cliente).subscribe(() => {
      this.router.navigate(['/listagem']);
    });
  }

}
```

## MODULO DE EXCLUSÃO

Vamos programar a exclusão a partir do clique no botão excluir que aparece na tabela de listagem, à direita de cada registro (linha). 

Vamos adicionar o método **excluir** para excluir dados, no componente de serviço. Altere o arquivo **clientes.service.ts**.

```bash
import { Injectable } from '@angular/core';
import { Cliente } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://localhost:3000/clientes';
  constructor(private http: HttpClient) { }

  //Faz um GET para pegar todos os clientes.
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  //Faz um POST com um novo cliente para adicionar no banco de dados.
  incluir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  //Faz um DELETE para excluir um cliente no banco de dados.
  excluir(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(this.API + `/${id}`);
  }

}
```

No arquivo **listagem.componente.html** inclua a funcionalidade para o botão Excluir.

```bash
<div class="content-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        @for (cliente of listaClientes; track cliente){
        <tr>
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.telefone }}</td>
          <td>
            <button class="btn-editar">Editar</button>
            <button class="btn-excluir" (click)="excluir(cliente.id!)">Excluir</button>
          </td>
        </tr>
        }
      </tbody>
    </table>
  </div>
```

 **Observação:** O **!** após **cliente.id!** indica que o ID não pode ser nulo, ou seja deve estar preenchido.

Vamos implementar um método **excluir** em **listagem.components.ts**

```bash
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  imports: [],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  listaClientes: Cliente[] = [];
  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }

  //Esse método serve para excluir um cliente da lista e atualizar a tela automaticamente, sem recarregar a página.
  excluir(id: number) {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        // Remove o cliente com o id correspondente da lista
        this.listaClientes = this.listaClientes.filter(cliente => cliente.id !== id);
      });
    }
  }

}
```

> **Observação:** O método **excluir** aqui chama o excluir do serviço **clientes.service.ts** passando o **id** a ser excluído.
> O filter() percorre a lista de clientes (this.listaClientes).
> Ele cria um novo array com todos os clientes exceto o que tem o id igual ao excluído.
> O resultado é atribuído de volta à this.listaClientes, atualizando a tela automaticamente.

**PARA TESTAR:**
Em um console (prompt), suba o JSON Server de dentro da pasta **backend**:

```bash
npx json-server db.json
```

Em outro console (prompt), suba a aplicação angular de dentro da pasta **site**:
```bash
npx ng serve --open
```
Verá que o conteúdo do arquivo **db.json** será exibido abaixo do menu contido no componente header.

## MODULO DE EDIÇÃO

Vamos programar a edição a partir do clique no botão Editar que aparece na tabela de listagem, à direita de cada registro (linha). 

Agora vamos alterar o **listagem.componente.html**, incluindo um link para edição.

```bash
<div class="content-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        @for (cliente of listaClientes; track cliente){
        <tr>
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.telefone }}</td>
          <td>
            <button *ngIf="cliente.id" class="btn-editar" [routerLink]="['/alterar', cliente.id]">Editar</button>
            <button class="btn-excluir" (click)="excluir(cliente.id!)">Excluir</button>
          </td>
        </tr>
        }
      </tbody>
    </table>
  </div>
```

> *ngIf="cliente.id" só mostra esse botão se cliente.id existir (não for null ou undefined).
> O Angular vai montar uma URL baseada nisso. Aqui, alterar é uma rota (por exemplo /alterar/123) e cliente.id é o ID específico do cliente. Assim, se cliente.id for 123, vai navegar para http://localhost:4200/alterar/5.

**Lembre-se de verificar no arquivo app.routes.ts se a rota para o componente alterar faz com que este componente receba o ID a ser alterado, conforme mostrado na linha abaixo**. 

```bash
  { path: 'alterar/:id', component: AlterarComponent },
```

Para que o routerLink funcione aqui, é preciso importar o **RouterModule** no arquivo **listagem.componente.ts**.

```bash
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/services/clientes.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // boa prática em Standalone para *ngIf, *ngFor etc.

@Component({
  selector: 'app-listagem',
  standalone: true, 
  imports: [CommonModule, RouterModule], // adiciona CommonModule para segurança
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'] 
})
export class ListagemComponent implements OnInit {
  listaClientes: Cliente[] = [];

  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarClientes(); 
  }

  carregarClientes(): void {
    this.service.listar().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }

  excluir(id: number): void {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.listaClientes = this.listaClientes.filter(cliente => cliente.id !== id);
      });
    }
  }
}
```

Agora abra o **alterar.componente.ts** e coloque o código abaixo.

```bash
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // <-- Importar aqui
import { ClientesService } from '../../core/services/clientes.service';
import { CommonModule } from '@angular/common'; // <-- (opcional, mas geralmente precisa)
import { Cliente } from '../../core/types/types';

@Component({
  selector: 'app-alterar',
  standalone: true, // <-- importante em standalone
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css'],
  imports: [CommonModule, ReactiveFormsModule], // <-- Adicionar ReactiveFormsModule aqui
})
export class AlterarComponent implements OnInit {
  form!: FormGroup;
  idCliente!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clientesService: ClientesService
  ) { }

  ngOnInit(): void {
    this.idCliente = Number(this.route.snapshot.paramMap.get('id'));

    //Cria um objeto do tipo formulário com os campos vazios (nome, email e telefone)
    this.form = this.fb.group({
      nome: [''],
      email: [''],
      telefone: ['']
    });

    //Chama o serviço que vai buscar os dados do cliente pelo ID na API (GET /clientes/:id).
    this.clientesService.buscarPorId(this.idCliente).subscribe(cliente => {
      //Se o cliente foi encontrado, atualiza os valores do formulário com os dados do cliente encontrado.
      if (cliente) {
        this.form.patchValue({
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const clienteAtualizado: Cliente = {
        id: this.idCliente, //pega o ID obtido da URL e que está em this.idCliente
        ...this.form.value //pega o conteúdos dos campos do form e carrega no objetoclienteAtualizado
      };

      /* vai gerar algo como mostrado abaixo e armazenar em clienteAtualizado
      {
        id: 5,     // Capturado da URL (não vem do formulário!)
        nome: "João",
        email: "joao@email.com",
        telefone: "12345-6789"
      }
      */

      this.clientesService.editar(clienteAtualizado).subscribe(() => {
        this.router.navigate(['/listagem']);
      });
    }
  }
}
```

Abra o componente de serviço (**clientes.service.ts**) e ajuste o código, como segue, criado os métodos **editar** e **buscarPorId**:

```bash
import { Injectable } from '@angular/core';
import { Cliente } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://localhost:3000/clientes';
  constructor(private http: HttpClient) { }

  //Faz um GET para pegar todos os clientes.
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  //Faz um POST com um novo cliente para adicionar no banco de dados.
  incluir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  //Faz um DELETE para excluir um cliente no banco de dados.
  excluir(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(this.API + `/${id}`);
  }
  
//Faz um PUT para alterar um cliente no banco de dados.
  editar(cliente: Cliente): Observable<Cliente> {
    const url = `${this.API}/${cliente.id}`
    return this.http.put<Cliente>(url, cliente)
  }
  
//Faz um GET para pegar o cliente de ID informado.
  buscarPorId(id: number): Observable<Cliente | undefined> {
    return this.http.get<Cliente>(this.API + `/${id}`);
  }

}
```

Agora crie o formulário de alteração (**alterar.component.html**): 

```bash
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <label>Nome:</label>
  <input formControlName="nome" type="text" />

  <label>Email:</label>
  <input formControlName="email" type="email" />

  <label>Telefone:</label>
  <input formControlName="telefone" type="text" />

  <button type="submit">Salvar</button>
</form>
```

Crie o CSS para este formulário (**alterar.component.css**):

```bash
/* Estilização básica para o formulário */
form {
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fafafa;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Estilo dos rótulos */
  form label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
  }
  
  /* Estilo dos campos de input */
  form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  /* Estilo do botão */
  form button {
    width: 100%;
    padding: 12px;
    background-color: #007bff; /* azul principal */
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
```
**EXPLICAÇÃO:**
> Quando o botão Alterar do listagem.componente.html é clicado, o Angular carrega o componente AlterarComponent (alterar.componente.html) a partir da rota no app.routes.ts.
> Em seguida, o ngOnInit() do alterar.componente.ts é chamado. O ngOnInit():
> •	Pega o ID da URL (this.route.snapshot.paramMap.get('id')). Por exemplo: http://localhost:4200/alterar/5
> •	Cria um formulário reativo vazio (FormGroup).
> •	Faz uma chamada no ClientesService (clientes.service.ts):
>    •	buscarPorId(id) — faz um GET na API para buscar os dados do cliente específico.
> •	Quando o cliente chega, preenche o formulário (patchValue) com os dados recebidos.
> •	O usuário alterar os dados nos campos e clica no botão "Salvar" no alterar.component.html.
> •	O Angular dispara o método onSubmit() do alterar.componente.ts.
> •	Dentro de onSubmit(), o cliente atualizado é montado no objeto clienteAtualizado, que é enviado para o componente de serviço (clientes.service.ts) por meio do método ClientesService.editar(clienteAtualizado). Isso vai executar o método editar no componente de serviço.
> •	Em seguida, após a conclusão da edição o componente listagem é carregado this.router.navigate(['/listagem']);
> •	No componente de listagem (listagem.componente.ts), o ngOnInit() é executado e chama o método this.carregarClientes();, que, por sua vez, chama o método listar da classe de serviço (clientes.service.ts) e os dados são obtidos e exibidos pelo listagem.componente.html.


## MODULO CONSULTAR

Vamos criar o módulo para a opção Consultar do Menu. Um formulário será apresentado para digitação do ID, com um botão Buscar.

Agora coloque no componente **consultar.component.html** o código abaixo:

```bash
<div class="consulta-container">
    <form (ngSubmit)="buscarCliente()">
      <label for="input-id">Informe o ID do Cliente:</label>
      <input
        type="number"
        id="input-id"
        name="input-id"
        [(ngModel)]="idBusca"
        class="input-id"
        required
      />
      <button type="submit" class="btn-buscar">Buscar</button>
    </form>
  
    <div *ngIf="clienteEncontrado" class="cliente-dados">
      <h2>Dados do Cliente</h2>
      <p><strong>ID:</strong> {{ clienteEncontrado.id }}</p>
      <p><strong>Nome:</strong> {{ clienteEncontrado.nome }}</p>
      <p><strong>Email:</strong> {{ clienteEncontrado.email }}</p>
      <p><strong>Telefone:</strong> {{ clienteEncontrado.telefone }}</p>
    </div>
  
    <div *ngIf="erroBusca" class="erro-busca">
      {{ erroBusca }}
    </div>
  </div>
```

Estilize com o CSS abaixo (**consultar.component.css**):

```bash
.consulta-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  .input-id {
    padding: 10px;
    margin-top: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
  }
  
  .btn-buscar {
    padding: 12px;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-buscar:hover {
    background-color: #0056b3;
  }
  
  .cliente-dados {
    margin-top: 30px;
    padding: 15px;
    background-color: #e9ffe9;
    border: 1px solid #90ee90;
    border-radius: 6px;
  }
  
  .erro-busca {
    margin-top: 20px;
    color: red;
    font-weight: bold;
  }
```

Agora coloque o código abaixo no **consultar.component.ts**:

```bash
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // necessário para usar [(ngModel)]
import { ClientesService } from '../../core/services/clientes.service';
import { Cliente } from '../../core/types/types';

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ConsultarComponent {
  idBusca: number | null = null;  // ID digitado no input
  clienteEncontrado: Cliente | null = null; // Cliente encontrado
  erroBusca: string = ''; // Mensagem de erro

  constructor(private clientesService: ClientesService) { }

  buscarCliente(): void {
    this.erroBusca = '';
    this.clienteEncontrado = null;

    if (this.idBusca != null) {
      //Chama o serviço ClientesService, que faz um GET na API:GET http://localhost:3000/clientes/:id
      this.clientesService.buscarPorId(this.idBusca).subscribe({
        //verifica se o cliente foi retornado corretamente
        next: (cliente) => {
          //Se encontrar o cliente, salva em this.clienteEncontrado.
          //Isso automaticamente mostra os dados no HTML (*ngIf="clienteEncontrado").
          if (cliente) {
            this.clienteEncontrado = cliente;
          } else {
            this.erroBusca = 'Cliente não encontrado.';
          }
        },
        //Se o cliente não existir (for null ou undefined — dependendo da API), mostra a mensagem abaixo
        error: () => {
          this.erroBusca = 'Erro ao buscar cliente.';
        }
      });
    }
  }
}
```
**Verifique se no arquivo clientes.service.ts, que contem a classe ClientesService, se tem a função buscarPorId, abaixo**. 

```bash
 buscarPorId(id: number): Observable<Cliente | undefined> {
    return this.http.get<Cliente>(this.API + `/${id}`);
  }
```
## MODULO EXCLUIR

Vamos criar o módulo para a opção Excluir do Menu. Um formulário será apresentado para digitação do ID, com um botão Excluir.

Agora coloque no componente **excluir.component.html** o código abaixo:

```bash
<div class="excluir-container">
    <form (ngSubmit)="excluirCliente()">
      <label for="input-id">Informe o ID para excluir:</label>
      <input
        type="number"
        id="input-id"
        name="input-id"
        [(ngModel)]="idExcluir"
        class="input-id"
        required
      />
      <button type="submit" class="btn-excluir">Excluir</button>
    </form>
  
    <div *ngIf="mensagemSucesso" class="sucesso-mensagem">
      {{ mensagemSucesso }}
    </div>
  
    <div *ngIf="erroMensagem" class="erro-mensagem">
      {{ erroMensagem }}
    </div>
  </div>
```

Agora estilize no **excluir.componente.css**:

```bash
.excluir-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff8f8;
    border: 1px solid #f5c2c2;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  .input-id {
    padding: 10px;
    margin-top: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
  }
  
  .btn-excluir {
    padding: 12px;
    background-color: #dc3545; /* vermelho */
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-excluir:hover {
    background-color: #c82333;
  }
  
  .sucesso-mensagem {
    margin-top: 20px;
    color: green;
    font-weight: bold;
  }
  
  .erro-mensagem {
    margin-top: 20px;
    color: red;
    font-weight: bold;
  }
```

Ajuste o **excluir.component.ts**:

```bash
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Importações corretas
import { ClientesService } from '../../core/services/clientes.service';

@Component({
  selector: 'app-excluir',
  standalone: true,
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ExcluirComponent {
  idExcluir: number | null = null;
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  // CONSTRUCTOR correto com Router injetado
  constructor(
    private clientesService: ClientesService,
    private router: Router   // <- AQUI!
  ) { }

  excluirCliente(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';

    if (this.idExcluir != null) {
      this.clientesService.excluir(this.idExcluir).subscribe({
        next: () => {
          this.router.navigate(['/listagem']); // Navega após excluir
          //this.mensagemSucesso = `Cliente com ID ${this.idExcluir} excluído com sucesso.`;
          //this.idExcluir = null;
        },
        error: () => {
          this.erroMensagem = `Erro ao excluir o cliente.`;
        }
      });
    }
  }
}
```

**PARA TESTAR:**
Em um console (prompt), suba o JSON Server de dentro da pasta **backend**:

```bash
npx json-server db.json
```

Em outro console (prompt), suba a aplicação angular de dentro da pasta **site**:
```bash
npx ng serve --open
```
