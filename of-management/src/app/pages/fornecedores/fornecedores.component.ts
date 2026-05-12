import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FornecedorDialogComponent } from '../../components/fornecedor-dialog/fornecedor-dialog.component';
import { FornecedorService } from '../../services/fornecedor.service';

// Modelo alinhado à tabela fornecedor
export interface Fornecedor {
  id_fornecedor: number;
  nome:          string;
  cnpj:          string;
  telefone:      string;
  email:         string;
  endereco:      string;
  ativo:         boolean;
}

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css'],
})
export class FornecedoresComponent implements OnInit {

  fornecedores: Fornecedor[] = [];

  // Injeta o dialog do Material e o nosso service
  constructor(
    private dialog: MatDialog,
    private fornecedorService: FornecedorService,
  ) {}

  // ngOnInit roda automaticamente quando a página abre
  ngOnInit() {
    this.carregarFornecedores();
  }

  // Busca a lista do backend e guarda no array
  carregarFornecedores() {
    this.fornecedorService.listarTodos().subscribe({
      next: (dados) => this.fornecedores = dados,
      error: (err)  => console.error('Erro ao carregar fornecedores:', err),
    });
  }

  abrirEdicao(f: Fornecedor) {
    const ref = this.dialog.open(FornecedorDialogComponent, {
      width: '600px',
      data: { ...f },
    });
    // Quando o dialog fechar com resultado true, recarrega a lista
    ref.afterClosed().subscribe(salvo => { if (salvo) this.carregarFornecedores(); });
  }

  abrirNovo() {
    const novo: Fornecedor = {
      id_fornecedor: 0, nome: '', cnpj: '', telefone: '', email: '', endereco: '', ativo: true,
    };
    const ref = this.dialog.open(FornecedorDialogComponent, { width: '600px', data: novo });
    ref.afterClosed().subscribe(salvo => { if (salvo) this.carregarFornecedores(); });
  }

  deletar(id: number) {
    if (!confirm('Tem certeza que deseja excluir este fornecedor?')) return;
    this.fornecedorService.deletar(id).subscribe({
      next: () => this.carregarFornecedores(),
      error: (err) => console.error('Erro ao deletar fornecedor:', err),
    });
  }
}
