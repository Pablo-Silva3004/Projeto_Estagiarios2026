import { Component, AfterViewInit, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Formato que o backend retorna para uma ordem
interface OrdemApi {
  id_ordem:             number;
  numero_ordem:         string;
  fornecedor:           { id_fornecedor: number; nome: string };
  unidade:              { id_unidade:   number; nome: string };
  usuario_solicitante:  { id_usuario:   number; nome: string };
  data_emissao:         string;   // "YYYY-MM-DD"
  status:               string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chartStatus') chartStatusRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartMensal') chartMensalRef!: ElementRef<HTMLCanvasElement>;

  private chartStatus!: Chart;
  private chartMensal!: Chart;

  // KPIs
  totalOrdens       = 0;
  pendente          = 0;
  aprovada          = 0;
  enviada           = 0;
  recebida          = 0;
  cancelada         = 0;
  totalFornecedores = 0;
  totalProdutos     = 0;

  // Tabela de atividades recentes
  ultimasOrdens: { numero: string; fornecedor: string; unidade: string; solicitante: string; status: string; valor: string }[] = [];

  // Dados para o gráfico mensal (calculados após carregar ordens)
  private dadosMensais: { labels: string[]; recebidas: number[]; emAndamento: number[]; canceladas: number[] } = {
    labels: [], recebidas: [], emAndamento: [], canceladas: [],
  };

  carregando = true;
  private dadosCarregados = false;

  private readonly BASE = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    forkJoin({
      ordens:      this.http.get<OrdemApi[]>(`${this.BASE}/ordens-fornecimento`),
      fornecedores: this.http.get<any[]>(`${this.BASE}/fornecedores`),
      produtos:    this.http.get<any[]>(`${this.BASE}/produtos`),
    }).subscribe({
      next: ({ ordens, fornecedores, produtos }) => {
        this.processarOrdens(ordens);
        this.totalFornecedores = fornecedores.length;
        this.totalProdutos     = produtos.length;
        this.carregando        = false;
        this.dadosCarregados   = true;

        // Se a view já existir (AfterViewInit já rodou), cria os gráficos agora
        if (this.chartStatusRef) this.criarGraficos();
      },
      error: () => {
        this.carregando = false;
      },
    });
  }

  ngAfterViewInit(): void {
    // Se os dados já chegaram antes da view, cria os gráficos
    if (this.dadosCarregados) this.criarGraficos();
  }

  ngOnDestroy(): void {
    this.chartStatus?.destroy();
    this.chartMensal?.destroy();
  }

  // ── processamento ──────────────────────────────────────────────────────────

  private processarOrdens(ordens: OrdemApi[]): void {
    this.totalOrdens = ordens.length;

    // Conta por status
    for (const o of ordens) {
      switch (o.status) {
        case 'PENDENTE':   this.pendente++;   break;
        case 'APROVADA':   this.aprovada++;   break;
        case 'ENVIADA':    this.enviada++;    break;
        case 'RECEBIDA':   this.recebida++;   break;
        case 'CANCELADA':  this.cancelada++;  break;
      }
    }

    // Últimas 5 ordens (ordenadas por data decrescente)
    const ordenadas = [...ordens].sort((a, b) =>
      b.data_emissao.localeCompare(a.data_emissao)
    );
    this.ultimasOrdens = ordenadas.slice(0, 5).map(o => ({
      numero:     o.numero_ordem,
      fornecedor: o.fornecedor?.nome  ?? '—',
      unidade:    o.unidade?.nome     ?? '—',
      solicitante: o.usuario_solicitante?.nome ?? '—',
      status:     o.status,
      valor:      'R$ —',
    }));

    // Histórico mensal — últimos 6 meses
    this.dadosMensais = this.calcularMensais(ordens);
  }

  private calcularMensais(ordens: OrdemApi[]) {
    // Gera os 6 meses anteriores ao mês atual
    const labels: string[]    = [];
    const recebidas: number[] = [];
    const emAndamento: number[] = [];
    const canceladas: number[] = [];

    const hoje = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      const ano = d.getFullYear();
      const mes = d.getMonth(); // 0-indexed

      const mesStr = String(mes + 1).padStart(2, '0');
      labels.push(`${mesStr}/${String(ano).slice(2)}`);

      const doMes = ordens.filter(o => {
        const [y, m] = o.data_emissao.split('-').map(Number);
        return y === ano && m - 1 === mes;
      });

      recebidas.push(doMes.filter(o => o.status === 'RECEBIDA').length);
      emAndamento.push(doMes.filter(o => ['PENDENTE', 'APROVADA', 'ENVIADA'].includes(o.status)).length);
      canceladas.push(doMes.filter(o => o.status === 'CANCELADA').length);
    }

    return { labels, recebidas, emAndamento, canceladas };
  }

  // ── gráficos ───────────────────────────────────────────────────────────────

  private criarGraficos(): void {
    this.criarGraficoStatus();
    this.criarGraficoMensal();
  }

  private criarGraficoStatus(): void {
    this.chartStatus?.destroy();
    this.chartStatus = new Chart(this.chartStatusRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Pendente', 'Aprovada', 'Enviada', 'Recebida', 'Cancelada'],
        datasets: [{
          data: [this.pendente, this.aprovada, this.enviada, this.recebida, this.cancelada],
          backgroundColor: ['#fef3c7', '#d1fae5', '#dbeafe', '#ccfbf1', '#f3f4f6'],
          borderColor:     ['#d97706', '#059669', '#1d4ed8', '#0f766e', '#9ca3af'],
          borderWidth: 2,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: 'Inter', size: 12 }, padding: 14, usePointStyle: true },
          },
          tooltip: {
            callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed} ordens` },
          },
        },
      },
    });
  }

  private criarGraficoMensal(): void {
    this.chartMensal?.destroy();
    this.chartMensal = new Chart(this.chartMensalRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dadosMensais.labels,
        datasets: [
          {
            label: 'Recebidas',
            data: this.dadosMensais.recebidas,
            backgroundColor: '#99f6e4', borderColor: '#0f766e',
            borderWidth: 1.5, borderRadius: 4,
          },
          {
            label: 'Em Andamento',
            data: this.dadosMensais.emAndamento,
            backgroundColor: '#bfdbfe', borderColor: '#1d4ed8',
            borderWidth: 1.5, borderRadius: 4,
          },
          {
            label: 'Canceladas',
            data: this.dadosMensais.canceladas,
            backgroundColor: '#e5e7eb', borderColor: '#9ca3af',
            borderWidth: 1.5, borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: 'Inter', size: 12 }, padding: 14, usePointStyle: true },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, font: { family: 'Inter', size: 11 } },
            grid: { color: '#f0f2f5' },
          },
        },
      },
    });
  }
}
