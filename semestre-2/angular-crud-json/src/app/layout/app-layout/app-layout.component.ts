import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface Breadcrumb {
  // Grupo e nome da página mostrados no caminho do topo.
  section: string;
  page: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  get breadcrumb(): Breadcrumb {
    // Remove query string e barra final para comparar caminhos de forma consistente.
    const path = this.router.url.split('?')[0].replace(/\/$/, '') || '/';

    // Traduz a URL atual para o caminho legível mostrado no cabeçalho.
    if (path === '/clientes') return { section: 'Clientes', page: 'Lista de clientes' };
    if (path === '/clientes/novo') return { section: 'Clientes', page: 'Cadastrar cliente' };
    if (path.startsWith('/clientes/editar/')) return { section: 'Clientes', page: 'Editar cliente' };
    if (path === '/pedidos/novo') return { section: 'Pedidos', page: 'Cadastrar pedido' };
    if (path.startsWith('/pedidos/editar/')) return { section: 'Pedidos', page: 'Editar pedido' };
    if (path === '/perfil') return { section: 'Perfil', page: 'Editar informações' };

    return { section: 'Pedidos', page: 'Lista de pedidos' };
  }

  logout(): void {
    // Encerra a sessão local e navega para a tela pública de login.
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
