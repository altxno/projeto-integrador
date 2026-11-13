import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientesService } from '../../core/services/clientes.service';

@Component({
  selector: 'app-excluir',
  standalone: true,
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
})
export class ExcluirComponent {
  idExcluir: string = '';
  excluindo: boolean = false;

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  excluirCliente(): void {
    const id = this.idExcluir.trim();
    if (!id) {
      this.snackBar.open('Informe o ID do cliente que deseja excluir.', 'OK', { duration: 3000 });
      return;
    }

    if (!confirm(`Tem certeza de que deseja remover o cliente com ID ${id}? Esta ação não pode ser desfeita.`)) {
      return;
    }

    this.excluindo = true;
    this.clientesService.excluir(id).subscribe({
      next: () => {
        this.excluindo = false;
        this.snackBar.open(`Cliente #${id} excluído com sucesso!`, 'OK', { duration: 3000 });
        this.router.navigate(['/listagem']);
      },
      error: () => {
        this.excluindo = false;
        this.snackBar.open(`Erro ao excluir o cliente #${id}. Verifique se o ID existe.`, 'Fechar', {
          duration: 3500
        });
      }
    });
  }
}
