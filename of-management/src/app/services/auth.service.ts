import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UsuarioLogado {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  // LOGIN HTTP (QUARKUS)
  loginRequest(email: string, senha: string) {
    return this.http.post<any>(
        'http://localhost:8081/auth/login',
        { email, senha }
    );
  }

  // SALVAR TOKEN
  login(token: string) {
    console.log('SALVANDO TOKEN:', token);
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getUsuario(): UsuarioLogado | null {
    const token = this.getToken();
    if (!token) return null;

    return {
      email: '',
      token
    };
  }
}