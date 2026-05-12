import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioSistema } from '../pages/equipe/equipe.component';

/** Formato bruto que o backend retorna para Usuario */
interface UsuarioApi {
  id_usuario: number;
  nome:       string;
  email:      string;
  senha:      string;
  perfil:     'ADMIN' | 'SOLICITANTE' | 'APROVADOR';
  ativo:      boolean;
}

/** Corpo da requisição POST/PUT */
interface UsuarioBody {
  nome:   string;
  email:  string;
  senha:  string;
  perfil: string;
  ativo:  boolean;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private readonly apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<UsuarioSistema[]> {
    return this.http.get<UsuarioApi[]>(this.apiUrl).pipe(
      map(lista => lista.map(u => this.mapear(u)))
    );
  }

  criar(usuario: UsuarioSistema, senha: string): Observable<UsuarioSistema> {
    return this.http.post<UsuarioApi>(this.apiUrl, this.paraBody(usuario, senha)).pipe(
      map(u => this.mapear(u))
    );
  }

  atualizar(usuario: UsuarioSistema, senha: string): Observable<UsuarioSistema> {
    return this.http.put<UsuarioApi>(`${this.apiUrl}/${usuario.id_usuario}`, this.paraBody(usuario, senha)).pipe(
      map(u => this.mapear(u))
    );
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapear(u: UsuarioApi): UsuarioSistema {
    return {
      id_usuario: u.id_usuario,
      nome:       u.nome,
      email:      u.email,
      perfil:     u.perfil,
      ativo:      u.ativo,
    };
  }

  private paraBody(u: UsuarioSistema, senha: string): UsuarioBody {
    return {
      nome:   u.nome,
      email:  u.email,
      senha:  senha || '123456',
      perfil: u.perfil,
      ativo:  u.ativo,
    };
  }
}
