import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';

function confirmarSenhaValidator(control: AbstractControl): ValidationErrors | null {
  const senha = control.get('senha')?.value;
  const confirmar = control.get('confirmarSenha')?.value;
  if (senha && confirmar && senha !== confirmar) {
    return { senhasDivergentes: true };
  }
  return null;
}

@Component({
  selector: 'app-registro',
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
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form: FormGroup;
  esconderSenha = true;
  esconderConfirmacao = true;
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[\p{L}\p{M}][\p{L}\p{M} .’'-]*$/u)
      ]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.email, Validators.maxLength(254)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]],
      confirmarSenha: ['', [Validators.required, Validators.maxLength(128)]]
    }, { validators: confirmarSenhaValidator });
  }

  registrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando = true;
    const { nome, email, senha } = this.form.value;

    this.authService.registrar({ nome, email, senha }).subscribe({
      next: () => {
        this.carregando = false;
        this.snackBar.open('Usuário criado com sucesso! Acesso liberado.', 'OK', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (erro: Error) => {
        this.carregando = false;
        const controleEmail = this.form.get('email');

        if (erro.message === 'EMAIL_DUPLICADO' && controleEmail) {
          controleEmail.setErrors({ ...(controleEmail.errors ?? {}), emailEmUso: true });
          controleEmail.markAsTouched();
          return;
        }

        this.snackBar.open('Erro ao criar usuário. Tente novamente.', 'Fechar', { duration: 3500 });
      }
    });
  }
}
