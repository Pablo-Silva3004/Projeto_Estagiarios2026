package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "produto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProduto;

    // @ManyToOne: muitos produtos podem pertencer à mesma categoria
    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private CategoriaProduto categoria;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 200)
    private String descricao;

    @Column(name = "unidade_medida", nullable = false, length = 20)
    private String unidadeMedida;

    @Column(name = "preco_referencia", precision = 10, scale = 2)
    private BigDecimal precoReferencia = BigDecimal.ZERO;

    @Column(nullable = false)
    private Boolean ativo = true;
}
