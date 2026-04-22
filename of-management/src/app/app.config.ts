import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),

    provideRouter([
      // Rota raiz redireciona para login
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/auth.component').then(m => m.AuthComponent),
      },

      // Rotas protegidas (precisa estar logado)
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
