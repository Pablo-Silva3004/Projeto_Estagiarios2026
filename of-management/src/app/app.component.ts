import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  template: `
    <!-- Layout com sidebar (todas as rotas exceto /login) -->
    <div *ngIf="mostrarSidebar; else semSidebar" class="app-layout">
      <app-sidebar></app-sidebar>
      <main class="app-conteudo">
        <router-outlet></router-outlet>
      </main>
    </div>

    <!-- Sem sidebar: somente na tela de login/cadastro -->
    <ng-template #semSidebar>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .app-layout {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .app-conteudo {
      flex: 1;
      overflow-y: auto;
      background-color: #f0f2f5;
    }
  `],
})
export class AppComponent implements OnInit {
  mostrarSidebar = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Atualiza a flag toda vez que a navegação termina
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mostrarSidebar = !event.urlAfterRedirects.startsWith('/login');
      }
    });
  }
}
