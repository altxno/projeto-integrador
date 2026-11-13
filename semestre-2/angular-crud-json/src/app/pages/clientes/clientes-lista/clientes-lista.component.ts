import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Cliente } from '../../../core/types/types';
import { ClientesService } from '../../../core/services/clientes.service';

@Component({
  selector: 'app-clientes-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  colunas: string[] = ['id', 'nome', 'cpf', 'email', 'telefone', 'acoes'];
  todosClientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtroTexto: string = '';
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
        this.todosClientes = clientes;
        this.aplicarFiltro();
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Erro ao carregar clientes. Verifique o JSON-Server.', 'Fechar', {
          duration: 3500
        });
      }
    });
  }

  aplicarFiltro(): void {
    const termo = this.filtroTexto.trim().toLowerCase();
    if (!termo) {
      this.clientesFiltrados = [...this.todosClientes];
      return;
    }
    this.clientesFiltrados = this.todosClientes.filter(c =>
      c.nome.toLowerCase().includes(termo) ||
      c.email.toLowerCase().includes(termo) ||
      (c.cpf && c.cpf.includes(termo))
    );
  }

  formatarCpf(cpf: string): string {
    if (!cpf) return '-';
    const nums = cpf.replace(/\D/g, '');
    if (nums.length === 11) {
      return nums.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  }

  excluir(id: number | string, nome: string): void {
    if (confirm(`Deseja realmente excluir o cliente "${nome}" (#${id})?`)) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.todosClientes = this.todosClientes.filter(c => String(c.id) !== String(id));
          this.aplicarFiltro();
          this.snackBar.open(`Cliente "${nome}" excluído com sucesso!`, 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Erro ao excluir cliente.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
