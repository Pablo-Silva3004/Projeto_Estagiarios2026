import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UsuarioDialogComponent } from '../../components/usuario-dialog/usuario-dialog.component';

export type PerfilUsuario = 'ADMIN' | 'SOLICITANTE' | 'APROVADOR';

// Modelo alinhado às tabelas usuario + unidade
export interface UsuarioSistema {
  id_usuario: number;
  nome:        string;
  email:       string;
  unidade:     string;  // unidade.nome
  perfil:      PerfilUsuario;
  ativo:        boolean;
}

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css'],
})
export class equipeComponents {

  unidades = ['TI', 'RH', 'Financeiro', 'Operações', 'Marketing'];

  usuarios: UsuarioSistema[] = [
    { id_usuario: 1, nome: 'Gustavo',  email: 'gustavo@empresa.com',  unidade: 'TI',         perfil: 'ADMIN',       ativo: true  },
    { id_usuario: 2, nome: 'Pablo',    email: 'pablo@empresa.com',    unidade: 'TI',         perfil: 'SOLICITANTE', ativo: true  },
    { id_usuario: 3, nome: 'Cintia',   email: 'cintia@empresa.com',   unidade: 'Financeiro', perfil: 'SOLICITANTE', ativo: true  },
    { id_usuario: 4, nome: 'Mayara',   email: 'mayara@empresa.com',   unidade: 'RH',         perfil: 'APROVADOR',   ativo: true  },
    { id_usuario: 5, nome: 'Matheus',  email: 'matheus@empresa.com',  unidade: 'TI',         perfil: 'APROVADOR',   ativo: true  },
    { id_usuario: 6, nome: 'Vinicius', email: 'vinicius@empresa.com', unidade: 'Operações',  perfil: 'SOLICITANTE', ativo: true  },
    { id_usuario: 7, nome: 'Ezequiel', email: 'ezequiel@empresa.com', unidade: 'Operações',  perfil: 'SOLICITANTE', ativo: false },
  ];

  constructor(private dialog: MatDialog) {}

  abrirEdicao(u: UsuarioSistema) {
    this.dialog.open(UsuarioDialogComponent, {
      width: '560px',
      data: { usuario: { ...u }, unidades: this.unidades },
    });
  }

  abrirNovo() {
    const novo: UsuarioSistema = {
      id_usuario: 0, nome: '', email: '', unidade: '', perfil: 'SOLICITANTE', ativo: true,
    };
    this.dialog.open(UsuarioDialogComponent, {
      width: '560px',
      data: { usuario: novo, unidades: this.unidades },
    });
  }
}
