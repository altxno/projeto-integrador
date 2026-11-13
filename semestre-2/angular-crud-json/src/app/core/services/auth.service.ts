import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { Usuario } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = 'http://localhost:3000/usuarios';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private usuarioAtualSubject = new BehaviorSubject<Usuario | null>(this.obterUsuarioSalvo());
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  constructor(private http: HttpClient) { }

  private obterUsuarioSalvo(): Usuario | null {
    if (this.isBrowser) {
      const data = localStorage.getItem('usuario_logado');
      if (data) {
        try {
          return JSON.parse(data);
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  public get usuarioLogado(): Usuario | null {
    return this.usuarioAtualSubject.value;
  }

  public estaAutenticado(): boolean {
    return this.usuarioAtualSubject.value !== null;
  }

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.get<Usuario[]>(`${this.API}?email=${encodeURIComponent(email)}`).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha);
        if (!usuario) {
          throw new Error('E-mail ou senha inválidos.');
        }
        return usuario;
      }),
      tap(usuario => {
        if (this.isBrowser) {
          localStorage.setItem('usuario_logado', JSON.stringify(usuario));
        }
        this.usuarioAtualSubject.next(usuario);
      })
    );
  }

  registrar(novoUsuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, novoUsuario).pipe(
      tap(usuario => {
        if (this.isBrowser) {
          localStorage.setItem('usuario_logado', JSON.stringify(usuario));
        }
        this.usuarioAtualSubject.next(usuario);
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('usuario_logado');
    }
    this.usuarioAtualSubject.next(null);
  }
}
