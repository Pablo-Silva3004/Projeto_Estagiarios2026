package com.estagio.crud.controller;

import com.estagio.crud.model.Unidade;
import com.estagio.crud.service.UnidadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unidades")
@RequiredArgsConstructor
public class UnidadeController {

    private final UnidadeService unidadeService;

    // GET /unidades → lista todas as unidades
    @GetMapping
    public List<Unidade> listarTodos() {
        return unidadeService.listarTodos();
    }

    // GET /unidades/{id} → busca uma unidade pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Unidade> buscarPorId(@PathVariable Integer id) {
        return unidadeService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /unidades → cria uma nova unidade
    // Exemplo de corpo: { "nome": "Gerência de TI", "sigla": "GTI" }
    @PostMapping
    public ResponseEntity<Unidade> criar(@RequestBody UnidadeRequest request) {
        Unidade salva = unidadeService.salvar(request.nome(), request.sigla());
        return ResponseEntity.status(201).body(salva);
    }

    // PUT /unidades/{id} → atualiza uma unidade existente
    @PutMapping("/{id}")
    public ResponseEntity<Unidade> atualizar(@PathVariable Integer id,
                                             @RequestBody UnidadeRequest request) {
        return unidadeService.atualizar(id, request.nome(), request.sigla())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /unidades/{id} → deleta uma unidade
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (unidadeService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    record UnidadeRequest(String nome, String sigla) {}
}
