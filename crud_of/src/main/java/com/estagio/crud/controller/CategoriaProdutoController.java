package com.estagio.crud.controller;

import com.estagio.crud.model.CategoriaProduto;
import com.estagio.crud.service.CategoriaProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias-produto")
@RequiredArgsConstructor
public class CategoriaProdutoController {

    private final CategoriaProdutoService categoriaProdutoService;

    // GET /categorias-produto → lista todas as categorias
    @GetMapping
    public List<CategoriaProduto> listarTodos() {
        return categoriaProdutoService.listarTodos();
    }

    // GET /categorias-produto/{id} → busca uma categoria pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaProduto> buscarPorId(@PathVariable Integer id) {
        return categoriaProdutoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /categorias-produto → cria uma nova categoria
    // Exemplo de corpo: { "nome": "Materiais de Escritório" }
    @PostMapping
    public ResponseEntity<CategoriaProduto> criar(@RequestBody CategoriaProdutoRequest request) {
        CategoriaProduto salva = categoriaProdutoService.salvar(request.nome());
        return ResponseEntity.status(201).body(salva);
    }

    // PUT /categorias-produto/{id} → atualiza uma categoria existente
    @PutMapping("/{id}")
    public ResponseEntity<CategoriaProduto> atualizar(@PathVariable Integer id,
                                                      @RequestBody CategoriaProdutoRequest request) {
        return categoriaProdutoService.atualizar(id, request.nome())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /categorias-produto/{id} → deleta uma categoria
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (categoriaProdutoService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    record CategoriaProdutoRequest(String nome) {}
}
