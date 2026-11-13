import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private readonly API = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) { }

  listar(usuarioId: string | number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API, {
      params: { usuarioId: String(usuarioId) }
    });
  }

  buscarPorId(id: number | string, usuarioId: string | number): Observable<Pedido> {
    return this.http.get<Pedido[]>(this.API, {
      params: { id: String(id), usuarioId: String(usuarioId) }
    }).pipe(
      map(pedidos => {
        const pedido = pedidos[0];
        if (!pedido) throw new Error('Pedido não encontrado para este usuário.');
        return pedido;
      })
    );
  }

  incluir(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.API, pedido);
  }

  editar(pedido: Pedido, usuarioId: string | number): Observable<Pedido> {
    return this.buscarPorId(pedido.id!, usuarioId).pipe(
      switchMap(() => this.http.put<Pedido>(`${this.API}/${pedido.id}`, { ...pedido, usuarioId }))
    );
  }

  excluir(id: number | string, usuarioId: string | number): Observable<void> {
    return this.buscarPorId(id, usuarioId).pipe(
      switchMap(() => this.http.delete<void>(`${this.API}/${id}`))
    );
  }
}
