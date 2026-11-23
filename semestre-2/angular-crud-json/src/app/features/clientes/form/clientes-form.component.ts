import { Component, inject, OnInit } from '@angular/core';
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
import { Cliente } from '../../../core/models/cliente.model';
import { validarCpf } from '../../../core/validators/cpf.validator';
import { validarTelefone } from '../../../core/validators/telefone.validator';
import { AuthService } from '../../../core/services/auth.service';

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
  private readonly authService = inject(AuthService);

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
      cpf: ['', [Validators.required, Validators.maxLength(14), validarCpf]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.email, Validators.maxLength(254)]],
      telefone: ['', [Validators.required, Validators.maxLength(20), validarTelefone]]
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
    const usuarioId = this.authService.usuarioLogado?.id;
    if (usuarioId == null) {
      this.router.navigate(['/login']);
      return;
    }

    this.carregando = true;
    this.service.buscarPorId(id, usuarioId).subscribe({
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

    const usuarioId = this.authService.usuarioLogado?.id;
    if (usuarioId == null) {
      this.snackBar.open('Não foi possível identificar o usuário conectado.', 'Fechar', { duration: 3500 });
      return;
    }

    this.salvando = true;
    const cpf = String(this.form.get('cpf')?.value ?? '').replace(/\D/g, '');

    this.service.listar(usuarioId).subscribe({
      next: (clientes) => {
        const cpfDuplicado = clientes.some(cliente =>
          String(cliente.cpf).replace(/\D/g, '') === cpf &&
          String(cliente.id) !== String(this.idCliente)
        );

        if (cpfDuplicado) {
          const controleCpf = this.form.get('cpf');
          const errosAtuais = controleCpf?.errors ?? {};
          controleCpf?.setErrors({ ...errosAtuais, cpfDuplicado: true });
          controleCpf?.markAsTouched();
          this.salvando = false;
          return;
        }

        this.salvarCliente(usuarioId);
      },
      error: () => {
        this.salvando = false;
        this.snackBar.open('Não foi possível verificar se o CPF já está cadastrado.', 'Fechar', { duration: 3500 });
      }
    });
  }

  private salvarCliente(usuarioId: string | number): void {
    const dadosForm = this.form.value;
    const clienteData: Cliente = {
      ...dadosForm,
      usuarioId,
      cpf: dadosForm.cpf.replace(/\D/g, '')
    };

    if (this.modoEdicao && this.idCliente) {
      clienteData.id = this.idCliente;
      this.service.editar(clienteData, usuarioId).subscribe({
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
