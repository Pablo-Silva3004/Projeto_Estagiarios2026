import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface UsuarioLogado {
  id_usuario: number;
  nome:        string;
  email:       string;
  perfil:      string;
  ativo:       boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly apiUrl = 'http://localhost:8080/usuarios/login';
  private usuarioAtual: UsuarioLogado | null = null;

  constructor(private http: HttpClient) {
    // Recupera sessão salva (persiste reload da página)
    const salvo = localStorage.getItem('usuario');
    if (salvo) this.usuarioAtual = JSON.parse(salvo);
  }

  // Chama o backend — retorna Observable com o usuário ou lança erro 401
  login(email: string, senha: string): Observable<UsuarioLogado> {
    return this.http.post<UsuarioLogado>(this.apiUrl, { email, senha }).pipe(
      tap(usuario => {
        this.usuarioAtual = usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));
      })
    );
  }

  logout(): void {
    this.usuarioAtual = null;
    localStorage.removeItem('usuario');
  }

  estaLogado(): boolean {
    return this.usuarioAtual !== null;
  }

  getUsuario(): UsuarioLogado | null {
    return this.usuarioAtual;
  }
}
