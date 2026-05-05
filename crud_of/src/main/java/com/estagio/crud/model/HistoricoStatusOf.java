package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// Representa a tabela "historico_status_of" — registra cada mudança de status de uma ordem
@Entity
@Table(name = "historico_status_of")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoStatusOf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Qual ordem sofreu a mudança de status
    @ManyToOne
    @JoinColumn(name = "ordem_fornecimento_id", nullable = false)
    private OrdemFornecimento ordemFornecimento;

    // Status antes da mudança (nulo se for o primeiro status registrado)
    @ManyToOne
    @JoinColumn(name = "status_anterior_id")
    private StatusOf statusAnterior;

    // Status depois da mudança
    @ManyToOne
    @JoinColumn(name = "status_novo_id", nullable = false)
    private StatusOf statusNovo;

    // Quem realizou a mudança
    @ManyToOne
    @JoinColumn(name = "alterado_por", nullable = false)
    private Usuario alteradoPor;

    @Column(length = 255)
    private String observacao;

    // updatable = false: a data de alteração nunca muda após o insert
    @Column(updatable = false)
    private LocalDateTime alteradoEm;

    @PrePersist
    public void prePersist() {
        this.alteradoEm = LocalDateTime.now();
    }
}
