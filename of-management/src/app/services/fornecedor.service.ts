import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../pages/fornecedores/fornecedores.component';

/**
 * FornecedorService
 *
 * Responsável por toda comunicação com o backend na rota /fornecedores.
 * O Angular injeta o HttpClient aqui, que é o "mensageiro" que faz as
 * chamadas HTTP para a API do Spring Boot.
 */
@Injectable({ providedIn: 'root' })
export class FornecedorService {

  // Endereço base do backend
  private readonly apiUrl = 'http://localhost:8080/fornecedores';

  // O Angular injeta o HttpClient automaticamente via construtor
  constructor(private http: HttpClient) {}

  // GET /fornecedores → retorna a lista completa
  listarTodos(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }

  // POST /fornecedores → cria um novo fornecedor
  criar(fornecedor: Fornecedor): Observable<Fornecedor> {
    const body = {
      nome:     fornecedor.nome,
      cnpj:     fornecedor.cnpj,
      telefone: fornecedor.telefone,
      email:    fornecedor.email,
      endereco: fornecedor.endereco,
    };
    return this.http.post<Fornecedor>(this.apiUrl, body);
  }

  // PUT /fornecedores/{id} → atualiza um fornecedor existente
  atualizar(fornecedor: Fornecedor): Observable<Fornecedor> {
    const body = {
      nome:     fornecedor.nome,
      cnpj:     fornecedor.cnpj,
      telefone: fornecedor.telefone,
      email:    fornecedor.email,
      endereco: fornecedor.endereco,
      ativo:    fornecedor.ativo,
    };
    return this.http.put<Fornecedor>(`${this.apiUrl}/${fornecedor.id_fornecedor}`, body);
  }

  // DELETE /fornecedores/{id} → remove um fornecedor
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
