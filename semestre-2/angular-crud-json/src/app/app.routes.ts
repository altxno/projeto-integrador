import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroComponent } from './features/auth/registro/registro.component';
import { PedidosListaComponent } from './features/pedidos/lista/pedidos-lista.component';
import { PedidosFormComponent } from './features/pedidos/form/pedidos-form.component';
import { ClientesListaComponent } from './features/clientes/lista/clientes-lista.component';
import { ClientesFormComponent } from './features/clientes/form/clientes-form.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Ateliê - Login' },
  { path: 'registro', component: RegistroComponent, title: 'Ateliê - Criar Conta' },

  // Mantém os endereços antigos do CRUD de aula apontando para as telas novas.
  { path: 'cadastrar', redirectTo: 'clientes/novo', pathMatch: 'full' },
  { path: 'listagem', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'consultar', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'alterar/:id', redirectTo: 'clientes/editar/:id' },
  { path: 'excluir', redirectTo: 'clientes', pathMatch: 'full' },

  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', component: PedidosListaComponent, title: 'Ateliê - Pedidos & Comissões' },
      { path: 'pedidos', component: PedidosListaComponent, title: 'Ateliê - Pedidos & Comissões' },
      { path: 'pedidos/novo', component: PedidosFormComponent, title: 'Ateliê - Nova Comissão' },
      { path: 'pedidos/editar/:id', component: PedidosFormComponent, title: 'Ateliê - Editar Comissão' },
      { path: 'clientes', component: ClientesListaComponent, title: 'Ateliê - Clientes' },
      { path: 'clientes/novo', component: ClientesFormComponent, title: 'Ateliê - Novo Cliente' },
      { path: 'clientes/editar/:id', component: ClientesFormComponent, title: 'Ateliê - Editar Cliente' },
      { path: '**', redirectTo: '' }
    ]
  }
];
