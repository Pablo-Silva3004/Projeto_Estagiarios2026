package com.estagio.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

// Representa a tabela "ordem_item" — itens de uma ordem de fornecimento
@Entity
@Table(name = "ordem_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdemItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idItem;

    // @ManyToOne: muitos itens podem pertencer à mesma ordem
    @ManyToOne
    @JoinColumn(name = "id_ordem", nullable = false)
    private OrdemFornecimento ordem;

    // @ManyToOne: muitos itens podem referenciar o mesmo produto
    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantidade;

    @Column(name = "valor_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorUnitario;

    @Column(name = "quantidade_recebida", precision = 10, scale = 2)
    private BigDecimal quantidadeRecebida = BigDecimal.ZERO;
}
