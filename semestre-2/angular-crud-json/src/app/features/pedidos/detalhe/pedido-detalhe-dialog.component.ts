import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Pedido } from '../../../core/models/pedido.model';

@Component({
  selector: 'app-pedido-detalhe-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './pedido-detalhe-dialog.component.html',
  styleUrls: ['./pedido-detalhe-dialog.component.css']
})
export class PedidoDetalheDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public pedido: Pedido) {}

  get valorFormatado(): string {
    const valor = Number(this.pedido.valor) || 0;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
}
