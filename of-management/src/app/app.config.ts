import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http'; // permite fazer chamadas HTTP para o backend

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(), // registra o HttpClient para todos os services poderem usar

    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/auth.component').then(m => m.AuthComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders/orders.component').then(m => m.OrdersComponent),
      },
      {
        path: 'fornecedores',
        loadComponent: () =>
          import('./pages/fornecedores/fornecedores.component').then(m => m.FornecedoresComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/produtos/produtos.component').then(m => m.produtosComponents),
      },
      {
        path: 'team',
        loadComponent: () =>
          import('./pages/equipe/equipe.component').then(m => m.equipeComponents),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/usuario/usuario.component').then(m => m.UsuarioComponent),
      },
    ]),
  ],
};
