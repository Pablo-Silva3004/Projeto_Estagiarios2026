package com.projeto.estagiarios.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Tag(name = "Health", description = "Endpoint de verificação da aplicação")
public class HealthController {

    @GetMapping("/api/health")
    @Operation(summary = "Verifica se a API está ativa")
    public Map<String, String> health() {
        return Map.of(
                "status", "DEU CERTOOOOO!",
                "message", "A API está em execução"
        );
    }
}