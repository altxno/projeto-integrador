import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PedidosListaComponent } from './pages/pedidos/pedidos-lista/pedidos-lista.component';
import { PedidosFormComponent } from './pages/pedidos/pedidos-form/pedidos-form.component';
import { ClientesListaComponent } from './pages/clientes/clientes-lista/clientes-lista.component';
import { ClientesFormComponent } from './pages/clientes/clientes-form/clientes-form.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Rotas de Autenticação
  { path: 'login', component: LoginComponent, title: 'Ateliê - Login' },
  { path: 'registro', component: RegistroComponent, title: 'Ateliê - Criar Conta' },

  // Rotas de Pedidos / Comissões (Tela Inicial & CRUD de Pedidos)
  { path: '', component: PedidosListaComponent, canActivate: [authGuard], title: 'Ateliê - Pedidos & Comissões' },
  { path: 'pedidos', component: PedidosListaComponent, canActivate: [authGuard], title: 'Ateliê - Pedidos & Comissões' },
  { path: 'pedidos/novo', component: PedidosFormComponent, canActivate: [authGuard], title: 'Ateliê - Nova Comissão' },
  { path: 'pedidos/editar/:id', component: PedidosFormComponent, canActivate: [authGuard], title: 'Ateliê - Editar Comissão' },

  // Rotas de Clientes (CRUD de Clientes com Validação de CPF)
  { path: 'clientes', component: ClientesListaComponent, canActivate: [authGuard], title: 'Ateliê - Clientes' },
  { path: 'clientes/novo', component: ClientesFormComponent, canActivate: [authGuard], title: 'Ateliê - Novo Cliente' },
  { path: 'clientes/editar/:id', component: ClientesFormComponent, canActivate: [authGuard], title: 'Ateliê - Editar Cliente' },

  // Redirecionamentos de Compatibilidade
  { path: 'cadastrar', redirectTo: 'clientes/novo' },
  { path: 'listagem', redirectTo: 'clientes' },
  { path: 'consultar', redirectTo: 'clientes' },
  { path: 'alterar/:id', redirectTo: 'clientes/editar/:id' },
  { path: 'excluir', redirectTo: 'clientes' },

  // Rota Padrão / Wildcard
  { path: '**', redirectTo: '' }
];
