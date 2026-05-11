import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FornecedorDialogComponent } from '../../components/fornecedor-dialog/fornecedor-dialog.component';

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
export class FornecedoresComponent {

  fornecedores: Fornecedor[] = [
    { id_fornecedor: 1, nome: 'Tech Supplies Ltda',  cnpj: '12.345.678/0001-90', telefone: '(11) 3456-7890', email: 'contato@techsupplies.com',    endereco: 'Av. Paulista, 1000 - São Paulo/SP',      ativo: true  },
    { id_fornecedor: 2, nome: 'Office Pro',           cnpj: '98.765.432/0001-10', telefone: '(11) 2345-6789', email: 'vendas@officepro.com.br',      endereco: 'Rua Augusta, 500 - São Paulo/SP',        ativo: true  },
    { id_fornecedor: 3, nome: 'InfoNet',              cnpj: '11.222.333/0001-44', telefone: '(21) 9876-5432', email: 'comercial@infonet.com.br',      endereco: 'Rua das Laranjeiras, 200 - Rio/RJ',     ativo: true  },
    { id_fornecedor: 4, nome: 'Papelaria Central',   cnpj: '44.555.666/0001-77', telefone: '(11) 4567-8901', email: 'pedidos@papelcentral.com',      endereco: 'Rua da Consolação, 300 - São Paulo/SP', ativo: true  },
    { id_fornecedor: 5, nome: 'MobiDesk',             cnpj: '77.888.999/0001-00', telefone: '(31) 3456-9012', email: 'contato@mobidesk.com.br',       endereco: 'Av. Afonso Pena, 700 - Belo Horizonte/MG', ativo: true },
    { id_fornecedor: 6, nome: 'Cleaning Pro',         cnpj: '22.333.444/0001-55', telefone: '(11) 5678-9012', email: 'atendimento@cleaningpro.com',   endereco: 'Rua Vergueiro, 1500 - São Paulo/SP',    ativo: false },
    { id_fornecedor: 7, nome: 'DataCenter Tech',      cnpj: '55.666.777/0001-88', telefone: '(11) 6789-0123', email: 'vendas@datacentertech.com',     endereco: 'Av. Faria Lima, 3000 - São Paulo/SP',   ativo: true  },
  ];

  constructor(private dialog: MatDialog) {}

  abrirEdicao(f: Fornecedor) {
    this.dialog.open(FornecedorDialogComponent, {
      width: '600px',
      data: { ...f },
    });
  }

  abrirNovo() {
    const novo: Fornecedor = {
      id_fornecedor: 0, nome: '', cnpj: '', telefone: '', email: '', endereco: '', ativo: true,
    };
    this.dialog.open(FornecedorDialogComponent, { width: '600px', data: novo });
  }
}
