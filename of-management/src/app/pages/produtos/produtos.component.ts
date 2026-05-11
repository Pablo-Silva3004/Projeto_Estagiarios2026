import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProdutoDialogComponent } from '../../components/produto-dialog/produto-dialog.component';

// Modelo alinhado às tabelas produto + categoria_produto
export interface Produto {
  id_produto:        number;
  nome:              string;
  categoria:         string;   // categoria_produto.nome
  descricao:         string;
  unidade_medida:    string;
  preco_referencia:  string;
  ativo:             boolean;
}

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class produtosComponents {

  produtos: Produto[] = [
    { id_produto:  1, nome: 'Notebook Dell Inspiron 15', categoria: 'Informática', descricao: 'Processador i5, 8GB RAM, SSD 256GB', unidade_medida: 'un',    preco_referencia: 'R$ 3.500,00', ativo: true  },
    { id_produto:  2, nome: 'Monitor 24" Full HD',        categoria: 'Informática', descricao: 'IPS, 75Hz, HDMI',                    unidade_medida: 'un',    preco_referencia: 'R$   950,00', ativo: true  },
    { id_produto:  3, nome: 'Mouse Óptico USB',           categoria: 'Informática', descricao: 'Sem fio, 1600 DPI',                  unidade_medida: 'un',    preco_referencia: 'R$    45,00', ativo: true  },
    { id_produto:  4, nome: 'Teclado Mecânico',           categoria: 'Informática', descricao: 'Switch Blue, ABNT2',                 unidade_medida: 'un',    preco_referencia: 'R$   280,00', ativo: true  },
    { id_produto:  5, nome: 'Switch 24 Portas Gigabit',   categoria: 'Rede',        descricao: 'Gerenciável, rack 1U',               unidade_medida: 'un',    preco_referencia: 'R$ 2.200,00', ativo: true  },
    { id_produto:  6, nome: 'Cabo de Rede Cat6 (100m)',   categoria: 'Rede',        descricao: 'UTP, bobina 100 metros',             unidade_medida: 'rolo',  preco_referencia: 'R$   180,00', ativo: true  },
    { id_produto:  7, nome: 'Papel A4 500 folhas',        categoria: 'Papelaria',   descricao: '75g/m², pacote com 500 folhas',      unidade_medida: 'resma', preco_referencia: 'R$    28,00', ativo: true  },
    { id_produto:  8, nome: 'Caneta Esferográfica Cx 50', categoria: 'Papelaria',   descricao: 'Azul, ponta média',                  unidade_medida: 'cx',    preco_referencia: 'R$    35,00', ativo: true  },
    { id_produto:  9, nome: 'Cadeira Executiva',          categoria: 'Mobiliário',  descricao: 'Com apoio lombar e braços reguláveis', unidade_medida: 'un',  preco_referencia: 'R$ 1.200,00', ativo: true  },
    { id_produto: 10, nome: 'Mesa de Escritório',         categoria: 'Mobiliário',  descricao: '1,40m × 0,60m, MDF 15mm',            unidade_medida: 'un',    preco_referencia: 'R$   850,00', ativo: false },
    { id_produto: 11, nome: 'Desinfetante 5L',            categoria: 'Limpeza',     descricao: 'Concentrado, pinho',                 unidade_medida: 'l',     preco_referencia: 'R$    22,00', ativo: true  },
    { id_produto: 12, nome: 'Papel Higiênico (Fardo 64)', categoria: 'Limpeza',     descricao: 'Folha dupla, 30m cada rolo',         unidade_medida: 'fardo', preco_referencia: 'R$    68,00', ativo: true  },
  ];

  categorias = ['Informática', 'Rede', 'Papelaria', 'Mobiliário', 'Limpeza', 'Outros'];

  constructor(private dialog: MatDialog) {}

  abrirEdicao(p: Produto) {
    this.dialog.open(ProdutoDialogComponent, {
      width: '580px',
      data: { produto: { ...p }, categorias: this.categorias },
    });
  }

  abrirNovo() {
    const novo: Produto = {
      id_produto: 0, nome: '', categoria: '', descricao: '',
      unidade_medida: 'un', preco_referencia: 'R$ 0,00', ativo: true,
    };
    this.dialog.open(ProdutoDialogComponent, {
      width: '580px',
      data: { produto: novo, categorias: this.categorias },
    });
  }
}
