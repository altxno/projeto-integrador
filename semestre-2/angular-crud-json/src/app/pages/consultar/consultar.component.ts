import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientesService } from '../../core/services/clientes.service';
import { Cliente } from '../../core/types/types';

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
})
export class ConsultarComponent {
  idBusca: string = '';
  clienteEncontrado: Cliente | null = null;
  buscado: boolean = false;
  buscando: boolean = false;
  erroBusca: string = '';

  constructor(
    private clientesService: ClientesService,
    private snackBar: MatSnackBar
  ) { }

  buscarCliente(): void {
    const id = this.idBusca.trim();
    if (!id) {
      this.snackBar.open('Informe um ID válido para pesquisar.', 'OK', { duration: 3000 });
      return;
    }

    this.buscando = true;
    this.buscado = false;
    this.erroBusca = '';
    this.clienteEncontrado = null;

    this.clientesService.buscarPorId(id).subscribe({
      next: (cliente) => {
        this.buscando = false;
        this.buscado = true;
        if (cliente && (cliente.id !== undefined || cliente.nome)) {
          this.clienteEncontrado = cliente;
        } else {
          this.erroBusca = `Nenhum cliente encontrado com o ID "${id}".`;
        }
      },
      error: () => {
        this.buscando = false;
        this.buscado = true;
        this.erroBusca = `Cliente com ID "${id}" não foi localizado.`;
      }
    });
  }

  excluirCliente(): void {
    if (!this.clienteEncontrado?.id) return;
    const id = this.clienteEncontrado.id;

    if (confirm(`Deseja realmente excluir o cliente "${this.clienteEncontrado.nome}" (ID ${id})?`)) {
      this.clientesService.excluir(id).subscribe({
        next: () => {
          this.snackBar.open(`Cliente ID ${id} excluído com sucesso!`, 'OK', { duration: 3000 });
          this.clienteEncontrado = null;
          this.buscado = false;
          this.idBusca = '';
        },
        error: () => {
          this.snackBar.open('Erro ao excluir cliente.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
