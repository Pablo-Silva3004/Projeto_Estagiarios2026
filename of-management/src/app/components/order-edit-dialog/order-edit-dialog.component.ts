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
import { OrdemService } from '../../services/ordem.service';

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

  statusOpcoes = ['PENDENTE', 'APROVADA', 'ENVIADA', 'RECEBIDA', 'CANCELADA'];

  // Itens da ordem (somente visualização — edição de itens fica para uma próxima versão)
  itens: ItemOrdem[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: OrdemFornecimento,
    private dialogRef: MatDialogRef<OrderEditDialogComponent>,
    private ordemService: OrdemService,
  ) {
    this.ordem = { ...data };
  }

  // Salva apenas status e observação (campos editáveis no dialog atual)
  salvar() {
    this.ordemService.atualizar(this.ordem).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Erro ao salvar ordem:', err),
    });
  }

  fechar() { this.dialogRef.close(false); }
}
