package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// Representa a tabela "perfis" — define os perfis de acesso dos usuários (ex: ADMIN, RT, GERENTE)
@Entity
@Table(name = "perfis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 50)
    private String nome;

    @Column(length = 255)
    private String descricao;

    // updatable = false: o campo criadoEm nunca é alterado após o insert
    @Column(updatable = false)
    private LocalDateTime criadoEm;

    // @PrePersist: executado automaticamente ANTES de inserir no banco
    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }
}
