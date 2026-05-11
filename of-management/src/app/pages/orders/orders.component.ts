import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { OrderEditDialogComponent } from '../../components/order-edit-dialog/order-edit-dialog.component';

export type StatusOrdem = 'PENDENTE' | 'APROVADA' | 'ENVIADA' | 'RECEBIDA' | 'CANCELADA';

// Modelo alinhado à tabela ordem_fornecimento
export interface OrdemFornecimento {
  id_ordem:               number;
  numero_ordem:           string;
  fornecedor:             string;
  unidade:                string;
  solicitante:            string;
  aprovador:              string | null;
  data_emissao:           string;
  data_entrega_prevista:  string | null;
  status:                 StatusOrdem;
  observacao:             string | null;
  valor_total:            string;
}

// Modelo alinhado à tabela ordem_item
export interface ItemOrdem {
  produto:            string;
  quantidade:         number;
  valor_unitario:     string;
  quantidade_recebida:number;
  subtotal:           string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {

  ordens: OrdemFornecimento[] = [
    {
      id_ordem: 1, numero_ordem: 'OF-2025-001',
      fornecedor: 'Tech Supplies Ltda', unidade: 'TI',
      solicitante: 'Pablo', aprovador: 'Mayara',
      data_emissao: '05/01/2025', data_entrega_prevista: '20/01/2025',
      status: 'RECEBIDA', observacao: null, valor_total: 'R$ 4.500,00',
    },
    {
      id_ordem: 2, numero_ordem: 'OF-2025-002',
      fornecedor: 'Office Pro', unidade: 'RH',
      solicitante: 'Gustavo', aprovador: 'Mayara',
      data_emissao: '10/01/2025', data_entrega_prevista: '25/01/2025',
      status: 'RECEBIDA', observacao: null, valor_total: 'R$ 1.200,00',
    },
    {
      id_ordem: 3, numero_ordem: 'OF-2025-003',
      fornecedor: 'InfoNet', unidade: 'TI',
      solicitante: 'Pablo', aprovador: 'Matheus',
      data_emissao: '15/02/2025', data_entrega_prevista: '10/03/2025',
      status: 'APROVADA', observacao: null, valor_total: 'R$ 8.750,00',
    },
    {
      id_ordem: 4, numero_ordem: 'OF-2025-004',
      fornecedor: 'Papelaria Central', unidade: 'Financeiro',
      solicitante: 'Cintia', aprovador: 'Mayara',
      data_emissao: '20/02/2025', data_entrega_prevista: '15/03/2025',
      status: 'ENVIADA', observacao: null, valor_total: 'R$    650,00',
    },
    {
      id_ordem: 5, numero_ordem: 'OF-2025-005',
      fornecedor: 'Tech Supplies Ltda', unidade: 'TI',
      solicitante: 'Pablo', aprovador: null,
      data_emissao: '01/03/2025', data_entrega_prevista: '20/03/2025',
      status: 'PENDENTE', observacao: 'Urgente — renovação de equipamentos.', valor_total: 'R$ 12.300,00',
    },
    {
      id_ordem: 6, numero_ordem: 'OF-2025-006',
      fornecedor: 'MobiDesk', unidade: 'Operações',
      solicitante: 'Vinicius', aprovador: null,
      data_emissao: '05/03/2025', data_entrega_prevista: '30/03/2025',
      status: 'PENDENTE', observacao: null, valor_total: 'R$  5.800,00',
    },
    {
      id_ordem: 7, numero_ordem: 'OF-2025-007',
      fornecedor: 'Cleaning Pro', unidade: 'Operações',
      solicitante: 'Ezequiel', aprovador: 'Matheus',
      data_emissao: '10/03/2025', data_entrega_prevista: null,
      status: 'CANCELADA', observacao: 'Cancelada por falta de verba.', valor_total: 'R$    900,00',
    },
    {
      id_ordem: 8, numero_ordem: 'OF-2025-008',
      fornecedor: 'DataCenter Tech', unidade: 'TI',
      solicitante: 'Pablo', aprovador: 'Mayara',
      data_emissao: '01/04/2025', data_entrega_prevista: '30/04/2025',
      status: 'ENVIADA', observacao: null, valor_total: 'R$ 15.600,00',
    },
  ];

  constructor(private dialog: MatDialog) {}

  abrirEdicao(ordem: OrdemFornecimento) {
    this.dialog.open(OrderEditDialogComponent, {
      width: '820px',
      maxHeight: '90vh',
      data: ordem,
    });
  }

  abrirNova() {
    const novaOrdem: OrdemFornecimento = {
      id_ordem: 0, numero_ordem: 'OF-2025-019',
      fornecedor: '', unidade: '',
      solicitante: 'Pablo', aprovador: null,
      data_emissao: '', data_entrega_prevista: null,
      status: 'PENDENTE', observacao: null, valor_total: 'R$ 0,00',
    };
    this.dialog.open(OrderEditDialogComponent, {
      width: '820px',
      maxHeight: '90vh',
      data: novaOrdem,
    });
  }
}
