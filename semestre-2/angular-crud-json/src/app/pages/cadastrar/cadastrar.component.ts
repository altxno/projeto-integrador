import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientesService } from '../../core/services/clientes.service';
import { Cliente } from '../../core/types/types';

@Component({
  selector: 'app-cadastrar',
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
    MatSnackBarModule
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  form: FormGroup;
  salvando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ClientesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]]
    });
  }

  submeter(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    const novoCliente: Cliente = this.form.value;

    this.service.incluir(novoCliente).subscribe({
      next: () => {
        this.salvando = false;
        this.snackBar.open('Cliente cadastrado com sucesso!', 'OK', {
          duration: 3000,
        });
        this.router.navigate(['/listagem']);
      },
      error: () => {
        this.salvando = false;
        this.snackBar.open('Erro ao cadastrar cliente. Verifique o servidor.', 'Fechar', {
          duration: 3500,
        });
      }
    });
  }
}
