import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrdemFornecimento, StatusOrdem } from '../pages/orders/orders.component';

interface OrdemApi {
  id_ordem:               number;
  numero_ordem:           string;
  fornecedor:             { id_fornecedor: number; nome: string };
  unidade:                { id_unidade:   number; nome: string };
  usuario_solicitante:    { id_usuario:   number; nome: string };
  usuario_aprovador:      { id_usuario:   number; nome: string } | null;
  data_emissao:           string;
  data_entrega_prevista:  string | null;
  status:                 StatusOrdem;
  observacao:             string | null;
}

/** SNAKE_CASE: o backend espera usuario_aprovador_id, não usuarioAprovadorId */
interface OrdemUpdateBody {
  status:                StatusOrdem;
  usuario_aprovador_id:  number | null;
  observacao:            string | null;
}

@Injectable({ providedIn: 'root' })
export class OrdemService {

  private readonly apiUrl = 'http://localhost:8080/ordens-fornecimento';

  constructor(private http: HttpClient) {}

  criar(dados: {
    numeroOrdem: string;
    fornecedorId: number;
    unidadeId: number;
    usuarioSolicitanteId: number;
    dataEmissao: string;
    dataEntregaPrevista: string | null;
    observacao: string | null;
  }): Observable<OrdemFornecimento> {
    // O backend usa SNAKE_CASE — os campos precisam chegar em snake_case
    const body = {
      numero_ordem:           dados.numeroOrdem,
      fornecedor_id:          dados.fornecedorId,
      unidade_id:             dados.unidadeId,
      usuario_solicitante_id: dados.usuarioSolicitanteId,
      data_emissao:           dados.dataEmissao,
      data_entrega_prevista:  dados.dataEntregaPrevista,
      observacao:             dados.observacao,
    };
    return this.http.post<OrdemApi>(this.apiUrl, body).pipe(
      map(o => this.mapear(o))
    );
  }

  listarTodas(): Observable<OrdemFornecimento[]> {
    return this.http.get<OrdemApi[]>(this.apiUrl).pipe(
      map(lista => lista.map(o => this.mapear(o)))
    );
  }

  atualizar(ordem: OrdemFornecimento): Observable<OrdemFornecimento> {
    const body: OrdemUpdateBody = {
      status:               ordem.status,
      usuario_aprovador_id: ordem.id_usuario_aprovador ?? null,
      observacao:           ordem.observacao,
    };
    return this.http.put<OrdemApi>(`${this.apiUrl}/${ordem.id_ordem}`, body).pipe(
      map(o => this.mapear(o))
    );
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapear(o: OrdemApi): OrdemFornecimento {
    return {
      id_ordem:              o.id_ordem,
      id_usuario_aprovador:  o.usuario_aprovador?.id_usuario ?? null,
      numero_ordem:          o.numero_ordem,
      fornecedor:            o.fornecedor?.nome ?? '',
      unidade:               o.unidade?.nome ?? '',
      solicitante:           o.usuario_solicitante?.nome ?? '',
      aprovador:             o.usuario_aprovador?.nome ?? null,
      data_emissao:          o.data_emissao,
      data_entrega_prevista: o.data_entrega_prevista,
      status:                o.status,
      observacao:            o.observacao,
      valor_total:           'R$ —',
    };
  }
}
