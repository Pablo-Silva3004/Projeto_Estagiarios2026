package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

// Representa a tabela "ordem_fornecimento" — ordem de fornecimento entre unidade e fornecedor
@Entity
@Table(name = "ordem_fornecimento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdemFornecimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOrdem;

    @Column(name = "numero_ordem", nullable = false, unique = true, length = 30)
    private String numeroOrdem;

    // @ManyToOne: muitas ordens podem ter o mesmo fornecedor
    @ManyToOne
    @JoinColumn(name = "id_fornecedor", nullable = false)
    private Fornecedor fornecedor;

    // @ManyToOne: muitas ordens podem pertencer à mesma unidade
    @ManyToOne
    @JoinColumn(name = "id_unidade", nullable = false)
    private Unidade unidade;

    // Usuário que solicitou a ordem
    @ManyToOne
    @JoinColumn(name = "id_usuario_solicitante", nullable = false)
    private Usuario usuarioSolicitante;

    // Usuário que aprovou a ordem (pode ser nulo enquanto não aprovada)
    @ManyToOne
    @JoinColumn(name = "id_usuario_aprovador")
    private Usuario usuarioAprovador;

    @Column(name = "data_emissao", nullable = false)
    private LocalDate dataEmissao;

    @Column(name = "data_entrega_prevista")
    private LocalDate dataEntregaPrevista;

    // Status definido como ENUM diretamente na tabela
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDENTE;

    @Column(length = 255)
    private String observacao;

    // Enum que representa os possíveis status da ordem de fornecimento
    public enum Status {
        PENDENTE, APROVADA, ENVIADA, RECEBIDA, CANCELADA
    }
}
