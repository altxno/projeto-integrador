import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientesService } from '../../core/services/clientes.service';
import { Cliente } from '../../core/types/types';

@Component({
  selector: 'app-alterar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css']
})
export class AlterarComponent implements OnInit {
  form!: FormGroup;
  idCliente!: string;
  carregando: boolean = true;
  salvando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.snackBar.open('ID do cliente não informado.', 'Fechar', { duration: 3000 });
      this.router.navigate(['/listagem']);
      return;
    }

    this.idCliente = idParam;

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]]
    });

    this.clientesService.buscarPorId(this.idCliente).subscribe({
      next: (cliente) => {
        if (cliente) {
          this.form.patchValue({
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone
          });
        }
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Erro ao carregar dados do cliente.', 'Fechar', { duration: 3500 });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    const clienteAtualizado: Cliente = {
      id: this.idCliente,
      ...this.form.value
    };

    this.clientesService.editar(clienteAtualizado).subscribe({
      next: () => {
        this.salvando = false;
        this.snackBar.open('Cliente atualizado com sucesso!', 'OK', { duration: 3000 });
        this.router.navigate(['/listagem']);
      },
      error: () => {
        this.salvando = false;
        this.snackBar.open('Erro ao atualizar cliente.', 'Fechar', { duration: 3500 });
      }
    });
  }
}
