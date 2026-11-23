import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { proximoIdNumerico } from '../utils/id.util';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  // Endereço da coleção de comissões no JSON Server.
  private readonly API = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) { }

  // Retorna os pedidos associados à conta informada.
  listar(usuarioId: string | number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API, {
      params: { usuarioId: String(usuarioId) }
    });
  }

  // Procura o pedido pelo ID e pelo usuário que é dono dele.
  buscarPorId(id: number | string, usuarioId: string | number): Observable<Pedido> {
    return this.http.get<Pedido[]>(this.API, {
      params: { id: String(id), usuarioId: String(usuarioId) }
    }).pipe(
      map(pedidos => {
        // O JSON Server responde com uma lista; usamos o primeiro resultado.
        const pedido = pedidos[0];
        if (!pedido) throw new Error('Pedido não encontrado para este usuário.');
        return pedido;
      })
    );
  }

  // Calcula um ID sequencial e envia a nova comissão à API (POST).
  incluir(pedido: Pedido): Observable<Pedido> {
    return this.http.get<Pedido[]>(this.API).pipe(
      map(pedidos => ({ ...pedido, id: proximoIdNumerico(pedidos) })),
      switchMap(pedidoComId => this.http.post<Pedido>(this.API, pedidoComId))
    );
  }

  // Confirma o dono antes de substituir os dados da comissão (PUT).
  editar(pedido: Pedido, usuarioId: string | number): Observable<Pedido> {
    return this.buscarPorId(pedido.id!, usuarioId).pipe(
      switchMap(() => this.http.put<Pedido>(`${this.API}/${pedido.id}`, { ...pedido, usuarioId }))
    );
  }

  // Confirma o dono antes de apagar a comissão (DELETE).
  excluir(id: number | string, usuarioId: string | number): Observable<void> {
    return this.buscarPorId(id, usuarioId).pipe(
      switchMap(() => this.http.delete<void>(`${this.API}/${id}`))
    );
  }
}
