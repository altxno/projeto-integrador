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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Estado do formulário e da tela (visibilidade da senha e indicador de espera).
  form: FormGroup;
  esconderSenha = true;
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // FormBuilder cria os campos e associa regras que o Angular valida.
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.email, Validators.maxLength(254)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]]
    });
  }

  entrar(): void {
    // Não consulta a API enquanto houver erro; marca campos para exibir mensagens.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Enquanto a API responde, o template pode mostrar um indicador de carregamento.
    this.carregando = true;
    const { email, senha } = this.form.value;

    // subscribe recebe o resultado assíncrono do serviço de autenticação.
    this.authService.login(email, senha).subscribe({
      next: (usuario) => {
        this.carregando = false;
        this.snackBar.open(`Bem-vindo de volta, ${usuario.nome}!`, 'OK', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.carregando = false;
        this.snackBar.open(err.message || 'Falha no login. Verifique seus dados.', 'Fechar', {
          duration: 3500
        });
      }
    });
  }

  preencherDemo(): void {
    // Preenche os campos com a conta de demonstração para facilitar o acesso local.
    this.form.patchValue({
      email: 'artista@atelie.com',
      senha: '123456'
    });
  }
}
