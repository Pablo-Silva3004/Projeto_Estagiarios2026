import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  template: `
    <h2>Ordens de Fabricação (OF)</h2>
    <p>Tela placeholder para consulta, cadastro e acompanhamento das ordens.</p>
  `,
  styles: [`h2{margin:0 0 .5rem;} p{margin:0;color:#64748b;}`]
})
export class OrdersPageComponent {}
