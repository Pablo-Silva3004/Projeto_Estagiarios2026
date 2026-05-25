package com.estagio.crud.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Component
public class JwtUtil {

    // 1. LÊ A CHAVE PÚBLICA DO ARQUIVO
    private PublicKey getPublicKey() throws Exception {

        InputStream is = new ClassPathResource("META-INF/resources/publicKey.pem").getInputStream();

        String key = new String(is.readAllBytes());

        // 2. LIMPA FORMATO PEM
        key = key
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s", "");

        // 3. DECODIFICA BASE64
        byte[] decoded = Base64.getDecoder().decode(key);

        // 4. TRANSFORMA EM CHAVE RSA
        X509EncodedKeySpec spec = new X509EncodedKeySpec(decoded);

        return KeyFactory.getInstance("RSA").generatePublic(spec);
    }

    // 5. VALIDA TOKEN JWT
    public Claims validarToken(String token) {

        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getPublicKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

        } catch (Exception e) {
            throw new RuntimeException("Token inválido ou expirado");
        }
    }
}