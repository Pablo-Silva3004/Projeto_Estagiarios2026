package com.estagio.crud.service;

import com.estagio.crud.model.Usuario;
import com.estagio.crud.repository.UnidadeRepository;
import com.estagio.crud.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UnidadeRepository unidadeRepository;

    // Busca todos os usuários
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // Busca um usuário pelo ID
    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    // Cria um novo usuário vinculando a unidade pelo ID
    public Optional<Usuario> salvar(String nome, String email, String senha,
                                    Integer unidadeId, Usuario.Perfil perfil) {
        return unidadeRepository.findById(unidadeId).map(unidade -> {
            Usuario usuario = new Usuario();
            usuario.setNome(nome);
            usuario.setEmail(email);
            usuario.setSenha(senha);
            usuario.setUnidade(unidade);
            usuario.setPerfil(perfil);
            return usuarioRepository.save(usuario);
        });
    }

    // Atualiza um usuário existente
    public Optional<Usuario> atualizar(Integer id, String nome, String email,
                                       String senha, Integer unidadeId, Usuario.Perfil perfil) {
        return usuarioRepository.findById(id).flatMap(usuarioExistente ->
            unidadeRepository.findById(unidadeId).map(unidade -> {
                usuarioExistente.setNome(nome);
                usuarioExistente.setEmail(email);
                usuarioExistente.setSenha(senha);
                usuarioExistente.setUnidade(unidade);
                usuarioExistente.setPerfil(perfil);
                return usuarioRepository.save(usuarioExistente);
            })
        );
    }

    // Deleta um usuário pelo ID
    public boolean deletar(Integer id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
