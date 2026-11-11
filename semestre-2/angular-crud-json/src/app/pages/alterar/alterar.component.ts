import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // <-- Importar aqui
import { ClientesService } from '../../core/services/clientes.service';
import { CommonModule } from '@angular/common'; // <-- (opcional, mas geralmente precisa)
import { Cliente } from '../../core/types/types';

@Component({
  selector: 'app-alterar',
  standalone: true, // <-- importante em standalone
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css'],
  imports: [CommonModule, ReactiveFormsModule], // <-- Adicionar ReactiveFormsModule aqui
})
export class AlterarComponent implements OnInit {
  form!: FormGroup;
  idCliente!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clientesService: ClientesService
  ) { }

  ngOnInit(): void {
    this.idCliente = Number(this.route.snapshot.paramMap.get('id'));

    //Cria um objeto do tipo formulário com os campos vazios (nome, email e telefone)
    this.form = this.fb.group({
      nome: [''],
      email: [''],
      telefone: ['']
    });

    //Chama o serviço que vai buscar os dados do cliente pelo ID na API (GET /clientes/:id).
    this.clientesService.buscarPorId(this.idCliente).subscribe(cliente => {
      //Se o cliente foi encontrado, atualiza os valores do formulário com os dados do cliente encontrado.
      if (cliente) {
        this.form.patchValue({
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const clienteAtualizado: Cliente = {
        id: this.idCliente, //pega o ID obtido da URL e que está em this.idCliente
        ...this.form.value //pega o conteúdos dos campos do form e carrega no objetoclienteAtualizado
      };

      /* vai gerar algo como mostrado abaixo e armazenar em clienteAtualizado
      {
        id: 5,     // Capturado da URL (não vem do formulário!)
        nome: "João",
        email: "joao@email.com",
        telefone: "12345-6789"
      }
      */

      this.clientesService.editar(clienteAtualizado).subscribe(() => {
        this.router.navigate(['/listagem']);
      });
    }
  }
}
