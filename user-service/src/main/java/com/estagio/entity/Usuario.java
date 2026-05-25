package com.estagio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(nullable = false, length = 100)
    public String nome;

    @Column(nullable = false, unique = true, length = 100)
    public String email;

    @Column(nullable = false, length = 255)
    public String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public Perfil perfil;

    @Column(nullable = false)
    public Boolean ativo = true;

    public enum Perfil {
        ADMIN, SOLICITANTE, APROVADOR
    }
}