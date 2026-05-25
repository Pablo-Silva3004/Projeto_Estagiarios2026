package com.estagio.crud.security;

import java.io.IOException;
import java.util.Collections;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        // libera rotas públicas
        if (path.startsWith("/swagger-ui")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/api-docs")
                || path.startsWith("/auth")) {

            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("========== JWT FILTER ==========");
        System.out.println("URI: " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        System.out.println("AUTH HEADER: " + authHeader);

        // sem token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token não encontrado");

            return;
        }

        // pega token
        String token = authHeader.substring(7);

        // cria autenticação simples
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        token,
                        null,
                        Collections.emptyList()
                );

        authentication.setDetails(
                new WebAuthenticationDetailsSource()
                        .buildDetails(request)
        );

        // salva autenticação
        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        // continua request
        filterChain.doFilter(request, response);
    }
}