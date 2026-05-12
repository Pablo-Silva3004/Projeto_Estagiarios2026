import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProdutoDialogComponent } from '../../components/produto-dialog/produto-dialog.component';
import { ProdutoService } from '../../services/produto.service';

// Modelo alinhado às tabelas produto + categoria_produto
export interface Produto {
  id_produto:       number;
  id_categoria:     number;   // ID oculto, necessário para salvar
  nome:             string;
  categoria:        string;   // nome da categoria (para exibir)
  descricao:        string;
  unidade_medida:   string;
  preco_referencia: number;   // número; formatado no template com currency pipe
  ativo:            boolean;
}

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class produtosComponents implements OnInit {

  produtos: Produto[] = [];

  // Nomes das categorias disponíveis para o dialog de edição
  categorias = ['Informática', 'Rede', 'Papelaria', 'Mobiliário', 'Limpeza', 'Outros'];

  constructor(
    private dialog: MatDialog,
    private produtoService: ProdutoService,
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarTodos().subscribe({
      next: (dados) => this.produtos = dados,
      error: (err)  => console.error('Erro ao carregar produtos:', err),
    });
  }

  abrirEdicao(p: Produto) {
    const ref = this.dialog.open(ProdutoDialogComponent, {
      width: '580px',
      data: { produto: { ...p }, categorias: this.categorias },
    });
    ref.afterClosed().subscribe(salvo => { if (salvo) this.carregarProdutos(); });
  }

  abrirNovo() {
    const novo: Produto = {
      id_produto: 0, id_categoria: 0, nome: '', categoria: '',
      descricao: '', unidade_medida: 'un', preco_referencia: 0, ativo: true,
    };
    const ref = this.dialog.open(ProdutoDialogComponent, {
      width: '580px',
      data: { produto: novo, categorias: this.categorias },
    });
    ref.afterClosed().subscribe(salvo => { if (salvo) this.carregarProdutos(); });
  }

  deletar(id: number) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    this.produtoService.deletar(id).subscribe({
      next: () => this.carregarProdutos(),
      error: (err) => console.error('Erro ao deletar produto:', err),
    });
  }
}
