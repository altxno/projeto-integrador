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
import { ClientesService } from '../../../core/services/clientes.service';
import { Cliente } from '../../../core/types/types';
import { validarCpf } from '../../../core/validators/cpf.validator';

@Component({
  selector: 'app-clientes-form',
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
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  form: FormGroup;
  idCliente: string | null = null;
  modoEdicao: boolean = false;
  carregando: boolean = false;
  salvando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ClientesService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cpf: ['', [Validators.required, validarCpf]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idCliente = id;
      this.modoEdicao = true;
      this.carregarCliente(id);
    }
  }

  carregarCliente(id: string): void {
    this.carregando = true;
    this.service.buscarPorId(id).subscribe({
      next: (cliente) => {
        if (cliente) {
          this.form.patchValue({
            nome: cliente.nome,
            cpf: cliente.cpf,
            email: cliente.email,
            telefone: cliente.telefone
          });
        }
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Cliente não encontrado.', 'Fechar', { duration: 3000 });
        this.router.navigate(['/clientes']);
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    const dadosForm = this.form.value;
    const clienteData: Cliente = {
      ...dadosForm,
      cpf: dadosForm.cpf.replace(/\D/g, '')
    };

    if (this.modoEdicao && this.idCliente) {
      clienteData.id = this.idCliente;
      this.service.editar(clienteData).subscribe({
        next: () => {
          this.salvando = false;
          this.snackBar.open('Cliente atualizado com sucesso!', 'OK', { duration: 3000 });
          this.router.navigate(['/clientes']);
        },
        error: () => {
          this.salvando = false;
          this.snackBar.open('Erro ao atualizar cliente.', 'Fechar', { duration: 3000 });
        }
      });
    } else {
      this.service.incluir(clienteData).subscribe({
        next: () => {
          this.salvando = false;
          this.snackBar.open('Cliente cadastrado com sucesso!', 'OK', { duration: 3000 });
          this.router.navigate(['/clientes']);
        },
        error: () => {
          this.salvando = false;
          this.snackBar.open('Erro ao cadastrar cliente.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
