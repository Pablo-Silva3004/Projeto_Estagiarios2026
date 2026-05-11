package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// Representa a tabela "status_of" — define os possíveis status de uma Ordem de Fornecimento
@Entity
@Table(name = "status_of")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusOf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 80)
    private String nome;

    @Column(length = 255)
    private String descricao;

    // Define a ordem de exibição dos status
    @Column(nullable = false)
    private Integer ordem;

    // finalizador = true indica que este status encerra o fluxo da ordem
    @Column(nullable = false)
    private Boolean finalizador = false;

    @Column(updatable = false)
    private LocalDateTime criadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }
}
