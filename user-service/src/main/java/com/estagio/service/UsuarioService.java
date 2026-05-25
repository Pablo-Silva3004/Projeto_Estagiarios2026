package com.estagio.service;

import com.estagio.dto.UsuarioDTO;
import com.estagio.entity.Usuario;
import com.estagio.repository.UsuarioRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class UsuarioService {

    @Inject
    UsuarioRepository usuarioRepository;

    /*
     * LISTAR TODOS
     */
    public List<Usuario> listarTodos() {

        return usuarioRepository.listAll();
    }

    /*
     * BUSCAR POR ID
     */
    public Usuario buscarPorId(Long id) {

        Usuario usuario = usuarioRepository.findById(id);

        if (usuario == null) {
            throw new RuntimeException("Usuário não encontrado");
        }

        return usuario;
    }

    /*
     * CRIAR
     */
    @Transactional
    public Usuario criar(UsuarioDTO dto) {

        Usuario usuario = new Usuario();

        usuario.nome = dto.nome;
        usuario.email = dto.email;
        usuario.senha = dto.senha;
        usuario.perfil = dto.perfil;
        usuario.ativo = dto.ativo;

        usuarioRepository.persist(usuario);

        return usuario;
    }

    /*
     * ATUALIZAR
     */
    @Transactional
    public Usuario atualizar(Long id, UsuarioDTO dto) {

        Usuario usuario = buscarPorId(id);

        usuario.nome = dto.nome;
        usuario.email = dto.email;
        usuario.senha = dto.senha;
        usuario.perfil = dto.perfil;
        usuario.ativo = dto.ativo;

        return usuario;
    }

    /*
     * DELETAR
     */
    @Transactional
    public void deletar(Long id) {

        Usuario usuario = buscarPorId(id);

        usuarioRepository.delete(usuario);
    }
}