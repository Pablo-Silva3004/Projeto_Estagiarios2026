import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Ordem } from '../../pages/orders/orders.component';

@Component({
  selector: 'app-order-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './order-edit-dialog.component.html',
  styleUrls: ['./order-edit-dialog.component.css'],
})
export class OrderEditDialogComponent {
  // Cópia local dos dados da ordem para edição (não altera o original)
  ordem: Ordem;

  statusOpcoes = ['Em Andamento', 'Aguardando', 'Concluída', 'Pausada'];
  prioridadeOpcoes = ['Alta', 'Média', 'Baixa'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Ordem,
    private dialogRef: MatDialogRef<OrderEditDialogComponent>,
  ) {
    // Cria uma cópia para não modificar o dado original
    this.ordem = { ...data };
  }

  // Fecha o modal sem salvar
  fechar() {
    this.dialogRef.close();
  }
}
