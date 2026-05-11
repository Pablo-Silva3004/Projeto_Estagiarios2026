package com.estagio.crud.controller;

import com.estagio.crud.model.OrdemFornecimento;
import com.estagio.crud.service.OrdemFornecimentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/ordens-fornecimento")
@RequiredArgsConstructor
public class OrdemFornecimentoController {

    private final OrdemFornecimentoService ordemService;

    // GET /ordens-fornecimento
    @GetMapping
    public List<OrdemFornecimento> listarTodas() {
        return ordemService.listarTodas();
    }

    // GET /ordens-fornecimento/{id}
    @GetMapping("/{id}")
    public ResponseEntity<OrdemFornecimento> buscarPorId(@PathVariable Integer id) {
        return ordemService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /ordens-fornecimento → cria uma nova ordem
    // Exemplo de corpo: { "numeroOrdem": "OF-2026-001", "fornecedorId": 1, "unidadeId": 2,
    //                     "usuarioSolicitanteId": 3, "dataEmissao": "2026-05-11",
    //                     "dataEntregaPrevista": "2026-05-25", "observacao": "Urgente" }
    @PostMapping
    public ResponseEntity<OrdemFornecimento> criar(@RequestBody OrdemRequest request) {
        return ordemService.salvar(request.numeroOrdem(), request.fornecedorId(),
                        request.unidadeId(), request.usuarioSolicitanteId(),
                        request.dataEmissao(), request.dataEntregaPrevista(),
                        request.observacao())
                .map(o -> ResponseEntity.status(201).body(o))
                .orElse(ResponseEntity.badRequest().build()); // 400 se FK não encontrada
    }

    // PUT /ordens-fornecimento/{id} → atualiza status, aprovador e observação da ordem
    // Exemplo de corpo: { "status": "APROVADA", "usuarioAprovadorId": 4, "observacao": "OK" }
    @PutMapping("/{id}")
    public ResponseEntity<OrdemFornecimento> atualizar(@PathVariable Integer id,
                                                       @RequestBody OrdemUpdateRequest request) {
        return ordemService.atualizar(id, request.status(),
                        request.usuarioAprovadorId(), request.observacao())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /ordens-fornecimento/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (ordemService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // DTO para criação da ordem
    record OrdemRequest(String numeroOrdem, Integer fornecedorId, Integer unidadeId,
                        Integer usuarioSolicitanteId, LocalDate dataEmissao,
                        LocalDate dataEntregaPrevista, String observacao) {}

    // DTO para atualização da ordem (status + aprovador + observação)
    record OrdemUpdateRequest(OrdemFornecimento.Status status,
                              Integer usuarioAprovadorId, String observacao) {}
}
