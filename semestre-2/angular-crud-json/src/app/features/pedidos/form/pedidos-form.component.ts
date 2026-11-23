import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PedidosService } from '../../../core/services/pedidos.service';
import { ClientesService } from '../../../core/services/clientes.service';
import { Cliente } from '../../../core/models/cliente.model';
import { Pedido, StatusPedido } from '../../../core/models/pedido.model';
import { AuthService } from '../../../core/services/auth.service';

function formatarDataLocal(data: Date): string {
  // Monta AAAA-MM-DD usando a data local, sem conversão de fuso horário do navegador.
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function obterDataMaxima(): string {
  // Define o limite de entrega em cem anos a partir da data de hoje.
  const limite = new Date();
  limite.setFullYear(limite.getFullYear() + 100);
  return formatarDataLocal(limite);
}

function validarPrazoEntrega(control: AbstractControl): ValidationErrors | null {
  // O campo pode estar vazio durante o preenchimento; required verifica isso separadamente.
  const dataEntrega = String(control.value ?? '');

  if (!dataEntrega) {
    return null;
  }

  // Como as datas estão no padrão AAAA-MM-DD, comparar os textos ordena as datas corretamente.
  if (dataEntrega < formatarDataLocal(new Date())) {
    return { dataEntregaPassada: true };
  }

  if (dataEntrega > obterDataMaxima()) {
    return { dataEntregaMuitoDistante: true };
  }

  return null;
}

@Component({
  selector: 'app-pedidos-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css']
})
export class PedidosFormComponent implements OnInit {
  private readonly authService = inject(AuthService);

  form: FormGroup;
  idPedido: string | null = null;
  modoEdicao: boolean = false;
  carregando: boolean = false;
  salvando: boolean = false;

  readonly dataMinima = formatarDataLocal(new Date());
  readonly dataMaxima = obterDataMaxima();

  clientesDisponiveis: Cliente[] = [];

  categoriasArte: string[] = [
    'Ilustração Digital',
    'Concept Art',
    'Pintura Tradicional',
    'Pixel Art',
    'Design de Personagem',
    'Logo / Identidade Visual',
    'Retrato Personalizado',
    'Outro'
  ];

  statusOpcoes: StatusPedido[] = ['Pendente', 'Em Andamento', 'Concluído', 'Cancelado'];

  constructor(
    private fb: FormBuilder,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Associa cada campo às regras que o formulário precisa conferir.
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      clienteId: ['', [Validators.required]],
      tipoArte: ['Ilustração Digital', [Validators.required]],
      valor: [0, [Validators.required, Validators.min(1), Validators.max(999999999.99)]],
      dataEntrega: ['', [Validators.required, validarPrazoEntrega]],
      status: ['Pendente', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Carrega clientes para o seletor; um ID na rota significa que vamos editar pedido.
    this.carregarClientes();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idPedido = id;
      this.modoEdicao = true;
      this.carregarPedido(id);
    }
  }

  carregarClientes(): void {
    // Só carrega clientes da conta que está conectada.
    const usuarioId = this.authService.usuarioLogado?.id;
    if (usuarioId == null) {
      this.snackBar.open('Não foi possível identificar o usuário conectado.', 'Fechar', { duration: 3500 });
      return;
    }

    this.clientesService.listar(usuarioId).subscribe({
      next: (clientes) => {
        this.clientesDisponiveis = clientes;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar lista de clientes.', 'Fechar', { duration: 3000 });
      }
    });
  }

  carregarPedido(id: string): void {
    // Busca o pedido dentro dos registros da conta atual antes de preencher o formulário.
    const usuarioId = this.authService.usuarioLogado?.id;
    if (usuarioId == null) {
      this.router.navigate(['/login']);
      return;
    }

    this.carregando = true;
    this.pedidosService.buscarPorId(id, usuarioId).subscribe({
      next: (pedido) => {
        if (pedido) {
          this.form.patchValue({
            titulo: pedido.titulo,
            descricao: pedido.descricao,
            clienteId: pedido.clienteId,
            tipoArte: pedido.tipoArte,
            valor: pedido.valor,
            dataEntrega: pedido.dataEntrega,
            status: pedido.status
          });
        }
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Comissão não encontrada.', 'Fechar', { duration: 3000 });
        this.router.navigate(['/pedidos']);
      }
    });
  }

  salvar(): void {
    // Valida conteúdo antes de montar o objeto enviado ao serviço.
    if (!this.validarLimitesCampos() || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuarioId = this.authService.usuarioLogado?.id;
    if (usuarioId == null) {
      this.snackBar.open('Não foi possível identificar o usuário conectado.', 'Fechar', { duration: 3500 });
      return;
    }

    this.salvando = true;
    const formVal = this.form.value;

    // Encontra o cliente selecionado para guardar também o nome junto ao pedido.
    const clienteSelecionado = this.clientesDisponiveis.find(
      c => String(c.id) === String(formVal.clienteId)
    );

    const pedidoData: Pedido = {
      ...formVal,
      usuarioId,
      clienteNome: clienteSelecionado ? clienteSelecionado.nome : 'Cliente Desconhecido',
      valor: Number(formVal.valor)
    };

    if (this.modoEdicao && this.idPedido) {
      // No modo edição atualiza o item existente; caso contrário cria outro.
      pedidoData.id = this.idPedido;
      this.pedidosService.editar(pedidoData, usuarioId).subscribe({
        next: () => {
          this.salvando = false;
          this.snackBar.open('Comissão atualizada com sucesso!', 'OK', { duration: 3000 });
          this.router.navigate(['/pedidos']);
        },
        error: () => {
          this.salvando = false;
          this.snackBar.open('Erro ao atualizar comissão.', 'Fechar', { duration: 3000 });
        }
      });
    } else {
      this.pedidosService.incluir(pedidoData).subscribe({
        next: () => {
          this.salvando = false;
          this.snackBar.open('Comissão cadastrada com sucesso!', 'OK', { duration: 3000 });
          this.router.navigate(['/pedidos']);
        },
        error: () => {
          this.salvando = false;
          this.snackBar.open('Erro ao cadastrar comissão.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  private validarLimitesCampos(): boolean {
    // Regras conferidas no envio como proteção adicional às validações visuais do formulário.
    const limites: Record<string, { min: number; max: number }> = {
      titulo: { min: 3, max: 100 },
      descricao: { min: 5, max: 500 }
    };
    let valido = true;

    for (const [campo, limite] of Object.entries(limites)) {
      // Marca o campo inválido e preserva outros erros que já existam nele.
      const controle = this.form.get(campo);
      const tamanho = String(controle?.value ?? '').length;
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

    const controleValor = this.form.get('valor');
    const valor = Number(controleValor?.value);
    if (!Number.isFinite(valor) || valor < 1) {
      controleValor?.setErrors({ ...(controleValor.errors ?? {}), min: { min: 1, actual: valor } });
      controleValor?.markAsTouched();
      valido = false;
    } else if (valor > 999999999.99) {
      controleValor?.setErrors({ ...(controleValor.errors ?? {}), max: { max: 999999999.99, actual: valor } });
      controleValor?.markAsTouched();
      valido = false;
    }

    return valido;
  }
}
