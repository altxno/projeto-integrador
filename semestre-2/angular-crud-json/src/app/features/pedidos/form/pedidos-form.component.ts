import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      clienteId: ['', [Validators.required]],
      tipoArte: ['Ilustração Digital', [Validators.required]],
      valor: [0, [Validators.required, Validators.min(1)]],
      dataEntrega: ['', [Validators.required]],
      status: ['Pendente', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.carregarClientes();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idPedido = id;
      this.modoEdicao = true;
      this.carregarPedido(id);
    }
  }

  carregarClientes(): void {
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
    const formVal = this.form.value;

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
}
