package com.estagio.security;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Duration;

@ApplicationScoped
public class JwtService {

    public String gerarToken(String email) {

        return Jwt
                .issuer("user-service")
                .subject(email)
                .expiresIn(Duration.ofHours(24))
                .sign();
    }
}