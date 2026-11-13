import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Pedido, StatusPedido } from '../../../core/types/types';
import { PedidosService } from '../../../core/services/pedidos.service';

@Component({
  selector: 'app-pedidos-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.css']
})
export class PedidosListaComponent implements OnInit {
  colunas: string[] = ['id', 'titulo', 'cliente', 'tipoArte', 'valor', 'dataEntrega', 'status', 'acoes'];
  todosPedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];

  filtroTexto: string = '';
  filtroStatus: string = 'TODOS';
  carregando: boolean = true;

  totalPedidos = 0;
  totalPendentes = 0;
  totalEmAndamento = 0;
  totalConcluidos = 0;
  faturamentoTotal = 0;

  constructor(
    private service: PedidosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.carregando = true;
    this.service.listar().subscribe({
      next: (pedidos) => {
        this.todosPedidos = pedidos;
        this.calcularMetricas();
        this.aplicarFiltros();
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Erro ao carregar comissões. Verifique o JSON-Server.', 'Fechar', {
          duration: 3500
        });
      }
    });
  }

  calcularMetricas(): void {
    this.totalPedidos = this.todosPedidos.length;
    this.totalPendentes = this.todosPedidos.filter(p => p.status === 'Pendente').length;
    this.totalEmAndamento = this.todosPedidos.filter(p => p.status === 'Em Andamento').length;
    this.totalConcluidos = this.todosPedidos.filter(p => p.status === 'Concluído').length;
    this.faturamentoTotal = this.todosPedidos.reduce((acc, p) => acc + (Number(p.valor) || 0), 0);
  }

  aplicarFiltros(): void {
    const termo = this.filtroTexto.trim().toLowerCase();
    this.pedidosFiltrados = this.todosPedidos.filter(p => {
      const bateTexto = !termo ||
        p.titulo.toLowerCase().includes(termo) ||
        p.clienteNome.toLowerCase().includes(termo) ||
        p.tipoArte.toLowerCase().includes(termo);

      const bateStatus = this.filtroStatus === 'TODOS' || p.status === this.filtroStatus;
      return bateTexto && bateStatus;
    });
  }

  getStatusClass(status: StatusPedido): string {
    switch (status) {
      case 'Pendente': return 'status-pendente';
      case 'Em Andamento': return 'status-andamento';
      case 'Concluído': return 'status-concluido';
      case 'Cancelado': return 'status-cancelado';
      default: return '';
    }
  }

  excluir(id: number | string, titulo: string): void {
    if (confirm(`Deseja realmente excluir a comissão "${titulo}" (#${id})?`)) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.todosPedidos = this.todosPedidos.filter(p => String(p.id) !== String(id));
          this.calcularMetricas();
          this.aplicarFiltros();
          this.snackBar.open(`Comissão "${titulo}" excluída com sucesso!`, 'OK', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Erro ao excluir comissão.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
