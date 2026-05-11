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
  unidades: string[];
  isNovo: boolean;

  perfis = ['ADMIN', 'SOLICITANTE', 'APROVADOR'];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { usuario: UsuarioSistema; unidades: string[] },
    private dialogRef: MatDialogRef<UsuarioDialogComponent>,
  ) {
    this.usuario  = { ...data.usuario };
    this.unidades = data.unidades;
    this.isNovo   = data.usuario.id_usuario === 0;
  }

  fechar() { this.dialogRef.close(); }
}
