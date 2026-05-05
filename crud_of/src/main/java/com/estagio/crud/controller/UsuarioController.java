package com.estagio.crud.controller;

import com.estagio.crud.model.Usuario;
import com.estagio.crud.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController: combina @Controller + @ResponseBody
// Indica que esta classe responde requisições HTTP e retorna JSON
@RestController
// @RequestMapping: define o caminho base de todos os endpoints desta classe
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
    // ResponseEntity permite controlar o código HTTP da resposta (200, 404 etc.)
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)               // 200 OK com o usuário
                .orElse(ResponseEntity.notFound().build()); // 404 Not Found
    }

    // POST /usuarios → cria um novo usuário
    // Exemplo de corpo: { "nome": "João", "email": "joao@email.com",
    //                     "senha": "123456", "cargo": "Analista", "perfilId": 1 }
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody UsuarioRequest request) {
        return usuarioService.salvar(request.nome(), request.email(),
                        request.senha(), request.cargo(), request.perfilId())
                .map(u -> ResponseEntity.status(201).body(u)) // 201 Created
                .orElse(ResponseEntity.badRequest().build()); // 400 se perfil não encontrado
    }

    // PUT /usuarios/{id} → atualiza um usuário existente
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Integer id,
                                             @RequestBody UsuarioRequest request) {
        return usuarioService.atualizar(id, request.nome(), request.email(),
                        request.senha(), request.cargo(), request.perfilId())
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

    // Record: forma simples de criar um objeto imutável para receber dados da requisição
    // Funciona como um DTO (Data Transfer Object) básico
    record UsuarioRequest(String nome, String email, String senha, String cargo, Integer perfilId) {}
}
