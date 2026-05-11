import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  // Links de navegação da sidebar
  links = [
    { icone: 'dashboard',       label: 'Dashboard',              rota: '/dashboard'    },
    { icone: 'assignment',      label: 'Ordens',                 rota: '/orders'       },
    { icone: 'store',           label: 'Fornecedores',           rota: '/fornecedores' },
    { icone: 'inventory_2',     label: 'Produtos',               rota: '/products'     },
    { icone: 'manage_accounts', label: 'Usuários',               rota: '/team'         },
    { icone: 'account_circle',  label: 'Meu Perfil',             rota: '/settings'     },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  // Faz logout e vai para a tela de login
  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
