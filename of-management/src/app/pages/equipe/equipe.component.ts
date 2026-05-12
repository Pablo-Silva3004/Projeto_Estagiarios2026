import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UsuarioDialogComponent } from '../../components/usuario-dialog/usuario-dialog.component';
import { UsuarioService } from '../../services/usuario.service';

export type PerfilUsuario = 'ADMIN' | 'SOLICITANTE' | 'APROVADOR';

// Modelo alinhado à tabela usuario
export interface UsuarioSistema {
  id_usuario: number;
  nome:       string;
  email:      string;
  perfil:     PerfilUsuario;
  ativo:      boolean;
}

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css'],
})
export class equipeComponents implements OnInit {

  usuarios: UsuarioSistema[] = [];

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.listarTodos().subscribe({
      next: (dados) => this.usuarios = dados,
      error: (err)  => console.error('Erro ao carregar usuários:', err),
    });
  }

  abrirEdicao(u: UsuarioSistema) {
    const ref = this.dialog.open(UsuarioDialogComponent, {
      width: '560px',
      data: { ...u },
    });
    ref.afterClosed().subscribe(salvo => { if (salvo) this.carregarUsuarios(); });
  }

  abrirNovo() {
    const novo: UsuarioSistema = {
      id_usuario: 0, nome: '', email: '', perfil: 'SOLICITANTE', ativo: true,
    };
    const ref = this.dialog.open(UsuarioDialogComponent, {
      width: '560px',
      data: novo,
    });
    ref.afterClosed().subscribe(salvo => { if (salvo) this.carregarUsuarios(); });
  }

  deletar(id: number) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    this.usuarioService.deletar(id).subscribe({
      next: () => this.carregarUsuarios(),
      error: (err) => console.error('Erro ao deletar usuário:', err),
    });
  }
}
