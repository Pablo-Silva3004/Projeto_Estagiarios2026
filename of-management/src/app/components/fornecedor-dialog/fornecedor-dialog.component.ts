import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Fornecedor } from '../../pages/fornecedores/fornecedores.component';

@Component({
  selector: 'app-fornecedor-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSlideToggleModule,
  ],
  templateUrl: './fornecedor-dialog.component.html',
  styleUrls: ['./fornecedor-dialog.component.css'],
})
export class FornecedorDialogComponent {
  fornecedor: Fornecedor;
  isNovo: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Fornecedor,
    private dialogRef: MatDialogRef<FornecedorDialogComponent>,
  ) {
    this.fornecedor = { ...data };
    this.isNovo = data.id_fornecedor === 0;
  }

  fechar() { this.dialogRef.close(); }
}
