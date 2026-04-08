import { Component } from '@angular/core';

@Component({
  selector: 'app-users-page',
  standalone: true,
  template: `
    <h2>Usuários</h2>
    <p>Tela placeholder para futura listagem, cadastro e manutenção de usuários.</p>
  `,
  styles: [`h2{margin:0 0 .5rem;} p{margin:0;color:#64748b;}`]
})
export class UsersPageComponent {}
