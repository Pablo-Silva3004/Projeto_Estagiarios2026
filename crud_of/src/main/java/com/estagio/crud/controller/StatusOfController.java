package com.estagio.crud.controller;

import com.estagio.crud.model.StatusOf;
import com.estagio.crud.service.StatusOfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/status-of")
@RequiredArgsConstructor
public class StatusOfController {

    private final StatusOfService statusOfService;

    // GET /status-of
    @GetMapping
    public List<StatusOf> listarTodos() {
        return statusOfService.listarTodos();
    }

    // GET /status-of/{id}
    @GetMapping("/{id}")
    public ResponseEntity<StatusOf> buscarPorId(@PathVariable Integer id) {
        return statusOfService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /status-of
    // Exemplo de corpo: { "nome": "PENDENTE", "descricao": "Aguardando início", "ordem": 1, "finalizador": false }
    @PostMapping
    public ResponseEntity<StatusOf> criar(@RequestBody StatusOf statusOf) {
        StatusOf salvo = statusOfService.salvar(statusOf);
        return ResponseEntity.status(201).body(salvo);
    }

    // PUT /status-of/{id}
    @PutMapping("/{id}")
    public ResponseEntity<StatusOf> atualizar(@PathVariable Integer id, @RequestBody StatusOf statusOf) {
        return statusOfService.atualizar(id, statusOf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /status-of/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (statusOfService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
