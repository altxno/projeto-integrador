import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { proximoIdNumerico } from '../utils/id.util';

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
      tap(usuario => this.atualizarSessao(usuario))
    );
  }

  registrar(novoUsuario: Usuario): Observable<Usuario> {
    const usuario = { ...novoUsuario, email: novoUsuario.email.trim() };

    return this.usuariosComEmailDisponivel(usuario.email).pipe(
      map(usuarios => ({ ...usuario, id: proximoIdNumerico(usuarios) })),
      switchMap(usuarioComId => this.http.post<Usuario>(this.API, usuarioComId)),
      tap(usuario => this.atualizarSessao(usuario))
    );
  }

  atualizar(usuarioAtualizado: Usuario): Observable<Usuario> {
    const usuario = { ...usuarioAtualizado, email: usuarioAtualizado.email.trim() };

    return this.usuariosComEmailDisponivel(usuario.email, usuario.id).pipe(
      map(() => usuario),
      switchMap(() => this.http.put<Usuario>(`${this.API}/${usuario.id}`, usuario)),
      tap(usuario => this.atualizarSessao(usuario))
    );
  }

  private usuariosComEmailDisponivel(email: string, ignorarId?: string | number): Observable<Usuario[]> {
    const emailNormalizado = email.trim().toLowerCase();

    return this.http.get<Usuario[]>(this.API).pipe(
      map(usuarios => {
        const emailEmUso = usuarios.some(usuario =>
          (ignorarId == null || String(usuario.id) !== String(ignorarId)) &&
          usuario.email.trim().toLowerCase() === emailNormalizado
        );

        if (emailEmUso) {
          throw new Error('EMAIL_DUPLICADO');
        }

        return usuarios;
      })
    );
  }

  private atualizarSessao(usuario: Usuario): void {
    if (this.isBrowser) {
      localStorage.setItem('usuario_logado', JSON.stringify(usuario));
    }
    this.usuarioAtualSubject.next(usuario);
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('usuario_logado');
    }
    this.usuarioAtualSubject.next(null);
  }
}
