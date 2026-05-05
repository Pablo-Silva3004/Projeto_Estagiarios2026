package com.estagio.crud.controller;

import com.estagio.crud.model.HistoricoStatusOf;
import com.estagio.crud.service.HistoricoStatusOfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historico-status-of")
@RequiredArgsConstructor
public class HistoricoStatusOfController {

    private final HistoricoStatusOfService historicoService;

    // GET /historico-status-of
    @GetMapping
    public List<HistoricoStatusOf> listarTodos() {
        return historicoService.listarTodos();
    }

    // GET /historico-status-of/{id}
    @GetMapping("/{id}")
    public ResponseEntity<HistoricoStatusOf> buscarPorId(@PathVariable Integer id) {
        return historicoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /historico-status-of → registra uma mudança de status
    // Exemplo de corpo: { "ordemId": 1, "statusAnteriorId": 1, "statusNovoId": 2,
    //                     "alteradoPorId": 3, "observacao": "Iniciando processamento" }
    // statusAnteriorId pode ser nulo no primeiro registro
    @PostMapping
    public ResponseEntity<HistoricoStatusOf> registrar(@RequestBody HistoricoRequest request) {
        return historicoService.registrar(request.ordemId(), request.statusAnteriorId(),
                        request.statusNovoId(), request.alteradoPorId(), request.observacao())
                .map(h -> ResponseEntity.status(201).body(h))
                .orElse(ResponseEntity.badRequest().build());
    }

    // DTO para registro de histórico de status
    record HistoricoRequest(Integer ordemId, Integer statusAnteriorId,
                            Integer statusNovoId, Integer alteradoPorId,
                            String observacao) {}
}
