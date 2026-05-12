import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produto } from '../pages/produtos/produtos.component';

interface ProdutoApi {
  id_produto:       number;
  categoria:        { id_categoria: number; nome: string };
  nome:             string;
  descricao:        string;
  unidade_medida:   string;
  preco_referencia: number;
  ativo:            boolean;
}

/**
 * IMPORTANTE: como o backend usa SNAKE_CASE tanto para ler quanto para escrever,
 * o corpo do POST/PUT também precisa vir em snake_case.
 * Por isso usamos categoria_id, unidade_medida e preco_referencia aqui.
 */
interface ProdutoBody {
  categoria_id:     number;
  nome:             string;
  descricao:        string;
  unidade_medida:   string;
  preco_referencia: number;
  ativo:            boolean;
}

@Injectable({ providedIn: 'root' })
export class ProdutoService {

  private readonly apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Produto[]> {
    return this.http.get<ProdutoApi[]>(this.apiUrl).pipe(
      map(lista => lista.map(p => this.mapear(p)))
    );
  }

  criar(produto: Produto): Observable<Produto> {
    return this.http.post<ProdutoApi>(this.apiUrl, this.paraBody(produto)).pipe(
      map(p => this.mapear(p))
    );
  }

  atualizar(produto: Produto): Observable<Produto> {
    return this.http.put<ProdutoApi>(`${this.apiUrl}/${produto.id_produto}`, this.paraBody(produto)).pipe(
      map(p => this.mapear(p))
    );
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapear(p: ProdutoApi): Produto {
    return {
      id_produto:       p.id_produto,
      id_categoria:     p.categoria?.id_categoria ?? 0,
      nome:             p.nome,
      categoria:        p.categoria?.nome ?? '',
      descricao:        p.descricao,
      unidade_medida:   p.unidade_medida,
      preco_referencia: p.preco_referencia,
      ativo:            p.ativo,
    };
  }

  private paraBody(p: Produto): ProdutoBody {
    return {
      categoria_id:     p.id_categoria,
      nome:             p.nome,
      descricao:        p.descricao,
      unidade_medida:   p.unidade_medida,
      preco_referencia: typeof p.preco_referencia === 'number'
                          ? p.preco_referencia
                          : parseFloat(String(p.preco_referencia)) || 0,
      ativo:            p.ativo,
    };
  }
}
