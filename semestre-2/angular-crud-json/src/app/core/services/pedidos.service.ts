import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private readonly API = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API);
  }

  buscarPorId(id: number | string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.API}/${id}`);
  }

  incluir(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.API, pedido);
  }

  editar(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.API}/${pedido.id}`, pedido);
  }

  excluir(id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }
}
