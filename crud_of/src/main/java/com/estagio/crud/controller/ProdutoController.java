package com.estagio.crud.controller;

import com.estagio.crud.model.Produto;
import com.estagio.crud.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    // GET /produtos → lista todos os produtos
    @GetMapping
    public List<Produto> listarTodos() {
        return produtoService.listarTodos();
    }

    // GET /produtos/{id} → busca um produto pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Integer id) {
        return produtoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /produtos → cria um novo produto
    // Exemplo de corpo: { "categoriaId": 1, "nome": "Caneta", "descricao": "Esferográfica azul",
    //                     "unidadeMedida": "UN", "precoReferencia": 2.50 }
    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody ProdutoRequest request) {
        return produtoService.salvar(request.categoriaId(), request.nome(), request.descricao(),
                        request.unidadeMedida(), request.precoReferencia())
                .map(p -> ResponseEntity.status(201).body(p))
                .orElse(ResponseEntity.badRequest().build()); // 400 se categoria não encontrada
    }

    // PUT /produtos/{id} → atualiza um produto existente
    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Integer id,
                                             @RequestBody ProdutoRequest request) {
        return produtoService.atualizar(id, request.categoriaId(), request.nome(),
                        request.descricao(), request.unidadeMedida(), request.precoReferencia())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /produtos/{id} → deleta um produto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (produtoService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    record ProdutoRequest(Integer categoriaId, String nome, String descricao,
                          String unidadeMedida, BigDecimal precoReferencia) {}
}
