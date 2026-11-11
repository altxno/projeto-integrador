import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/services/clientes.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // boa prática em Standalone para *ngIf, *ngFor, etc.

@Component({
  selector: 'app-listagem',
  standalone: true, // importante em projetos Standalone!
  imports: [CommonModule, RouterModule], // adiciona CommonModule para segurança
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'] // Corrigido: era "styleUrl" (com erro)
})
export class ListagemComponent implements OnInit {
  listaClientes: Cliente[] = [];

  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarClientes(); 
  }

  carregarClientes(): void {
    this.service.listar().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }

  excluir(id: number): void {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.listaClientes = this.listaClientes.filter(cliente => cliente.id !== id);
      });
    }
  }
}
