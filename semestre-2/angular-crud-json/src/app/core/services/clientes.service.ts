import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) { }

  listar(usuarioId: string | number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API, {
      params: { usuarioId: String(usuarioId) }
    });
  }

  buscarPorId(id: number | string, usuarioId: string | number): Observable<Cliente> {
    return this.http.get<Cliente[]>(this.API, {
      params: { id: String(id), usuarioId: String(usuarioId) }
    }).pipe(
      map(clientes => {
        const cliente = clientes[0];
        if (!cliente) throw new Error('Cliente não encontrado para este usuário.');
        return cliente;
      })
    );
  }

  incluir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  editar(cliente: Cliente, usuarioId: string | number): Observable<Cliente> {
    const url = `${this.API}/${cliente.id}`;
    return this.buscarPorId(cliente.id!, usuarioId).pipe(
      switchMap(() => this.http.put<Cliente>(url, { ...cliente, usuarioId }))
    );
  }

  excluir(id: number | string, usuarioId: string | number): Observable<void> {
    return this.buscarPorId(id, usuarioId).pipe(
      switchMap(() => this.http.delete<void>(`${this.API}/${id}`))
    );
  }
}
