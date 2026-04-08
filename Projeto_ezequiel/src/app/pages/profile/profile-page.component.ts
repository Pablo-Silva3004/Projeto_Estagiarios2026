import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  template: `
    <h2>Meu Perfil</h2>
    <p>Área inicial para dados do usuário autenticado e futuras ações de perfil.</p>
  `,
  styles: [`h2{margin:0 0 .5rem;} p{margin:0;color:#64748b;}`]
})
export class ProfilePageComponent {}
