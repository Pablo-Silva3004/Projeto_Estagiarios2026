package com.estagio.crud.service;

import com.estagio.crud.model.Usuario;
import com.estagio.crud.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    // Cria um novo usuário (sem vínculo com unidade)
    public Optional<Usuario> salvar(String nome, String email, String senha, Usuario.Perfil perfil) {
        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senha);
        usuario.setPerfil(perfil);
        return Optional.of(usuarioRepository.save(usuario));
    }

    // Atualiza um usuário existente
    public Optional<Usuario> atualizar(Integer id, String nome, String email,
                                       String senha, Usuario.Perfil perfil, Boolean ativo) {
        return usuarioRepository.findById(id).map(u -> {
            u.setNome(nome);
            u.setEmail(email);
            u.setSenha(senha);
            u.setPerfil(perfil);
            if (ativo != null) u.setAtivo(ativo);
            return usuarioRepository.save(u);
        });
    }

    // Valida e-mail e senha — retorna o usuário se encontrado
    public Optional<Usuario> login(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }

    public boolean deletar(Integer id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
