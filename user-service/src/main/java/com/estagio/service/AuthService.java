package com.estagio.service;

import com.estagio.dto.LoginDTO;
import com.estagio.entity.Usuario;
import com.estagio.repository.UsuarioRepository;
import com.estagio.security.JwtService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;

@ApplicationScoped
public class AuthService {

    @Inject
    UsuarioRepository usuarioRepository;

    @Inject
    JwtService jwtService;

    public String login(LoginDTO dto) {

        Usuario usuario = usuarioRepository.buscarPorEmail(dto.email);

        if (usuario == null || !usuario.senha.equals(dto.senha)) {

            throw new WebApplicationException(
                    "Usuário ou senha inválidos",
                    401
            );
        }

        return jwtService.gerarToken(usuario.email);
    }
}