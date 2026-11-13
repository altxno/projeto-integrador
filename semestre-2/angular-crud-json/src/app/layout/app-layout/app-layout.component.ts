import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface Breadcrumb {
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
    const path = this.router.url.split('?')[0].replace(/\/$/, '') || '/';

    if (path === '/clientes') return { section: 'Clientes', page: 'Lista de clientes' };
    if (path === '/clientes/novo') return { section: 'Clientes', page: 'Cadastrar cliente' };
    if (path.startsWith('/clientes/editar/')) return { section: 'Clientes', page: 'Editar cliente' };
    if (path === '/pedidos/novo') return { section: 'Pedidos', page: 'Cadastrar pedido' };
    if (path.startsWith('/pedidos/editar/')) return { section: 'Pedidos', page: 'Editar pedido' };

    return { section: 'Pedidos', page: 'Lista de pedidos' };
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
