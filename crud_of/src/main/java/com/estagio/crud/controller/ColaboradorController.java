package com.estagio.crud.controller;

import com.estagio.crud.model.Colaborador;
import com.estagio.crud.service.ColaboradorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/colaboradores")
@RequiredArgsConstructor
public class ColaboradorController {

    private final ColaboradorService colaboradorService;

    // GET /colaboradores
    @GetMapping
    public List<Colaborador> listarTodos() {
        return colaboradorService.listarTodos();
    }

    // GET /colaboradores/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Colaborador> buscarPorId(@PathVariable Integer id) {
        return colaboradorService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /colaboradores
    // O corpo da requisição precisa ter: nome, email, rtId, gerenteId, criadoPorId
    // rtId e gerenteId agora são IDs de usuários comuns (sem tabelas separadas)
    // Usamos um record simples como DTO para receber os dados
    @PostMapping
    public ResponseEntity<Colaborador> criar(@RequestBody ColaboradorRequest request) {
        return colaboradorService.salvar(request.nome(), request.email(),
                        request.rtId(), request.gerenteId(), request.criadoPorId())
                .map(c -> ResponseEntity.status(201).body(c))
                .orElse(ResponseEntity.badRequest().build()); // 400 se usuário não encontrado
    }

    // PUT /colaboradores/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Colaborador> atualizar(@PathVariable Integer id,
                                                  @RequestBody ColaboradorUpdateRequest request) {
        return colaboradorService.atualizar(id, request.nome(), request.email(),
                        request.rtId(), request.gerenteId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /colaboradores/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (colaboradorService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Record: forma simples de criar um objeto imutável para receber dados da requisição
    // Funciona como um DTO (Data Transfer Object) básico
    record ColaboradorRequest(String nome, String email, Integer rtId,
                              Integer gerenteId, Integer criadoPorId) {}

    // DTO de atualização (não precisa do criadoPorId, pois não muda quem criou)
    record ColaboradorUpdateRequest(String nome, String email,
                                    Integer rtId, Integer gerenteId) {}
}
