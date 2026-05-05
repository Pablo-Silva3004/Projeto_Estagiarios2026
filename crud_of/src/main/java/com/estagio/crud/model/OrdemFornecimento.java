package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// Representa a tabela "ordens_fornecimento" — a ordem de fornecimento de um colaborador
@Entity
@Table(name = "ordens_fornecimento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdemFornecimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // @ManyToOne: muitas ordens podem pertencer ao mesmo colaborador
    @ManyToOne
    @JoinColumn(name = "colaborador_id", nullable = false)
    private Colaborador colaborador;

    // Número identificador da OF (pode ser gerado externamente)
    @Column(name = "numero_of", length = 50)
    private String numeroOf;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    // Status atual da ordem — referencia a tabela status_of
    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private StatusOf status;

    // Mês da competência (1 a 12)
    @Column(name = "competencia_mes", nullable = false)
    private Integer competenciaMes;

    // Ano da competência
    @Column(name = "competencia_ano", nullable = false)
    private Integer competenciaAno;

    // Usuário que criou a ordem
    @ManyToOne
    @JoinColumn(name = "criado_por", nullable = false)
    private Usuario criadoPor;

    // Usuário que validou a ordem (pode ser nulo enquanto não validada)
    @ManyToOne
    @JoinColumn(name = "validado_por")
    private Usuario validadoPor;

    private LocalDateTime dataValidacao;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(updatable = false)
    private LocalDateTime criadoEm;

    private LocalDateTime atualizadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
        this.atualizadoEm = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.atualizadoEm = LocalDateTime.now();
    }
}
