import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  // Obtém os dois controles do formulário para confirmar uma troca de senha.
  const senha = control.get('novaSenha')?.value;
  const confirmacao = control.get('confirmarSenha')?.value;

  // Os dois campos vazios significam que a pessoa não quer trocar a senha.
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
  readonly form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Cria o formulário com as mesmas regras de nome/e-mail e senha opcional.
    this.form = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[\p{L}\p{M}][\p{L}\p{M} .’'-]*$/u)
      ]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.email, Validators.maxLength(254)]],
      novaSenha: ['', [Validators.minLength(6), Validators.maxLength(128)]],
      confirmarSenha: ['', [Validators.maxLength(128)]]
    }, { validators: validarConfirmacaoSenha });

    const usuario = this.authService.usuarioLogado;
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    // Mostra os dados existentes para que a pessoa edite apenas o que deseja.
    this.form.patchValue({ nome: usuario.nome, email: usuario.email });
  }

  salvar(): void {
    // Confere limites de texto e validadores antes de continuar.
    if (!this.validarLimitesCampos() || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuarioAtual = this.authService.usuarioLogado;
    if (!usuarioAtual || usuarioAtual.id == null) {
      this.snackBar.open('Não foi possível identificar a conta atual.', 'Fechar', { duration: 3500 });
      return;
    }

    // Mantém os dados atuais, aplica as mudanças e só troca a senha se foi preenchida.
    const { nome, email, novaSenha } = this.form.getRawValue();
    const usuarioAtualizado: Usuario = {
      ...usuarioAtual,
      nome: nome!.trim(),
      email: email!.trim(),
      senha: novaSenha || usuarioAtual.senha
    };

    // Solicita ao serviço que confira o e-mail e grave as alterações.
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
          // Marca especificamente o campo e permite que o template explique o conflito.
          const controleEmail = this.form.get('email');
          controleEmail?.setErrors({ ...(controleEmail.errors ?? {}), emailEmUso: true });
          controleEmail?.markAsTouched();
          return;
        }

        this.snackBar.open('Não foi possível atualizar o perfil.', 'Fechar', { duration: 3500 });
      }
    });
  }

  private validarLimitesCampos(): boolean {
    // Regras repetidas aqui também são conferidas no envio, mesmo se o HTML for alterado.
    const limites: Record<string, { min: number; max: number; opcional?: boolean; apararEspacos?: boolean }> = {
      nome: { min: 3, max: 100, apararEspacos: true },
      email: { min: 5, max: 254, apararEspacos: true },
      novaSenha: { min: 6, max: 128, opcional: true },
      confirmarSenha: { min: 6, max: 128, opcional: true }
    };
    let valido = true;

    for (const [campo, limite] of Object.entries(limites)) {
      // Percorre cada campo configurado e mede o texto, ignorando espaços externos quando pedido.
      const controle = this.form.get(campo);
      const valor = String(controle?.value ?? '');
      if (limite.opcional && !valor) continue;

      const tamanho = limite.apararEspacos ? valor.trim().length : valor.length;
      const erros: ValidationErrors = { ...(controle?.errors ?? {}) };

      if (tamanho < limite.min) {
        erros['minlength'] = { requiredLength: limite.min, actualLength: tamanho };
        controle?.setErrors(erros);
        controle?.markAsTouched();
        valido = false;
      } else if (tamanho > limite.max) {
        erros['maxlength'] = { requiredLength: limite.max, actualLength: tamanho };
        controle?.setErrors(erros);
        controle?.markAsTouched();
        valido = false;
      }
    }

    return valido;
  }
}
