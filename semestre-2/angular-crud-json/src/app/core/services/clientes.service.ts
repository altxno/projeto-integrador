import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { proximoIdNumerico } from '../utils/id.util';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  // Endereço da coleção de clientes fornecida pelo JSON Server.
  private readonly API = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) { }

  // Busca apenas os clientes associados ao usuário informado.
  listar(usuarioId: string | number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API, {
      params: { usuarioId: String(usuarioId) }
    });
  }

  // Busca um registro pelo ID e pelo usuário dono.
  buscarPorId(id: number | string, usuarioId: string | number): Observable<Cliente> {
    return this.http.get<Cliente[]>(this.API, {
      params: { id: String(id), usuarioId: String(usuarioId) }
    }).pipe(
      map(clientes => {
        // A consulta do JSON Server devolve uma lista; o primeiro item é o encontrado.
        const cliente = clientes[0];
        if (!cliente) throw new Error('Cliente não encontrado para este usuário.');
        return cliente;
      })
    );
  }

  // Lê os registros para gerar um ID e depois envia o novo cliente (POST).
  incluir(cliente: Cliente): Observable<Cliente> {
    return this.http.get<Cliente[]>(this.API).pipe(
      map(clientes => ({ ...cliente, id: proximoIdNumerico(clientes) })),
      switchMap(clienteComId => this.http.post<Cliente>(this.API, clienteComId))
    );
  }

  // Confirma que o cliente pertence ao usuário antes de substituir os dados (PUT).
  editar(cliente: Cliente, usuarioId: string | number): Observable<Cliente> {
    const url = `${this.API}/${cliente.id}`;
    return this.buscarPorId(cliente.id!, usuarioId).pipe(
      switchMap(() => this.http.put<Cliente>(url, { ...cliente, usuarioId }))
    );
  }

  // Confirma o proprietário antes de remover o registro (DELETE).
  excluir(id: number | string, usuarioId: string | number): Observable<void> {
    return this.buscarPorId(id, usuarioId).pipe(
      switchMap(() => this.http.delete<void>(`${this.API}/${id}`))
    );
  }
}
