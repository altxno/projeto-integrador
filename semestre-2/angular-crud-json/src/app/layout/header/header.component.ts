import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../core/models/usuario.model';

export interface AppBreadcrumb {
  // Textos recebidos do layout para montar a trilha de navegação.
  section: string;
  page: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Inputs são valores que o componente pai fornece ao componente de cabeçalho.
  @Input({ required: true }) breadcrumb!: AppBreadcrumb;
  @Input() usuario: Usuario | null = null;
}
