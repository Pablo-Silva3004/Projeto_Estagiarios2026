import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { authGuard } from './guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),

    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      // Rota pública — sem guard
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/auth.component').then(m => m.AuthComponent),
      },

      // Rotas protegidas — só acessa quem estiver logado
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'orders',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/orders/orders.component').then(m => m.OrdersComponent),
      },
      {
        path: 'fornecedores',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/fornecedores/fornecedores.component').then(m => m.FornecedoresComponent),
      },
      {
        path: 'products',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/produtos/produtos.component').then(m => m.produtosComponents),
      },
      {
        path: 'team',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/equipe/equipe.component').then(m => m.equipeComponents),
      },
      {
        path: 'settings',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/usuario/usuario.component').then(m => m.UsuarioComponent),
      },
    ]),
  ],
};
