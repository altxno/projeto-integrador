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
  // Lê os dois campos do grupo para comparar as senhas.
  const senha = control.get('senha')?.value;
  const confirmar = control.get('confirmarSenha')?.value;
  // Retorna um erro no grupo quando as senhas foram preenchidas e não coincidem.
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
    // Define campos e regras: tamanho, formato do e-mail, nome sem números e senha.
    // A validação de confirmação compara dois campos do formulário como conjunto.
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
    // Impede o envio enquanto houver campos inválidos.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Envia os dados validados ao AuthService para verificar e gravar a conta.
    this.carregando = true;
    const { nome, email, senha } = this.form.value;

    // Trata sucesso e falha da requisição sem bloquear a tela.
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
          // Devolve a duplicidade ao controle para o formulário mostrar a mensagem certa.
          controleEmail.setErrors({ ...(controleEmail.errors ?? {}), emailEmUso: true });
          controleEmail.markAsTouched();
          return;
        }

        this.snackBar.open('Erro ao criar usuário. Tente novamente.', 'Fechar', { duration: 3500 });
      }
    });
  }
}
