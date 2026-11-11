import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  titulo = 'Cadastro de Clientes';
  cliente: Cliente = {} as Cliente;

  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  submeter() {
    this.service.incluir(this.cliente).subscribe(() => {
      this.router.navigate(['/listagem']);
    });
  }

}
