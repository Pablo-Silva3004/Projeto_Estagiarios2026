package com.estagio.crud.service;

import com.estagio.crud.model.Usuario;
import com.estagio.crud.repository.PerfilRepository;
import com.estagio.crud.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// @Service: marca esta classe como um componente de serviço (camada de negócio)
// A lógica de negócio fica aqui, separada do Controller
@Service
// @RequiredArgsConstructor (Lombok): gera construtor com os campos final (injeção de dependência)
@RequiredArgsConstructor
public class UsuarioService {

    // O Spring injeta automaticamente os repositories aqui (injeção por construtor)
    private final UsuarioRepository usuarioRepository;
    private final PerfilRepository perfilRepository;

    // Busca todos os usuários
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // Busca um usuário pelo ID
    // Optional: pode conter o usuário ou estar vazio (se não encontrar)
    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    // Cria um novo usuário vinculando o perfil pelo ID
    public Optional<Usuario> salvar(String nome, String email, String senha,
                                    String cargo, Integer perfilId) {
        return perfilRepository.findById(perfilId).map(perfil -> {
            Usuario usuario = new Usuario();
            usuario.setNome(nome);
            usuario.setEmail(email);
            usuario.setSenha(senha);
            usuario.setCargo(cargo);
            usuario.setPerfil(perfil);
            return usuarioRepository.save(usuario);
        });
    }

    // Atualiza um usuário existente
    public Optional<Usuario> atualizar(Integer id, String nome, String email,
                                       String senha, String cargo, Integer perfilId) {
        return usuarioRepository.findById(id).flatMap(usuarioExistente ->
            perfilRepository.findById(perfilId).map(perfil -> {
                // Copia os dados novos para o usuário encontrado
                usuarioExistente.setNome(nome);
                usuarioExistente.setEmail(email);
                usuarioExistente.setSenha(senha);
                usuarioExistente.setCargo(cargo);
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
