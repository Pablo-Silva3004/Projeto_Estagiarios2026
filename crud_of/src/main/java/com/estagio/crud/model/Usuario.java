package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// @Entity: diz ao JPA que esta classe representa uma tabela no banco
// @Table: aponta para qual tabela do banco esta entidade pertence
@Entity
@Table(name = "usuarios")
// @Data (Lombok): gera automaticamente getters, setters, toString, equals e hashCode
// @NoArgsConstructor: gera construtor sem argumentos (necessário para o JPA)
// @AllArgsConstructor: gera construtor com todos os campos
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    // @Id: campo que representa a chave primária
    // @GeneratedValue: o valor é gerado automaticamente pelo banco (AUTO_INCREMENT)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false, length = 255)
    private String senha;

    @Column(length = 100)
    private String cargo;

    // @ManyToOne: muitos usuários podem ter o mesmo perfil
    // @JoinColumn: nome da coluna de chave estrangeira no banco
    @ManyToOne
    @JoinColumn(name = "perfil_id", nullable = false)
    private Perfil perfil;

    @Column(nullable = false)
    private Boolean ativo = true;

    // Preenchido pelo sistema no momento do login
    private LocalDateTime ultimoLogin;

    // updatable = false: o campo criadoEm nunca é alterado após o insert
    @Column(updatable = false)
    private LocalDateTime criadoEm;

    private LocalDateTime atualizadoEm;

    // @PrePersist: executado automaticamente ANTES de inserir no banco
    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
        this.atualizadoEm = LocalDateTime.now();
    }

    // @PreUpdate: executado automaticamente ANTES de atualizar no banco
    @PreUpdate
    public void preUpdate() {
        this.atualizadoEm = LocalDateTime.now();
    }
}
