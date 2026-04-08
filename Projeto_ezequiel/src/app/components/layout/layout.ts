import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  allowedRoles: string[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {
  protected readonly systemName = 'Sistema de Ordens de Fornecimento';
  protected readonly userName = 'Usuário Logado';
  protected readonly userRole = 'Administrador';
  protected readonly isSidebarCollapsed = signal(false);
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly isProfileMenuOpen = signal(false);

  protected readonly menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '📊', allowedRoles: ['Administrador', 'RT', 'Gerente', 'Colaborador'] },
    { label: 'Usuários', route: '/usuarios', icon: '👤', allowedRoles: ['Administrador'] },
    { label: 'Colaboradores', route: '/colaboradores', icon: '👥', allowedRoles: ['Administrador', 'RT', 'Gerente'] },
    { label: 'Ordens de Fabricação (OF)', route: '/ordens-fabricacao', icon: '🏭', allowedRoles: ['Administrador', 'RT', 'Gerente', 'Colaborador'] }
  ];

  constructor() {
    this.updateResponsiveState();
  }

  @HostListener('window:resize')
  protected onResize(): void {
    this.updateResponsiveState();
  }

  protected toggleSidebar(): void {
    if (this.isMobileView()) {
      this.isMobileMenuOpen.update((value) => !value);
      return;
    }

    this.isSidebarCollapsed.update((value) => !value);
  }

  protected closeSidebarOnMobile(): void {
    if (this.isMobileView()) {
      this.isMobileMenuOpen.set(false);
    }
  }

  protected toggleProfileMenu(): void {
    this.isProfileMenuOpen.update((value) => !value);
  }

  protected closeProfileMenu(): void {
    this.isProfileMenuOpen.set(false);
  }

  protected canShowItem(allowedRoles: string[]): boolean {
    return allowedRoles.includes(this.userRole);
  }

  protected get sidebarExpanded(): boolean {
    return this.isMobileView() ? this.isMobileMenuOpen() : !this.isSidebarCollapsed();
  }

  protected isMobileView(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= 900;
  }

  private updateResponsiveState(): void {
    if (this.isMobileView()) {
      this.isSidebarCollapsed.set(false);
      this.isMobileMenuOpen.set(false);
      return;
    }

    this.isMobileMenuOpen.set(false);
  }
}
