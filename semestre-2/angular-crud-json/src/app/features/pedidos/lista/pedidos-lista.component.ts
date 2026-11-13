import { Component, inject, OnInit } from '@angular/core';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Pedido, StatusPedido } from '../../../core/models/pedido.model';
import { PedidosService } from '../../../core/services/pedidos.service';
import { PedidoDetalheDialogComponent } from '../detalhe/pedido-detalhe-dialog.component';
import { AuthService } from '../../../core/services/auth.service';

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
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.css']
})
export class PedidosListaComponent implements OnInit {
  private readonly authService = inject(AuthService);

  colunas: string[] = ['id', 'titulo', 'cliente', 'tipoArte', 'valor', 'dataEntrega', 'status', 'acoes'];
  todosPedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];

  filtroTexto: string = '';
  filtroStatus: 'TODOS' | StatusPedido = 'TODOS';
  carregando: boolean = true;

  totalPedidos = 0;
  totalPendentes = 0;
  totalEmAndamento = 0;
  totalConcluidos = 0;
  faturamentoTotal = 0;

  constructor(
    private service: PedidosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    const usuarioId = this.authService.usuarioLogado?.id;
    if (usuarioId == null) {
      this.carregando = false;
      this.snackBar.open('Não foi possível identificar o usuário conectado.', 'Fechar', { duration: 3500 });
      return;
    }

    this.carregando = true;
    this.service.listar(usuarioId).subscribe({
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

  filtrarPorStatus(status: 'TODOS' | StatusPedido): void {
    this.filtroStatus = status;
    this.aplicarFiltros();
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

  visualizar(pedido: Pedido): void {
    this.dialog.open(PedidoDetalheDialogComponent, {
      data: pedido,
      width: '560px',
      maxWidth: 'calc(100vw - 32px)'
    });
  }

  excluir(id: number | string, titulo: string): void {
    const usuarioId = this.authService.usuarioLogado?.id;
    if (usuarioId == null) return;

    if (confirm(`Deseja realmente excluir a comissão "${titulo}" (#${id})?`)) {
      this.service.excluir(id, usuarioId).subscribe({
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
