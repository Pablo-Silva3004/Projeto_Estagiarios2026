package com.estagio.crud.controller;

import com.estagio.crud.model.OrdemFornecimento;
import com.estagio.crud.service.OrdemFornecimentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    // Exemplo de corpo: { "descricao": "OF do mês", "numeroOf": "OF-001",
    //                     "colaboradorId": 1, "statusId": 1,
    //                     "competenciaMes": 5, "competenciaAno": 2026, "criadoPorId": 2 }
    @PostMapping
    public ResponseEntity<OrdemFornecimento> criar(@RequestBody OrdemRequest request) {
        return ordemService.salvar(request.descricao(), request.numeroOf(),
                        request.colaboradorId(), request.statusId(),
                        request.competenciaMes(), request.competenciaAno(),
                        request.criadoPorId())
                .map(o -> ResponseEntity.status(201).body(o))
                .orElse(ResponseEntity.badRequest().build());
    }

    // PUT /ordens-fornecimento/{id} → atualiza descrição e status da ordem
    // Exemplo de corpo: { "descricao": "...", "statusId": 2 }
    @PutMapping("/{id}")
    public ResponseEntity<OrdemFornecimento> atualizar(@PathVariable Integer id,
                                                       @RequestBody OrdemUpdateRequest request) {
        return ordemService.atualizar(id, request.descricao(), request.statusId())
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
    record OrdemRequest(String descricao, String numeroOf, Integer colaboradorId,
                        Integer statusId, Integer competenciaMes,
                        Integer competenciaAno, Integer criadoPorId) {}

    // DTO para atualização da ordem (descrição + status)
    record OrdemUpdateRequest(String descricao, Integer statusId) {}
}
