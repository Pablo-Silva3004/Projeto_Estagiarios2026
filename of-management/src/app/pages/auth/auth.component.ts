import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  // Controla qual tela está visível: 'login' ou 'cadastro'
  tela: 'login' | 'cadastro' = 'login';

  // Campos do formulário de login
  email = '';
  senha = '';

  // Campos do formulário de cadastro
  nome = '';
  emailCadastro = '';
  senhaCadastro = '';
  cargo = '';


  // Opções dos selects de cadastro
  cargos = ['Operador', 'Supervisor', 'Engenheiro', 'Analista', 'Gerente'];


  constructor(private router: Router, private authService: AuthService) {}

  // Ao clicar em "Entrar", faz login e vai para o dashboard
  entrar() {
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }

  // Ao clicar em "Salvar" no cadastro, salva e vai para o dashboard
  salvar() {
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }

  // Alterna entre as telas de login e cadastro
  irParaCadastro() {
    this.tela = 'cadastro';
  }

  irParaLogin() {
    this.tela = 'login';
  }
}
