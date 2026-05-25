import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/auth/auth.component')
                .then(m => m.AuthComponent),
    },

    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/dashboard/dashboard.component')
                .then(m => m.DashboardComponent),
    },

    // ORDERS (ordens-fornecimento)
    {
        path: 'orders',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/orders/orders.component')
                .then(m => m.OrdersComponent),
    },

    // PRODUTOS
    {
        path: 'products',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/produtos/produtos.component')
                .then(m => m.produtosComponents),
    },

    // FORNECEDORES
    {
        path: 'fornecedores',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/fornecedores/fornecedores.component')
                .then(m => m.FornecedoresComponent),
    },

    // EQUIPE / USERS
    {
        path: 'team',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/equipe/equipe.component')
                .then(m => m.equipeComponents),
    },

    // USUÁRIOS (CRUD)
    {
        path: 'usuarios',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/usuarios/usuarios.component')
                .then(m => m.UsuariosComponent),
    },

    {
        path: 'settings',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/usuario/usuario.component')
                .then(m => m.UsuarioComponent),

    },

    { path: '', redirectTo: 'login', pathMatch: 'full' }
];