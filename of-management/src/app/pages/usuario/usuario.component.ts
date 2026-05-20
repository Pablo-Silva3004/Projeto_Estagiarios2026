import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService, UsuarioLogado } from '../../services/auth.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  usuario: UsuarioLogado | null;

  constructor(private authService: AuthService) {
    // Pega os dados do usuário que está logado no momento
    this.usuario = this.authService.getUsuario();
  }
}
