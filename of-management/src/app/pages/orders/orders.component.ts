import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { OrderEditDialogComponent } from '../../components/order-edit-dialog/order-edit-dialog.component';

// Modelo simples de uma Ordem de Fabricação
export interface Ordem {
  numero: string;
  produto: string;
  quantidade: number;
  prazo: string;
  responsavel: string;
  prioridade: string;
  status: string;
  progresso: number;
  observacoes: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  // Lista estática de ordens de fabricação
  ordens: Ordem[] = [
    {
      numero: 'OF-2025-001', produto: 'Carcaça Lateral Injetada',
      quantidade: 500, prazo: '15/08/2025', responsavel: 'Carlos Mendes',
      prioridade: 'Alta', status: 'Em Andamento', progresso: 62, observacoes: 'Lote prioritário para cliente A.',
    },
    {
      numero: 'OF-2025-002', produto: 'Tampa Frontal Estampada',
      quantidade: 1200, prazo: '22/08/2025', responsavel: 'Fernanda Lima',
      prioridade: 'Média', status: 'Aguardando', progresso: 0, observacoes: 'Aguardando matéria-prima.',
    },
    {
      numero: 'OF-2025-003', produto: 'Engrenagem Cônica Usinada',
      quantidade: 80, prazo: '30/07/2025', responsavel: 'Roberto Alves',
      prioridade: 'Alta', status: 'Concluída', progresso: 100, observacoes: '',
    },
    {
      numero: 'OF-2025-004', produto: 'Painel de Controle Montado',
      quantidade: 30, prazo: '05/09/2025', responsavel: 'Ana Souza',
      prioridade: 'Baixa', status: 'Pausada', progresso: 35, observacoes: 'Aguardando aprovação.',
    },
    {
      numero: 'OF-2025-005', produto: 'Eixo Escalonado Torneado',
      quantidade: 250, prazo: '10/08/2025', responsavel: 'Paulo Neto',
      prioridade: 'Alta', status: 'Em Andamento', progresso: 48, observacoes: '',
    },
    {
      numero: 'OF-2025-006', produto: 'Suporte Soldado Galvanizado',
      quantidade: 600, prazo: '01/09/2025', responsavel: 'Carla Dias',
      prioridade: 'Média', status: 'Aguardando', progresso: 0, observacoes: '',
    },
  ];

  constructor(private dialog: MatDialog) {}

  // Abre o modal de edição da ordem (só exibe, não salva)
  abrirEdicao(ordem: Ordem) {
    this.dialog.open(OrderEditDialogComponent, {
      width: '600px',
      data: ordem,
    });
  }
}
