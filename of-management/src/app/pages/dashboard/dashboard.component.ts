import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

  @ViewChild('chartStatus') chartStatusRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartMensal') chartMensalRef!: ElementRef<HTMLCanvasElement>;

  private chartStatus!: Chart;
  private chartMensal!: Chart;

  // KPIs alinhados à tabela ordem_fornecimento
  totalOrdens   = 18;
  pendente      = 5;
  aprovada      = 3;
  enviada       = 4;
  recebida      = 5;
  cancelada     = 1;
  totalFornecedores = 7;
  totalProdutos     = 12;

  // Últimas OFs para tabela de atividades recentes
  ultimasOrdens = [
    { numero: 'OF-2025-018', fornecedor: 'DataCenter Tech',   unidade: 'TI',         solicitante: 'Pablo',    status: 'ENVIADA',   valor: 'R$ 15.600,00' },
    { numero: 'OF-2025-017', fornecedor: 'MobiDesk',          unidade: 'Operações',  solicitante: 'Vinicius', status: 'PENDENTE',  valor: 'R$  5.800,00' },
    { numero: 'OF-2025-016', fornecedor: 'Tech Supplies Ltda',unidade: 'TI',         solicitante: 'Pablo',    status: 'PENDENTE',  valor: 'R$ 12.300,00' },
    { numero: 'OF-2025-015', fornecedor: 'Papelaria Central', unidade: 'Financeiro', solicitante: 'Cintia',   status: 'ENVIADA',   valor: 'R$    650,00' },
    { numero: 'OF-2025-014', fornecedor: 'InfoNet',           unidade: 'TI',         solicitante: 'Pablo',    status: 'APROVADA',  valor: 'R$  8.750,00' },
  ];

  ngAfterViewInit(): void {
    this.criarGraficoStatus();
    this.criarGraficoMensal();
  }

  ngOnDestroy(): void {
    this.chartStatus?.destroy();
    this.chartMensal?.destroy();
  }

  private criarGraficoStatus(): void {
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
    this.chartMensal = new Chart(this.chartMensalRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Dez/24', 'Jan/25', 'Fev/25', 'Mar/25', 'Abr/25', 'Mai/25'],
        datasets: [
          {
            label: 'Recebidas',
            data: [4, 5, 3, 6, 5, 2],
            backgroundColor: '#99f6e4', borderColor: '#0f766e',
            borderWidth: 1.5, borderRadius: 4,
          },
          {
            label: 'Pendentes / Enviadas',
            data: [2, 3, 4, 3, 2, 6],
            backgroundColor: '#bfdbfe', borderColor: '#1d4ed8',
            borderWidth: 1.5, borderRadius: 4,
          },
          {
            label: 'Canceladas',
            data: [0, 1, 0, 1, 0, 1],
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
            ticks: { stepSize: 2, font: { family: 'Inter', size: 11 } },
            grid: { color: '#f0f2f5' },
          },
        },
      },
    });
  }
}
