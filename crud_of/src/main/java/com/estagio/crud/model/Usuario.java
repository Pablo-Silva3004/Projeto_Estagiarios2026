package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;

    // @ManyToOne: muitos usuários podem pertencer à mesma unidade
    @ManyToOne
    @JoinColumn(name = "id_unidade", nullable = false)
    private Unidade unidade;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String senha;

    // Perfil definido como ENUM diretamente na tabela
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Perfil perfil;

    @Column(nullable = false)
    private Boolean ativo = true;

    // Enum que representa os perfis de acesso do sistema
    public enum Perfil {
        ADMIN, SOLICITANTE, APROVADOR
    }
}
