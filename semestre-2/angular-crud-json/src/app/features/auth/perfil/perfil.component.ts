import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { Usuario } from '../../../core/models/usuario.model';

function validarConfirmacaoSenha(control: AbstractControl): ValidationErrors | null {
  const senha = control.get('novaSenha')?.value;
  const confirmacao = control.get('confirmarSenha')?.value;

  if (!senha && !confirmacao) {
    return null;
  }

  return senha === confirmacao ? null : { senhasDivergentes: true };
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  salvando = false;

  readonly form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.email, Validators.maxLength(254)]],
    novaSenha: ['', [Validators.minLength(6), Validators.maxLength(128)]],
    confirmarSenha: ['', [Validators.maxLength(128)]]
  }, { validators: validarConfirmacaoSenha });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const usuario = this.authService.usuarioLogado;
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.form.patchValue({ nome: usuario.nome, email: usuario.email });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuarioAtual = this.authService.usuarioLogado;
    if (!usuarioAtual || usuarioAtual.id == null) {
      this.snackBar.open('Não foi possível identificar a conta atual.', 'Fechar', { duration: 3500 });
      return;
    }

    const { nome, email, novaSenha } = this.form.getRawValue();
    const usuarioAtualizado: Usuario = {
      ...usuarioAtual,
      nome: nome!.trim(),
      email: email!.trim(),
      senha: novaSenha || usuarioAtual.senha
    };

    this.salvando = true;
    this.authService.atualizar(usuarioAtualizado).subscribe({
      next: (usuario) => {
        this.salvando = false;
        this.form.patchValue({ nome: usuario.nome, email: usuario.email, novaSenha: '', confirmarSenha: '' });
        this.snackBar.open('Perfil atualizado com sucesso.', 'OK', { duration: 3000 });
      },
      error: (erro: Error) => {
        this.salvando = false;

        if (erro.message === 'EMAIL_DUPLICADO') {
          const controleEmail = this.form.get('email');
          controleEmail?.setErrors({ ...(controleEmail.errors ?? {}), emailEmUso: true });
          controleEmail?.markAsTouched();
          return;
        }

        this.snackBar.open('Não foi possível atualizar o perfil.', 'Fechar', { duration: 3500 });
      }
    });
  }
}
