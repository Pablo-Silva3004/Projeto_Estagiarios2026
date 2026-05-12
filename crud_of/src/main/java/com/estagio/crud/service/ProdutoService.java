package com.estagio.crud.service;

import com.estagio.crud.model.Produto;
import com.estagio.crud.repository.CategoriaProdutoRepository;
import com.estagio.crud.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaProdutoRepository categoriaProdutoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> buscarPorId(Integer id) {
        return produtoRepository.findById(id);
    }

    // Cria um novo produto vinculando a categoria pelo ID
    public Optional<Produto> salvar(Integer categoriaId, String nome, String descricao,
                                    String unidadeMedida, BigDecimal precoReferencia) {
        return categoriaProdutoRepository.findById(categoriaId).map(categoria -> {
            Produto produto = new Produto();
            produto.setCategoria(categoria);
            produto.setNome(nome);
            produto.setDescricao(descricao);
            produto.setUnidadeMedida(unidadeMedida);
            produto.setPrecoReferencia(precoReferencia != null ? precoReferencia : BigDecimal.ZERO);
            return produtoRepository.save(produto);
        });
    }

    // Atualiza um produto existente
    public Optional<Produto> atualizar(Integer id, Integer categoriaId, String nome,
                                       String descricao, String unidadeMedida,
                                       BigDecimal precoReferencia, Boolean ativo) {
        return produtoRepository.findById(id).flatMap(produtoExistente ->
            categoriaProdutoRepository.findById(categoriaId).map(categoria -> {
                produtoExistente.setCategoria(categoria);
                produtoExistente.setNome(nome);
                produtoExistente.setDescricao(descricao);
                produtoExistente.setUnidadeMedida(unidadeMedida);
                produtoExistente.setPrecoReferencia(precoReferencia != null ? precoReferencia : BigDecimal.ZERO);
                if (ativo != null) produtoExistente.setAtivo(ativo);
                return produtoRepository.save(produtoExistente);
            })
        );
    }

    public boolean deletar(Integer id) {
        if (produtoRepository.existsById(id)) {
            produtoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
