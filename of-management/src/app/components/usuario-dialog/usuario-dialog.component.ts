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

import { UsuarioSistema } from '../../pages/equipe/equipe.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatSlideToggleModule,
  ],
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.css'],
})
export class UsuarioDialogComponent {
  usuario: UsuarioSistema;
  isNovo: boolean;
  senha = '';

  perfis = ['ADMIN', 'SOLICITANTE', 'APROVADOR'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: UsuarioSistema,
    private dialogRef: MatDialogRef<UsuarioDialogComponent>,
    private usuarioService: UsuarioService,
  ) {
    this.usuario = { ...data };
    this.isNovo  = data.id_usuario === 0;
  }

  salvar() {
    const operacao = this.isNovo
      ? this.usuarioService.criar(this.usuario, this.senha)
      : this.usuarioService.atualizar(this.usuario, this.senha);

    operacao.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Erro ao salvar usuário:', err),
    });
  }

  fechar() { this.dialogRef.close(false); }
}
