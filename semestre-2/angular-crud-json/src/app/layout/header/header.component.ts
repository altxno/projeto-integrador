import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from '../../core/models/usuario.model';

export interface AppBreadcrumb {
  section: string;
  page: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({ required: true }) breadcrumb!: AppBreadcrumb;
  @Input() usuario: Usuario | null = null;
}
