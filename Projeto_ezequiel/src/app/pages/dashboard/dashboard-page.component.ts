import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-header">
      <span class="badge">Dashboard</span>
      <h2>Visão geral do sistema</h2>
      <p>Área inicial preparada para receber indicadores, alertas e atalhos operacionais.</p>
    </section>

    <section class="grid">
      <article class="card"><strong>OFs em aberto</strong><p>Espaço reservado para indicadores.</p></article>
      <article class="card"><strong>Usuários ativos</strong><p>Espaço reservado para indicadores.</p></article>
      <article class="card"><strong>Pendências</strong><p>Espaço reservado para indicadores.</p></article>
    </section>
  `,
  styles: [`
    .page-header { margin-bottom: 1.5rem; }
    .badge { display:inline-block; padding:0.35rem 0.7rem; background:#eef2ff; color:#3730a3; border-radius:999px; font-size:0.85rem; margin-bottom:0.75rem; }
    h2 { margin:0 0 0.5rem; font-size:1.7rem; }
    p { margin:0; color:#64748b; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; }
    .card { border:1px solid #e2e8f0; border-radius:18px; padding:1rem; background:#f8fafc; }
    .card strong { display:block; margin-bottom:0.5rem; }
  `]
})
export class DashboardPageComponent {}
