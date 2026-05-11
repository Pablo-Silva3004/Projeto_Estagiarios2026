package com.estagio.crud.controller;

import com.estagio.crud.model.Usuario;
import com.estagio.crud.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    // GET /usuarios → lista todos os usuários
    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    // GET /usuarios/{id} → busca um usuário pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /usuarios → cria um novo usuário
    // Exemplo de corpo: { "nome": "João", "email": "joao@email.com", "senha": "123",
    //                     "unidadeId": 1, "perfil": "SOLICITANTE" }
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody UsuarioRequest request) {
        return usuarioService.salvar(request.nome(), request.email(),
                        request.senha(), request.unidadeId(), request.perfil())
                .map(u -> ResponseEntity.status(201).body(u)) // 201 Created
                .orElse(ResponseEntity.badRequest().build()); // 400 se unidade não encontrada
    }

    // PUT /usuarios/{id} → atualiza um usuário existente
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Integer id,
                                             @RequestBody UsuarioRequest request) {
        return usuarioService.atualizar(id, request.nome(), request.email(),
                        request.senha(), request.unidadeId(), request.perfil())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /usuarios/{id} → deleta um usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (usuarioService.deletar(id)) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.notFound().build(); // 404 Not Found
    }

    record UsuarioRequest(String nome, String email, String senha,
                          Integer unidadeId, Usuario.Perfil perfil) {}
}
