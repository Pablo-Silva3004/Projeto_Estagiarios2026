import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout';
import { CollaboratorsPageComponent } from './pages/collaborators/collaborators-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { OrdersPageComponent } from './pages/orders/orders-page.component';
import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { UsersPageComponent } from './pages/users/users-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'usuarios', component: UsersPageComponent },
      { path: 'colaboradores', component: CollaboratorsPageComponent },
      { path: 'ordens-fabricacao', component: OrdersPageComponent },
      { path: 'meu-perfil', component: ProfilePageComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
