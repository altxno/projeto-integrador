import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/services/clientes.service';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  listaClientes: Cliente[] = [];
constructor(private service: ClientesService) {}
ngOnInit(): void {
this.service.listar().subscribe((clientes) => {
this.listaClientes = clientes;
});
}

}
