import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/services/clientes.service';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  colunas: string[] = ['id', 'nome', 'email', 'telefone', 'acoes'];
  listaClientes: Cliente[] = [];
  carregando: boolean = true;

  constructor(
    private service: ClientesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.carregando = true;
    this.service.listar().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Erro ao carregar clientes. Verifique se o servidor está ativo.', 'Fechar', {
          duration: 4000,
        });
      }
    });
  }

  excluir(id: number | string): void {
    if (confirm(`Tem certeza que deseja excluir o cliente ID ${id}?`)) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.listaClientes = this.listaClientes.filter(c => String(c.id) !== String(id));
          this.snackBar.open(`Cliente ID ${id} excluído com sucesso!`, 'OK', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackBar.open('Erro ao excluir cliente.', 'Fechar', {
            duration: 3000,
          });
        }
      });
    }
  }
}
