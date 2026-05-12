import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { OrderEditDialogComponent } from '../../components/order-edit-dialog/order-edit-dialog.component';
import { OrdemService } from '../../services/ordem.service';

export type StatusOrdem = 'PENDENTE' | 'APROVADA' | 'ENVIADA' | 'RECEBIDA' | 'CANCELADA';

// Modelo alinhado à tabela ordem_fornecimento
export interface OrdemFornecimento {
  id_ordem:              number;
  id_usuario_aprovador:  number | null;  // ID oculto, necessário para PUT
  numero_ordem:          string;
  fornecedor:            string;
  unidade:               string;
  solicitante:           string;
  aprovador:             string | null;
  data_emissao:          string;
  data_entrega_prevista: string | null;
  status:                StatusOrdem;
  observacao:            string | null;
  valor_total:           string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  ordens: OrdemFornecimento[] = [];

  constructor(
    private dialog: MatDialog,
    private ordemService: OrdemService,
  ) {}

  ngOnInit() {
    this.carregarOrdens();
  }

  carregarOrdens() {
    this.ordemService.listarTodas().subscribe({
      next: (dados) => this.ordens = dados,
      error: (err)  => console.error('Erro ao carregar ordens:', err),
    });
  }

  abrirEdicao(ordem: OrdemFornecimento) {
    const ref = this.dialog.open(OrderEditDialogComponent, {
      width: '820px',
      maxHeight: '90vh',
      data: ordem,
    });
    ref.afterClosed().subscribe(salvo => { if (salvo) this.carregarOrdens(); });
  }

  abrirNova() {
    const novaOrdem: OrdemFornecimento = {
      id_ordem: 0, id_usuario_aprovador: null,
      numero_ordem: '', fornecedor: '', unidade: '',
      solicitante: '', aprovador: null,
      data_emissao: '', data_entrega_prevista: null,
      status: 'PENDENTE', observacao: null, valor_total: 'R$ 0,00',
    };
    const ref = this.dialog.open(OrderEditDialogComponent, {
      width: '820px',
      maxHeight: '90vh',
      data: novaOrdem,
    });
    ref.afterClosed().subscribe(salvo => { if (salvo) this.carregarOrdens(); });
  }

  deletar(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta ordem?')) return;
    this.ordemService.deletar(id).subscribe({
      next: () => this.carregarOrdens(),
      error: (err) => console.error('Erro ao deletar ordem:', err),
    });
  }
}

// Modelo alinhado à tabela ordem_item (usado no dialog de edição)
export interface ItemOrdem {
  produto:             string;
  quantidade:          number;
  valor_unitario:      string;
  quantidade_recebida: number;
  subtotal:            string;
}
