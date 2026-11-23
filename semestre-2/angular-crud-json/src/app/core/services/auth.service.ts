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
  // URL da coleção de contas na API local.
  private readonly API = 'http://localhost:3000/usuarios';
  // Identifica se o app está no navegador ou durante renderização no servidor.
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // BehaviorSubject guarda o usuário atual e avisa as telas quando ele muda.
  private usuarioAtualSubject = new BehaviorSubject<Usuario | null>(this.obterUsuarioSalvo());
  // Expõe apenas a versão observável, sem permitir que telas alterem o estado diretamente.
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  constructor(private http: HttpClient) { }

  private obterUsuarioSalvo(): Usuario | null {
    if (this.isBrowser) {
      // O navegador mantém a sessão entre atualizações da página usando localStorage.
      const data = localStorage.getItem('usuario_logado');
      if (data) {
        try {
          // JSON.parse transforma o texto salvo de volta em um objeto Usuario.
          return JSON.parse(data);
        } catch {
          // Se o conteúdo estiver corrompido, trata como se não houvesse sessão.
          return null;
        }
      }
    }
    return null;
  }

  public get usuarioLogado(): Usuario | null {
    // Retorna o valor atual sem precisar se inscrever no fluxo de mudanças.
    return this.usuarioAtualSubject.value;
  }

  public estaAutenticado(): boolean {
    // Nesta aplicação, usuário não nulo significa que há uma sessão local ativa.
    return this.usuarioAtualSubject.value !== null;
  }

  login(email: string, senha: string): Observable<Usuario> {
    // Procura contas com o e-mail; depois compara e-mail sem diferenciar maiúsculas
    // e confere a senha. tap() guarda a sessão quando a busca dá certo.
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
    // Remove espaços sobrando no e-mail antes de verificar duplicidade e salvar.
    const usuario = { ...novoUsuario, email: novoUsuario.email.trim() };

    // Primeiro verifica se o e-mail já existe; em seguida calcula o ID e faz o POST.
    return this.usuariosComEmailDisponivel(usuario.email).pipe(
      map(usuarios => ({ ...usuario, id: proximoIdNumerico(usuarios) })),
      switchMap(usuarioComId => this.http.post<Usuario>(this.API, usuarioComId)),
      tap(usuario => this.atualizarSessao(usuario))
    );
  }

  atualizar(usuarioAtualizado: Usuario): Observable<Usuario> {
    // Mantém os demais dados da conta e normaliza o e-mail informado.
    const usuario = { ...usuarioAtualizado, email: usuarioAtualizado.email.trim() };

    // Verifica o e-mail ignorando o próprio usuário e depois substitui o registro (PUT).
    return this.usuariosComEmailDisponivel(usuario.email, usuario.id).pipe(
      map(() => usuario),
      switchMap(() => this.http.put<Usuario>(`${this.API}/${usuario.id}`, usuario)),
      tap(usuario => this.atualizarSessao(usuario))
    );
  }

  private usuariosComEmailDisponivel(email: string, ignorarId?: string | number): Observable<Usuario[]> {
    // Comparar tudo em minúsculas faz "A@exemplo.com" e "a@exemplo.com" serem iguais.
    const emailNormalizado = email.trim().toLowerCase();

    return this.http.get<Usuario[]>(this.API).pipe(
      map(usuarios => {
        // some() retorna verdadeiro se encontrar outra conta usando este e-mail.
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
      // JSON.stringify converte o objeto em texto para armazená-lo no navegador.
      localStorage.setItem('usuario_logado', JSON.stringify(usuario));
    }
    // Notifica header e demais partes inscritas que o usuário mudou.
    this.usuarioAtualSubject.next(usuario);
  }

  logout(): void {
    if (this.isBrowser) {
      // Remove a cópia persistida da sessão.
      localStorage.removeItem('usuario_logado');
    }
    // null representa que não há uma conta conectada.
    this.usuarioAtualSubject.next(null);
  }
}
