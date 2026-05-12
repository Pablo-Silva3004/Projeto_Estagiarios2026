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
import { ProdutoService } from '../../services/produto.service';

// Mapeamento fixo: nome da categoria → id_categoria no banco
// Ajuste os IDs conforme os que existem no seu banco de dados
const CATEGORIA_IDS: Record<string, number> = {
  'Informática': 1,
  'Rede':        2,
  'Papelaria':   3,
  'Mobiliário':  4,
  'Limpeza':     5,
  'Outros':      6,
};

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
    private produtoService: ProdutoService,
  ) {
    this.produto    = { ...data.produto };
    this.categorias = data.categorias;
    this.isNovo     = data.produto.id_produto === 0;
  }

  salvar() {
    // Resolve o id_categoria a partir do nome selecionado
    this.produto.id_categoria = CATEGORIA_IDS[this.produto.categoria] ?? this.produto.id_categoria;

    const operacao = this.isNovo
      ? this.produtoService.criar(this.produto)
      : this.produtoService.atualizar(this.produto);

    operacao.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Erro ao salvar produto:', err),
    });
  }

  fechar() { this.dialogRef.close(false); }
}
