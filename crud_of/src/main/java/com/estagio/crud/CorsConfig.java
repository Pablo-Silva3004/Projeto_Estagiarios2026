package com.estagio.crud;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuração de CORS (Cross-Origin Resource Sharing)
 *
 * Sem essa classe, o navegador bloqueia as chamadas do Angular (porta 4200)
 * para o backend (porta 8080), pois são origens diferentes.
 *
 * O que esse arquivo faz:
 * - Libera todas as rotas da API ("/**") para receber chamadas do Angular
 * - Permite os métodos HTTP que usamos: GET, POST, PUT, DELETE
 * - Permite o cabeçalho Content-Type (necessário para enviar JSON)
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")                         // todas as rotas
                .allowedOrigins("http://localhost:4200")   // só o Angular em dev
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Content-Type");
    }
}
