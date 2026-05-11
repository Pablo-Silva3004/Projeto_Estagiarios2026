package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "unidade")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Unidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUnidade;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 20)
    private String sigla;

    @Column(nullable = false)
    private Boolean ativo = true;
}
