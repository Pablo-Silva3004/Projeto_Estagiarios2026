import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Produto } from '../../pages/produtos/produtos.component';

@Component({
  selector: 'app-produto-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatSlideToggleModule,
  ],
  templateUrl: './produto-dialog.component.html',
  styleUrls: ['./produto-dialog.component.css'],
})
export class ProdutoDialogComponent {
  produto: Produto;
  categorias: string[];
  isNovo: boolean;

  unidades = ['un', 'cx', 'kg', 'l', 'resma', 'rolo', 'fardo', 'm', 'm²', 'par'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { produto: Produto; categorias: string[] },
    private dialogRef: MatDialogRef<ProdutoDialogComponent>,
  ) {
    this.produto   = { ...data.produto };
    this.categorias = data.categorias;
    this.isNovo = data.produto.id_produto === 0;
  }

  fechar() { this.dialogRef.close(); }
}
