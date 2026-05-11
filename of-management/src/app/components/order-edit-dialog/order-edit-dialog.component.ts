import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { OrdemFornecimento, ItemOrdem } from '../../pages/orders/orders.component';

@Component({
  selector: 'app-order-edit-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatDividerModule,
  ],
  templateUrl: './order-edit-dialog.component.html',
  styleUrls: ['./order-edit-dialog.component.css'],
})
export class OrderEditDialogComponent {

  ordem: OrdemFornecimento;

  statusOpcoes   = ['PENDENTE', 'APROVADA', 'ENVIADA', 'RECEBIDA', 'CANCELADA'];
  fornecedores   = ['Tech Supplies Ltda', 'Office Pro', 'InfoNet', 'Papelaria Central', 'MobiDesk', 'Cleaning Pro', 'DataCenter Tech'];
  unidades       = ['TI', 'RH', 'Financeiro', 'Operações', 'Marketing'];
  produtosCatalog= ['Notebook Dell Inspiron 15', 'Monitor 24" Full HD', 'Mouse Óptico USB', 'Teclado Mecânico', 'Papel A4 500 folhas', 'Cadeira Executiva', 'Switch 24 Portas', 'Cabo de Rede Cat6'];

  // Itens estáticos da OF (alinhados à tabela ordem_item)
  itens: ItemOrdem[] = [
    { produto: 'Notebook Dell Inspiron 15', quantidade: 2, valor_unitario: 'R$ 3.500,00', quantidade_recebida: 0, subtotal: 'R$ 7.000,00' },
    { produto: 'Mouse Óptico USB',          quantidade: 5, valor_unitario: 'R$    45,00', quantidade_recebida: 0, subtotal: 'R$   225,00' },
    { produto: 'Monitor 24" Full HD',       quantidade: 1, valor_unitario: 'R$   950,00', quantidade_recebida: 0, subtotal: 'R$   950,00' },
  ];

  valorTotal = 'R$ 8.175,00';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: OrdemFornecimento,
    private dialogRef: MatDialogRef<OrderEditDialogComponent>,
  ) {
    this.ordem = { ...data };
  }

  fechar() { this.dialogRef.close(); }
}
