package com.estagio.crud.controller;

import com.estagio.crud.model.Perfil;
import com.estagio.crud.service.PerfilService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfis")
@RequiredArgsConstructor
public class PerfilController {

    private final PerfilService perfilService;

    // GET /perfis
    @GetMapping
    public List<Perfil> listarTodos() {
        return perfilService.listarTodos();
    }

    // GET /perfis/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Perfil> buscarPorId(@PathVariable Integer id) {
        return perfilService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /perfis
    // Exemplo de corpo: { "nome": "ADMIN", "descricao": "Administrador do sistema" }
    @PostMapping
    public ResponseEntity<Perfil> criar(@RequestBody Perfil perfil) {
        Perfil salvo = perfilService.salvar(perfil);
        return ResponseEntity.status(201).body(salvo);
    }

    // PUT /perfis/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Perfil> atualizar(@PathVariable Integer id, @RequestBody Perfil perfil) {
        return perfilService.atualizar(id, perfil)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /perfis/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (perfilService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
