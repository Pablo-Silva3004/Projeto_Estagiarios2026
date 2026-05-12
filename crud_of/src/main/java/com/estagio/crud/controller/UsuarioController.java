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

    // GET /usuarios/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /usuarios → cria um novo usuário
    // Exemplo de corpo: { "nome": "João", "email": "joao@email.com",
    //                     "senha": "123", "perfil": "SOLICITANTE" }
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody UsuarioRequest request) {
        return usuarioService.salvar(request.nome(), request.email(),
                        request.senha(), request.perfil())
                .map(u -> ResponseEntity.status(201).body(u))
                .orElse(ResponseEntity.badRequest().build());
    }

    // PUT /usuarios/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Integer id,
                                             @RequestBody UsuarioRequest request) {
        return usuarioService.atualizar(id, request.nome(), request.email(),
                        request.senha(), request.perfil(), request.ativo())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /usuarios/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (usuarioService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    record UsuarioRequest(String nome, String email, String senha, Usuario.Perfil perfil,
                          Boolean ativo) {}
}
