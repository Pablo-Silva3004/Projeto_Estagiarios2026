import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Controla se o usuário está autenticado
  private logado = false;

  // Faz login (mock: aceita sempre)
  login() {
    this.logado = true;
  }

  // Faz logout
  logout() {
    this.logado = false;
  }

  // Retorna se o usuário está autenticado
  estaLogado(): boolean {
    return this.logado;
  }
}
