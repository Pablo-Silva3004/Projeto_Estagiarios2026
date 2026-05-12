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
import { FornecedorService } from '../../services/fornecedor.service';

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
    private fornecedorService: FornecedorService,
  ) {
    this.fornecedor = { ...data };
    this.isNovo = data.id_fornecedor === 0;
  }

  // Chamado pelo botão "Salvar"
  salvar() {
    // Decide se é criação ou atualização
    const operacao = this.isNovo
      ? this.fornecedorService.criar(this.fornecedor)
      : this.fornecedorService.atualizar(this.fornecedor);

    operacao.subscribe({
      next: () => this.dialogRef.close(true),  // fecha e sinaliza que houve mudança
      error: (err) => console.error('Erro ao salvar fornecedor:', err),
    });
  }

  fechar() { this.dialogRef.close(false); }
}
