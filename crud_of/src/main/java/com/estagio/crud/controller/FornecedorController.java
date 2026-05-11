package com.estagio.crud.controller;

import com.estagio.crud.model.Fornecedor;
import com.estagio.crud.service.FornecedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedores")
@RequiredArgsConstructor
public class FornecedorController {

    private final FornecedorService fornecedorService;

    // GET /fornecedores → lista todos os fornecedores
    @GetMapping
    public List<Fornecedor> listarTodos() {
        return fornecedorService.listarTodos();
    }

    // GET /fornecedores/{id} → busca um fornecedor pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> buscarPorId(@PathVariable Integer id) {
        return fornecedorService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /fornecedores → cria um novo fornecedor
    // Exemplo de corpo: { "nome": "Empresa X", "cnpj": "12345678000190",
    //                     "telefone": "11999999999", "email": "x@x.com", "endereco": "Rua Y, 10" }
    @PostMapping
    public ResponseEntity<Fornecedor> criar(@RequestBody FornecedorRequest request) {
        Fornecedor salvo = fornecedorService.salvar(request.nome(), request.cnpj(),
                request.telefone(), request.email(), request.endereco());
        return ResponseEntity.status(201).body(salvo);
    }

    // PUT /fornecedores/{id} → atualiza um fornecedor existente
    @PutMapping("/{id}")
    public ResponseEntity<Fornecedor> atualizar(@PathVariable Integer id,
                                                @RequestBody FornecedorRequest request) {
        return fornecedorService.atualizar(id, request.nome(), request.cnpj(),
                        request.telefone(), request.email(), request.endereco())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /fornecedores/{id} → deleta um fornecedor
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (fornecedorService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    record FornecedorRequest(String nome, String cnpj, String telefone,
                             String email, String endereco) {}
}
