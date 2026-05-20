import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { OrdemFornecimento } from '../../pages/orders/orders.component';
import { OrdemService } from '../../services/ordem.service';

interface OpcaoSimples { id: number; nome: string; }

@Component({
  selector: 'app-order-edit-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule,
    MatDividerModule, MatProgressSpinnerModule,
  ],
  templateUrl: './order-edit-dialog.component.html',
  styleUrls: ['./order-edit-dialog.component.css'],
})
export class OrderEditDialogComponent implements OnInit {

  /** true = criando nova ordem; false = editando existente */
  modoNovo: boolean;

  ordem: OrdemFornecimento;

  statusOpcoes = ['PENDENTE', 'APROVADA', 'ENVIADA', 'RECEBIDA', 'CANCELADA'];

  // Dados para os selects da nova ordem
  fornecedores: OpcaoSimples[] = [];
  unidades:     OpcaoSimples[] = [];
  usuarios:     OpcaoSimples[] = [];

  // Campos do formulário de nova ordem
  novaOrdem = {
    numeroOrdem:          '',
    fornecedorId:         null as number | null,
    unidadeId:            null as number | null,
    usuarioSolicitanteId: null as number | null,
    dataEmissao:          '',
    dataEntregaPrevista:  '',
    observacao:           '',
  };

  carregando = false;
  salvando   = false;
  erro       = '';

  private readonly BASE = 'http://localhost:8080';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: OrdemFornecimento,
    private dialogRef: MatDialogRef<OrderEditDialogComponent>,
    private ordemService: OrdemService,
    private http: HttpClient,
  ) {
    this.ordem    = { ...data };
    this.modoNovo = data.id_ordem === 0;
  }

  ngOnInit(): void {
    if (this.modoNovo) {
      this.carregarOpcoes();
    }
  }

  private carregarOpcoes(): void {
    this.carregando = true;
    forkJoin({
      fornecedores: this.http.get<any[]>(`${this.BASE}/fornecedores`),
      unidades:     this.http.get<any[]>(`${this.BASE}/unidades`),
      usuarios:     this.http.get<any[]>(`${this.BASE}/usuarios`),
    }).subscribe({
      next: ({ fornecedores, unidades, usuarios }) => {
        this.fornecedores = fornecedores.map(f => ({ id: f.idFornecedor ?? f.id_fornecedor, nome: f.nome }));
        this.unidades     = unidades.map(u     => ({ id: u.idUnidade    ?? u.id_unidade,    nome: u.nome }));
        this.usuarios     = usuarios.map(u     => ({ id: u.idUsuario    ?? u.id_usuario,    nome: u.nome }));
        this.carregando   = false;
      },
      error: () => {
        this.erro       = 'Erro ao carregar dados. Verifique se o backend está rodando.';
        this.carregando = false;
      },
    });
  }

  salvar(): void {
    this.erro = '';

    if (this.modoNovo) {
      this.salvarNova();
    } else {
      this.salvarEdicao();
    }
  }

  private salvarNova(): void {
    const f = this.novaOrdem;

    if (!f.numeroOrdem || !f.fornecedorId || !f.unidadeId || !f.usuarioSolicitanteId || !f.dataEmissao) {
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    this.salvando = true;
    this.ordemService.criar({
      numeroOrdem:          f.numeroOrdem,
      fornecedorId:         f.fornecedorId,
      unidadeId:            f.unidadeId,
      usuarioSolicitanteId: f.usuarioSolicitanteId,
      dataEmissao:          f.dataEmissao,
      dataEntregaPrevista:  f.dataEntregaPrevista || null,
      observacao:           f.observacao || null,
    }).subscribe({
      next: () => { this.salvando = false; this.dialogRef.close(true); },
      error: () => { this.salvando = false; this.erro = 'Erro ao criar ordem.'; },
    });
  }

  private salvarEdicao(): void {
    this.salvando = true;
    this.ordemService.atualizar(this.ordem).subscribe({
      next: () => { this.salvando = false; this.dialogRef.close(true); },
      error: () => { this.salvando = false; this.erro = 'Erro ao salvar ordem.'; },
    });
  }

  fechar(): void { this.dialogRef.close(false); }
}
