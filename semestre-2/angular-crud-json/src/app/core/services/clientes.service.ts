import { Injectable } from '@angular/core';
import { Cliente } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://localhost:3000/clientes';
  constructor(private http: HttpClient) { }

  //Faz um GET para pegar todos os clientes.
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  //Faz um POST com um novo cliente para adicionar no banco de dados.
  incluir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  //Faz um DELETE para excluir um cliente no banco de dados.
  excluir(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(this.API + `/${id}`);
  }

  editar(cliente: Cliente): Observable<Cliente> {
    const url = `${this.API}/${cliente.id}`
    return this.http.put<Cliente>(url, cliente)
  }

  buscarPorId(id: number): Observable<Cliente | undefined> {
    return this.http.get<Cliente>(this.API + `/${id}`);
  }

}
