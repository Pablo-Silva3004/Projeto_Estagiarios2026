package com.estagio.crud.controller;

import com.estagio.crud.model.OrdemItem;
import com.estagio.crud.service.OrdemItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/ordem-itens")
@RequiredArgsConstructor
public class OrdemItemController {

    private final OrdemItemService ordemItemService;

    // GET /ordem-itens → lista todos os itens
    @GetMapping
    public List<OrdemItem> listarTodos() {
        return ordemItemService.listarTodos();
    }

    // GET /ordem-itens/{id} → busca um item pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<OrdemItem> buscarPorId(@PathVariable Integer id) {
        return ordemItemService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /ordem-itens → adiciona um item a uma ordem
    // Exemplo de corpo: { "ordemId": 1, "produtoId": 2, "quantidade": 10.00, "valorUnitario": 5.50 }
    @PostMapping
    public ResponseEntity<OrdemItem> criar(@RequestBody OrdemItemRequest request) {
        return ordemItemService.salvar(request.ordemId(), request.produtoId(),
                        request.quantidade(), request.valorUnitario())
                .map(i -> ResponseEntity.status(201).body(i))
                .orElse(ResponseEntity.badRequest().build()); // 400 se ordem ou produto não encontrado
    }

    // PUT /ordem-itens/{id} → atualiza quantidades e valor de um item
    // Exemplo de corpo: { "quantidade": 12.00, "valorUnitario": 5.50, "quantidadeRecebida": 10.00 }
    @PutMapping("/{id}")
    public ResponseEntity<OrdemItem> atualizar(@PathVariable Integer id,
                                               @RequestBody OrdemItemUpdateRequest request) {
        return ordemItemService.atualizar(id, request.quantidade(),
                        request.valorUnitario(), request.quantidadeRecebida())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /ordem-itens/{id} → remove um item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (ordemItemService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // DTO para criação do item
    record OrdemItemRequest(Integer ordemId, Integer produtoId,
                            BigDecimal quantidade, BigDecimal valorUnitario) {}

    // DTO para atualização do item
    record OrdemItemUpdateRequest(BigDecimal quantidade, BigDecimal valorUnitario,
                                  BigDecimal quantidadeRecebida) {}
}
