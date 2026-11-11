import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // necessário para usar [(ngModel)]
import { ClientesService } from '../../core/services/clientes.service';
import { Cliente } from '../../core/types/types';

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ConsultarComponent {
  idBusca: number | null = null;  // ID digitado no input
  clienteEncontrado: Cliente | null = null; // Cliente encontrado
  erroBusca: string = ''; // Mensagem de erro

  constructor(private clientesService: ClientesService) { }

  buscarCliente(): void {
    this.erroBusca = '';
    this.clienteEncontrado = null;

    if (this.idBusca != null) {
      //Chama o serviço ClientesService, que faz um GET na API:GET http://localhost:3000/clientes/:id
      this.clientesService.buscarPorId(this.idBusca).subscribe({
        //verifica se o cliente foi retornado corretamente
        next: (cliente) => {
          //Se encontrar o cliente, salva em this.clienteEncontrado.
          //Isso automaticamente mostra os dados no HTML (*ngIf="clienteEncontrado").
          if (cliente) {
            this.clienteEncontrado = cliente;
          } else {
            this.erroBusca = 'Cliente não encontrado.';
          }
        },
        //Se o cliente não existir (for null ou undefined — dependendo da API), mostra a mensagem abaixo
        error: () => {
          this.erroBusca = 'Erro ao buscar cliente.';
        }
      });
    }
  }
}
