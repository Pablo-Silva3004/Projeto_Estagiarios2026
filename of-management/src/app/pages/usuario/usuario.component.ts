import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {

  usuario: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<any[]>('http://localhost:8080/usuarios')
        .subscribe({

          next: (usuarios) => {

            console.log('USUARIOS:', usuarios);

            // pega o primeiro usuário da lista
            this.usuario = usuarios[0];
          },

          error: (erro) => {
            console.error('Erro ao carregar usuário:', erro);
          }
        });
  }
}