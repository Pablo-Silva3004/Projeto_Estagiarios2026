package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "colaboradores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    // @ManyToOne: muitos colaboradores podem ter o mesmo RT
    // @JoinColumn: nome da coluna de chave estrangeira no banco
    @ManyToOne
    @JoinColumn(name = "rt_id", nullable = false)
    private Usuario rt;

    // @ManyToOne: muitos colaboradores podem ter o mesmo Gerente
    @ManyToOne
    @JoinColumn(name = "gerente_id", nullable = false)
    private Usuario gerente;

    @Column(nullable = false)
    private Boolean ativo = true;

    // Usuário que cadastrou o colaborador no sistema
    @ManyToOne
    @JoinColumn(name = "criado_por", nullable = false)
    private Usuario criadoPor;

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
