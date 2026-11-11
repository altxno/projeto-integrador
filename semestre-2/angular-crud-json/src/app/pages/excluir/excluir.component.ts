import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { ClientesService } from '../../core/services/clientes.service';

@Component({
  selector: 'app-excluir',
  standalone: true,
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ExcluirComponent {
  idExcluir: number | null = null;
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  constructor(
    private clientesService: ClientesService,
    private router: Router  
  ) { }

  excluirCliente(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';

    if (this.idExcluir != null) {
      this.clientesService.excluir(this.idExcluir).subscribe({
        next: () => {
          this.router.navigate(['/listagem']); // Navega após excluir
          //this.mensagemSucesso = `Cliente com ID ${this.idExcluir} excluído com sucesso.`;
          //this.idExcluir = null;
        },
        error: () => {
          this.erroMensagem = `Erro ao excluir o cliente.`;
        }
      });
    }
  }
}
