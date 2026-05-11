import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  // Dados alinhados às tabelas usuario + unidade
  usuario = {
    nome:     'Gustavo',
    email:    'gustavo@empresa.com',
    perfil:   'ADMIN',
    unidade:  'TI',
    ativo:    true,
  };
}
